import { describe, expect } from "bun:test"
import { DateTime, Effect, Layer, Option } from "effect"
import { Catalog } from "@sealcode-ai/core/catalog"
import { Location } from "@sealcode-ai/core/location"
import { ModelV2 } from "@sealcode-ai/core/model"
import { PluginV2 } from "@sealcode-ai/core/plugin"
import { SealcodePlugin } from "@sealcode-ai/core/plugin/provider/sealcode"
import { ProviderV2 } from "@sealcode-ai/core/provider"
import { it, model, provider, withEnv } from "./provider-helper"

const cost = (input: number, output = 0) => [{ input, output, cache: { read: 0, write: 0 } }]
const locationLayer = Layer.succeed(Location.Service, Location.Service.of({ directory: "test" }))

describe("SealcodePlugin", () => {
  it.effect("uses a public key and cancels paid models without credentials", () =>
    withEnv({ SEALCODE_API_KEY: undefined }, () =>
      Effect.gen(function* () {
        const plugin = yield* PluginV2.Service
        yield* plugin.add(SealcodePlugin)
        const updated = yield* plugin.trigger("provider.update", {}, { provider: provider("sealcode"), cancel: false })
        const paid = yield* plugin.trigger(
          "model.update",
          {},
          { model: model("sealcode", "paid", { cost: cost(1) }), cancel: false },
        )
        expect(updated.provider.options.aisdk.provider.apiKey).toBe("public")
        expect(paid.cancel).toBe(true)
      }),
    ),
  )

  it.effect("keeps free models without credentials", () =>
    withEnv({ SEALCODE_API_KEY: undefined }, () =>
      Effect.gen(function* () {
        const plugin = yield* PluginV2.Service
        yield* plugin.add(SealcodePlugin)
        yield* plugin.trigger("provider.update", {}, { provider: provider("sealcode"), cancel: false })
        const free = yield* plugin.trigger(
          "model.update",
          {},
          { model: model("sealcode", "free", { cost: cost(0) }), cancel: false },
        )
        expect(free.cancel).toBe(false)
      }),
    ),
  )

  it.effect("treats output-only cost as free without credentials", () =>
    withEnv({ SEALCODE_API_KEY: undefined }, () =>
      Effect.gen(function* () {
        const plugin = yield* PluginV2.Service
        yield* plugin.add(SealcodePlugin)
        yield* plugin.trigger("provider.update", {}, { provider: provider("sealcode"), cancel: false })
        const outputOnly = yield* plugin.trigger(
          "model.update",
          {},
          { model: model("sealcode", "output-only", { cost: cost(0, 1) }), cancel: false },
        )
        expect(outputOnly.cancel).toBe(false)
      }),
    ),
  )

  it.effect("uses SEALCODE_API_KEY as credentials", () =>
    withEnv({ SEALCODE_API_KEY: "secret" }, () =>
      Effect.gen(function* () {
        const plugin = yield* PluginV2.Service
        yield* plugin.add(SealcodePlugin)
        const updated = yield* plugin.trigger("provider.update", {}, { provider: provider("sealcode"), cancel: false })
        const paid = yield* plugin.trigger(
          "model.update",
          {},
          { model: model("sealcode", "paid", { cost: cost(1) }), cancel: false },
        )
        expect(updated.provider.options.aisdk.provider.apiKey).toBeUndefined()
        expect(paid.cancel).toBe(false)
      }),
    ),
  )

  it.effect("uses configured provider env vars as credentials", () =>
    withEnv({ SEALCODE_API_KEY: undefined, CUSTOM_SEALCODE_API_KEY: "secret" }, () =>
      Effect.gen(function* () {
        const plugin = yield* PluginV2.Service
        yield* plugin.add(SealcodePlugin)
        const updated = yield* plugin.trigger(
          "provider.update",
          {},
          { provider: provider("sealcode", { env: ["CUSTOM_SEALCODE_API_KEY"] }), cancel: false },
        )
        const paid = yield* plugin.trigger(
          "model.update",
          {},
          { model: model("sealcode", "paid", { cost: cost(1) }), cancel: false },
        )
        expect(updated.provider.options.aisdk.provider.apiKey).toBeUndefined()
        expect(paid.cancel).toBe(false)
      }),
    ),
  )

  it.effect("uses configured apiKey as credentials", () =>
    withEnv({ SEALCODE_API_KEY: undefined }, () =>
      Effect.gen(function* () {
        const plugin = yield* PluginV2.Service
        yield* plugin.add(SealcodePlugin)
        const updated = yield* plugin.trigger(
          "provider.update",
          {},
          {
            provider: provider("sealcode", {
              options: {
                headers: {},
                body: {},
                aisdk: {
                  provider: { apiKey: "configured" },
                  request: {},
                },
              },
            }),
            cancel: false,
          },
        )
        const paid = yield* plugin.trigger(
          "model.update",
          {},
          { model: model("sealcode", "paid", { cost: cost(1) }), cancel: false },
        )
        expect(updated.provider.options.aisdk.provider.apiKey).toBe("configured")
        expect(paid.cancel).toBe(false)
      }),
    ),
  )

  it.effect("uses auth-enabled providers as credentials", () =>
    withEnv({ SEALCODE_API_KEY: undefined }, () =>
      Effect.gen(function* () {
        const plugin = yield* PluginV2.Service
        yield* plugin.add(SealcodePlugin)
        const updated = yield* plugin.trigger(
          "provider.update",
          {},
          { provider: provider("sealcode", { enabled: { via: "auth", service: "sealcode" } }), cancel: false },
        )
        const paid = yield* plugin.trigger(
          "model.update",
          {},
          { model: model("sealcode", "paid", { cost: cost(1) }), cancel: false },
        )
        expect(updated.provider.options.aisdk.provider.apiKey).toBeUndefined()
        expect(paid.cancel).toBe(false)
      }),
    ),
  )

  it.effect("ignores non-sealcode providers and models", () =>
    withEnv({ SEALCODE_API_KEY: undefined }, () =>
      Effect.gen(function* () {
        const plugin = yield* PluginV2.Service
        yield* plugin.add(SealcodePlugin)
        const updated = yield* plugin.trigger("provider.update", {}, { provider: provider("openai"), cancel: false })
        const paid = yield* plugin.trigger(
          "model.update",
          {},
          { model: model("openai", "paid", { cost: cost(1) }), cancel: false },
        )
        expect(updated.provider.options.aisdk.provider.apiKey).toBeUndefined()
        expect(paid.cancel).toBe(false)
      }),
    ),
  )

  it.effect("prefers gpt-5-nano as the sealcode small model", () =>
    Effect.gen(function* () {
      const catalog = yield* Catalog.Service
      const providerID = ProviderV2.ID.sealcode

      yield* catalog.provider.update(providerID, () => {})
      yield* catalog.model.update(providerID, ModelV2.ID.make("cheap-mini"), (model) => {
        model.capabilities.input = ["text"]
        model.capabilities.output = ["text"]
        model.cost = cost(1, 1)
        model.time.released = DateTime.makeUnsafe(Date.now())
      })
      yield* catalog.model.update(providerID, ModelV2.ID.make("gpt-5-nano"), (model) => {
        model.capabilities.input = ["text"]
        model.capabilities.output = ["text"]
        model.cost = cost(10, 10)
        model.time.released = DateTime.makeUnsafe(Date.now())
      })

      const selected = yield* catalog.model.small(providerID)

      expect(Option.getOrUndefined(selected)?.id).toBe(ModelV2.ID.make("gpt-5-nano"))
    }).pipe(Effect.provide(Catalog.defaultLayer.pipe(Layer.provide(locationLayer)))),
  )
})
