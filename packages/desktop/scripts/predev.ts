import { $ } from "bun"

await $`bun ./scripts/copy-icons.ts ${process.env.SEALCODE_CHANNEL ?? "dev"}`

await $`cd ../sealcode && bun script/build-node.ts`
