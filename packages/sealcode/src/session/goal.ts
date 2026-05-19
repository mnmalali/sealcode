import { Effect, Layer, Context, Option, Schema, Types } from "effect"
import { NonNegativeInt, optionalOmitUndefined } from "@sealcode-ai/core/schema"
import { Storage } from "@/storage/storage"
import { MessageID, SessionID } from "./schema"

export const Status = Schema.Literals(["pursuing", "paused", "achieved", "unmet", "budget_limited"])
export type Status = Schema.Schema.Type<typeof Status>

const Time = Schema.Struct({
  created: NonNegativeInt,
  updated: NonNegativeInt,
})

export const Info = Schema.Struct({
  sessionID: SessionID,
  objective: Schema.String,
  status: Status,
  iteration: NonNegativeInt,
  iterationLimit: NonNegativeInt,
  reason: optionalOmitUndefined(Schema.String),
  lastMessageID: optionalOmitUndefined(MessageID),
  time: Time,
}).annotate({ identifier: "SessionGoal" })
export type Info = Types.DeepMutable<Schema.Schema.Type<typeof Info>>

export const CreateInput = Schema.Struct({
  sessionID: SessionID,
  objective: Schema.String,
  iterationLimit: Schema.optional(NonNegativeInt),
})
export type CreateInput = Schema.Schema.Type<typeof CreateInput>

export const UpdateStatusInput = Schema.Struct({
  sessionID: SessionID,
  status: Schema.Literals(["achieved", "unmet"]),
  reason: Schema.String,
  lastMessageID: Schema.optional(MessageID),
})
export type UpdateStatusInput = Schema.Schema.Type<typeof UpdateStatusInput>

export interface Interface {
  readonly get: (sessionID: SessionID) => Effect.Effect<Info | undefined, Storage.Error>
  readonly create: (input: CreateInput) => Effect.Effect<Info, Storage.Error>
  readonly pause: (sessionID: SessionID) => Effect.Effect<Info | undefined, Storage.Error>
  readonly resume: (sessionID: SessionID) => Effect.Effect<Info | undefined, Storage.Error>
  readonly clear: (sessionID: SessionID) => Effect.Effect<void, Storage.Error>
  readonly updateStatus: (input: UpdateStatusInput) => Effect.Effect<Info | undefined, Storage.Error>
  readonly recordContinuation: (input: {
    sessionID: SessionID
    lastMessageID: MessageID
  }) => Effect.Effect<Info | undefined, Storage.Error>
}

export class Service extends Context.Service<Service, Interface>()("@sealcode/SessionGoal") {}

const DEFAULT_ITERATION_LIMIT = 50
const decodeInfo = Schema.decodeUnknownOption(Info)

const key = (sessionID: SessionID) => ["session_goal", sessionID]

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const storage = yield* Storage.Service

    const get: Interface["get"] = Effect.fn("SessionGoal.get")(function* (sessionID) {
      return yield* storage.read<unknown>(key(sessionID)).pipe(
        Effect.map((value) => Option.getOrUndefined(decodeInfo(value, { onExcessProperty: "preserve" }))),
        Effect.catchIf(Storage.NotFoundError.isInstance, () => Effect.succeed(undefined)),
      )
    })

    const write = Effect.fn("SessionGoal.write")(function* (info: Info) {
      yield* storage.write(key(info.sessionID), info)
      return info
    })

    const create: Interface["create"] = Effect.fn("SessionGoal.create")(function* (input) {
      return yield* write({
        sessionID: input.sessionID,
        objective: input.objective.trim(),
        status: "pursuing",
        iteration: 0,
        iterationLimit: input.iterationLimit ?? DEFAULT_ITERATION_LIMIT,
        time: {
          created: Date.now(),
          updated: Date.now(),
        },
      })
    })

    const patch = Effect.fn("SessionGoal.patch")(function* (sessionID: SessionID, fn: (info: Info) => Info) {
      const info = yield* get(sessionID)
      if (!info) return
      return yield* write(fn(info))
    })

    const pause: Interface["pause"] = Effect.fn("SessionGoal.pause")((sessionID) =>
      patch(sessionID, (info) => ({
        ...info,
        status: "paused",
        reason: "Paused by user",
        time: { ...info.time, updated: Date.now() },
      })),
    )

    const resume: Interface["resume"] = Effect.fn("SessionGoal.resume")((sessionID) =>
      patch(sessionID, (info) => ({
        ...info,
        status: "pursuing",
        reason: undefined,
        time: { ...info.time, updated: Date.now() },
      })),
    )

    const clear: Interface["clear"] = Effect.fn("SessionGoal.clear")((sessionID) => storage.remove(key(sessionID)))

    const updateStatus: Interface["updateStatus"] = Effect.fn("SessionGoal.updateStatus")((input) =>
      patch(input.sessionID, (info) => ({
        ...info,
        status: input.status,
        reason: input.reason,
        lastMessageID: input.lastMessageID ?? info.lastMessageID,
        time: { ...info.time, updated: Date.now() },
      })),
    )

    const recordContinuation: Interface["recordContinuation"] = Effect.fn("SessionGoal.recordContinuation")((input) =>
      patch(input.sessionID, (info) => {
        const iteration = info.iteration + 1
        return {
          ...info,
          iteration,
          lastMessageID: input.lastMessageID,
          status: iteration >= info.iterationLimit ? "budget_limited" : info.status,
          reason: iteration >= info.iterationLimit ? "Goal iteration limit reached" : info.reason,
          time: { ...info.time, updated: Date.now() },
        }
      }),
    )

    return Service.of({ get, create, pause, resume, clear, updateStatus, recordContinuation })
  }),
)

export const defaultLayer = layer.pipe(Layer.provide(Storage.defaultLayer))

export function statusText(info: Info | undefined) {
  if (!info) return "No active goal."
  return [
    `Goal: ${info.objective}`,
    `Status: ${info.status}`,
    `Iterations: ${info.iteration}/${info.iterationLimit}`,
    info.reason ? `Reason: ${info.reason}` : undefined,
  ]
    .filter((line): line is string => typeof line === "string")
    .join("\n")
}

export function startPrompt(objective: string) {
  return [
    `<goal>`,
    `Objective: ${objective}`,
    ``,
    `You are now pursuing a persistent goal. Work autonomously across turns until this objective is verifiably complete or blocked by a hard constraint.`,
    `Keep the objective in focus, choose the next concrete action, validate progress with environmental evidence whenever possible, and continue rather than stopping early.`,
    `When and only when the objective is complete, call the goal tool with status "achieved" and a concise reason naming the verification evidence.`,
    `If you have exhausted viable paths without satisfying the objective, call the goal tool with status "unmet" and explain the blocker.`,
    `</goal>`,
  ].join("\n")
}

export function continuationPrompt(info: Info) {
  return [
    `<goal-continuation>`,
    `Continue working toward your goal: ${info.objective}`,
    ``,
    `Restate the objective as concrete deliverables or success criteria, inspect current evidence, and choose the next concrete action toward completion.`,
    `Do not stop merely because one turn ended. Stop only after calling the goal tool with status "achieved" or "unmet", or if the goal is paused, cleared, or budget-limited.`,
    `</goal-continuation>`,
  ].join("\n")
}

export function budgetLimitPrompt(info: Info) {
  return [
    `<goal-budget-limit>`,
    `You're approaching the iteration budget for your goal: ${info.objective}`,
    ``,
    `Stabilize the work, summarize what remains, and avoid starting new broad work.`,
    `</goal-budget-limit>`,
  ].join("\n")
}

export * as SessionGoal from "./goal"
