<p align="center">Seal Code is an open source AI coding agent for the terminal.</p>
<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

<p align="center">
  <img src="packages/web/src/assets/lander/seal-code-banner.png" alt="Seal Code banner">
</p>

---

### Installation

```bash
bun install
bun run --cwd packages/sealcode script/build.ts --single --skip-install
./packages/sealcode/bin/sealcode --version
```

> [!TIP]
> Package-manager installers are not published yet for this independent Seal Code project.

### Terminal UI

Seal Code runs in your terminal: switch agents with `Tab`, open commands with `Ctrl+P`, and connect your provider with `/connect` before you start coding.

<p align="center">
  <img src=".github/assets/sealcode-tui.png" alt="Seal Code terminal UI">
</p>

#### Installation Directory

The install script respects the following priority order for the installation path:

1. `$SEALCODE_INSTALL_DIR` - Custom installation directory
2. `$XDG_BIN_DIR` - XDG Base Directory Specification compliant path
3. `$HOME/bin` - Standard user binary directory (if it exists or can be created)
4. `$HOME/.sealcode/bin` - Default fallback

```bash
# Examples
SEALCODE_INSTALL_DIR=/usr/local/bin ./install
XDG_BIN_DIR=$HOME/.local/bin ./install
```

### Agents

Seal Code includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

Learn more about agents in `packages/web/src/content/docs/agents.mdx`.

### Documentation

For more info on how to configure Seal Code, see the docs under `packages/web/src/content/docs`.

### Contributing

If you're interested in contributing to Seal Code, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

### Building on Seal Code

If you are working on a project that's related to Seal Code and is using "sealcode" as part of its name, for example "sealcode-dashboard" or "sealcode-mobile", please add a note to your README to clarify that it is not built by the Seal Code team and is not affiliated with us in any way.

### FAQ

#### How is this different from Claude Code?

It's very similar to Claude Code in terms of capability. Here are the key differences:

- 100% open source
- Not coupled to any provider. Seal Code can be used with Claude, OpenAI, Google, or local models. As models evolve, the gaps between them will close and pricing will drop, so being provider-agnostic is important.
- Built-in opt-in LSP support
- A focus on TUI. Seal Code is built for developers who want a fast terminal workflow.
- A client/server architecture. This can allow Seal Code to run on your computer while you drive it remotely from another client, meaning that the TUI frontend is just one of the possible clients.

---

### Attribution

Seal Code includes code derived from opencode by anomalyco under the MIT License. Seal Code is an independent rebranded project and is not affiliated with, endorsed by, or presented as an official GitHub fork of anomalyco/opencode.
