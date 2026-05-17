import { Layer } from "effect"
import { TuiConfig } from "./config/tui"
import { Npm } from "@sealcode-ai/core/npm"
import { Observability } from "@sealcode-ai/core/effect/observability"

export const CliLayer = Observability.layer.pipe(Layer.merge(TuiConfig.layer), Layer.provide(Npm.defaultLayer))
