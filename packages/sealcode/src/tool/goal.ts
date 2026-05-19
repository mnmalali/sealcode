import { Effect, Schema } from "effect"
import * as Tool from "./tool"
import DESCRIPTION from "./goal.txt"
import { SessionGoal } from "@/session/goal"

export const Parameters = Schema.Struct({
  status: Schema.Literals(["achieved", "unmet"]).annotate({
    description: "Whether the active goal is complete or cannot be completed.",
  }),
  reason: Schema.String.annotate({
    description: "Concise evidence or blocker summary supporting the status update.",
  }),
})

type Metadata = {
  status: SessionGoal.Status
  reason: string
}

export const GoalTool = Tool.define<typeof Parameters, Metadata, SessionGoal.Service>(
  "goal",
  Effect.gen(function* () {
    const goal = yield* SessionGoal.Service

    return {
      description: DESCRIPTION,
      parameters: Parameters,
      execute: (params: Schema.Schema.Type<typeof Parameters>, ctx: Tool.Context<Metadata>) =>
        Effect.gen(function* () {
          const info = yield* goal
            .updateStatus({
              sessionID: ctx.sessionID,
              status: params.status,
              reason: params.reason,
              lastMessageID: ctx.messageID,
            })
            .pipe(Effect.orDie)

          return {
            title: info ? `Goal ${params.status}` : "No active goal",
            output: info ? SessionGoal.statusText(info) : "No active goal was found for this session.",
            metadata: {
              status: params.status,
              reason: params.reason,
            },
          }
        }),
    } satisfies Tool.DefWithoutID<typeof Parameters, Metadata>
  }),
)
