export * from "./client.js"
export * from "./server.js"

import { createSealcodeClient } from "./client.js"
import { createSealcodeServer } from "./server.js"
import type { ServerOptions } from "./server.js"

export async function createSealcode(options?: ServerOptions) {
  const server = await createSealcodeServer({
    ...options,
  })

  const client = createSealcodeClient({
    baseUrl: server.url,
  })

  return {
    client,
    server,
  }
}
