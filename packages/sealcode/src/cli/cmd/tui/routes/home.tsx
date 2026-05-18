import { Prompt, type PromptRef } from "@tui/component/prompt"
import { createEffect, createMemo, createSignal, For, onMount } from "solid-js"
import { useProject } from "../context/project"
import { useSync } from "../context/sync"
import { Toast } from "../ui/toast"
import { useArgs } from "../context/args"
import { useRouteData } from "@tui/context/route"
import { usePromptRef } from "../context/prompt"
import { useLocal } from "../context/local"
import { TuiPluginRuntime } from "@/cli/cmd/tui/plugin/runtime"
import { useEditorContext } from "@tui/context/editor"
import { useTheme } from "@tui/context/theme"
import { RGBA } from "@opentui/core"
import { InstallationVersion } from "@sealcode-ai/core/installation/version"
import { Global } from "@sealcode-ai/core/global"
import { Locale } from "@/util/locale"

let once = false
const mascotColor = RGBA.fromHex("#6baed6")
const mascot = ["█████████", "███ █ ███", "█████████", "███████", "██▀   ▀██"]
const placeholder = {
  normal: ["Ask about this repo", "Plan a clean refactor", "Fix broken tests"],
  shell: ["ls -la", "git status", "pwd"],
}

export function Home() {
  const sync = useSync()
  const project = useProject()
  const route = useRouteData("home")
  const promptRef = usePromptRef()
  const [ref, setRef] = createSignal<PromptRef | undefined>()
  const args = useArgs()
  const local = useLocal()
  const editor = useEditorContext()
  let sent = false

  onMount(() => {
    editor.clearSelection()
  })

  const bind = (r: PromptRef | undefined) => {
    setRef(r)
    promptRef.set(r)
    if (once || !r) return
    if (route.prompt) {
      r.set(route.prompt)
      once = true
      return
    }
    if (!args.prompt) return
    r.set({ input: args.prompt, parts: [] })
    once = true
  }

  // Wait for sync and model store to be ready before auto-submitting --prompt
  createEffect(() => {
    const r = ref()
    if (sent) return
    if (!r) return
    if (!sync.ready || !local.model.ready) return
    if (!args.prompt) return
    if (r.current.input !== args.prompt) return
    sent = true
    r.submit()
  })

  return (
    <>
      <box flexGrow={1} alignItems="center" paddingLeft={2} paddingRight={2}>
        <box flexGrow={1} minHeight={0} />
        <box height={2} minHeight={0} flexShrink={1} />
        <box width="100%" maxWidth={75} flexShrink={0}>
          <TuiPluginRuntime.Slot name="home_logo" mode="replace">
            <HomeHeader />
          </TuiPluginRuntime.Slot>
        </box>
        <box height={1} minHeight={0} flexShrink={1} />
        <box width="100%" maxWidth={75} zIndex={1000} paddingTop={1} flexShrink={0}>
          <TuiPluginRuntime.Slot
            name="home_prompt"
            mode="replace"
            workspace_id={project.workspace.current()}
            ref={bind}
          >
            <Prompt
              ref={bind}
              workspaceID={project.workspace.current()}
              right={<TuiPluginRuntime.Slot name="home_prompt_right" workspace_id={project.workspace.current()} />}
              placeholders={placeholder}
            />
          </TuiPluginRuntime.Slot>
        </box>
        <TuiPluginRuntime.Slot name="home_bottom" />
        <box flexGrow={1} minHeight={0} />
        <Toast />
      </box>
      <box width="100%" flexShrink={0}>
        <TuiPluginRuntime.Slot name="home_footer" mode="single_winner" />
      </box>
    </>
  )
}

function HomeHeader() {
  const local = useLocal()
  const { theme } = useTheme()
  const agent = createMemo(() => local.agent.current())
  const directory = createMemo(() => process.cwd().replace(Global.Path.home, "~"))

  return (
    <box
      width="100%"
      border={["left", "right"]}
      borderColor={theme.border}
      backgroundColor={theme.backgroundPanel}
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
      flexDirection="row"
      gap={3}
    >
      <box flexShrink={0} width={13} alignItems="center">
        <For each={mascot}>
          {(line) => (
            <box width="100%" alignItems="center">
              <text fg={mascotColor}>{line}</text>
            </box>
          )}
        </For>
      </box>
      <box flexGrow={1} minWidth={0} gap={1}>
        <text fg={theme.text}>
          Seal Code <span style={{ fg: theme.textMuted }}>v{InstallationVersion}</span>
        </text>
        <text wrapMode="none">
          <span style={{ fg: theme.textMuted }}>agent: </span>
          <span style={{ fg: agent() ? local.agent.color(agent()!.name) : theme.textMuted, bold: true }}>
            {agent() ? Locale.titlecase(agent()!.name) : "None"}
          </span>
          <span style={{ fg: theme.textMuted }}> · model: </span>
          <span style={{ fg: theme.text }}>{local.model.parsed().model}</span>
        </text>
        <text wrapMode="none">
          <span style={{ fg: theme.textMuted }}>provider: </span>
          <span style={{ fg: theme.text }}>{local.model.parsed().provider}</span>
          <span style={{ fg: theme.textMuted }}> · directory: </span>
          <span style={{ fg: theme.text }}>{directory()}</span>
        </text>
      </box>
    </box>
  )
}
