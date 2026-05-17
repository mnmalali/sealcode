// @ts-nocheck

import { Sealcode } from "@sealcode-ai/core"
import { ReadTool } from "@sealcode-ai/core/tools"

const sealcode = Sealcode.make({})

sealcode.tool.add(ReadTool)

sealcode.tool.add({
  name: "bash",
  schema: {
    type: "object",
    properties: {
      command: {
        type: "string",
        description: "The command to run.",
      },
    },
    required: ["command"],
  },
  execute(input, ctx) {},
})

sealcode.auth.add({
  provider: "openai",
  type: "api",
  value: process.env.OPENAI_API_KEY,
})

sealcode.agent.add({
  name: "build",
  permissions: [],
  model: {
    id: "gpt-5-5",
    provider: "openai",
    variant: "xhigh",
  },
})

const sessionID = await sealcode.session.create({
  agent: "build",
})

sealcode.subscribe((event) => {
  console.log(event)
})

await sealcode.session.prompt({
  sessionID,
  text: "hey what is up",
})

await sealcode.session.prompt({
  sessionID,
  text: "what is up with this",
  files: [
    {
      mime: "image/png",
      uri: "data:image/png;base64,xxxx",
    },
  ],
})

await sealcode.session.wait()

console.log(await sealcode.session.messages(sessionID))
