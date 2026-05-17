<p align="center">
  <a href="https://github.com/mnmalali/sealcode">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Sealcode logo">
    </picture>
  </a>
</p>
<p align="center">The open source AI coding agent.</p>
<p align="center">
  <a href="https://github.com/mnmalali/sealcode/actions"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/mnmalali/sealcode/publish.yml?style=flat-square&branch=dev" /></a>
</p>

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

[![Sealcode Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://github.com/mnmalali/sealcode)

---

### Installation

```bash
bun install
bun run --cwd packages/sealcode script/build.ts --single --skip-install
./packages/sealcode/bin/sealcode --version
```

> [!TIP]
> Published package-manager installers are not yet configured for this independent Sealcode project.

### Desktop App (BETA)

Sealcode desktop packaging is inherited from the upstream codebase but independent release artifacts are not yet published. Future releases will be listed on the [releases page](https://github.com/mnmalali/sealcode/releases).

| Platform              | Download                           |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `sealcode-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `sealcode-desktop-mac-x64.dmg`     |
| Windows               | `sealcode-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm`, or `.AppImage`     |

```bash
# Desktop package-manager installers are not yet published for Sealcode.
```

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

Sealcode includes two built-in agents you can switch between with the `Tab` key.

- **build** - Default, full-access agent for development work
- **plan** - Read-only agent for analysis and code exploration
  - Denies file edits by default
  - Asks permission before running bash commands
  - Ideal for exploring unfamiliar codebases or planning changes

Also included is a **general** subagent for complex searches and multistep tasks.
This is used internally and can be invoked using `@general` in messages.

Learn more about agents in `packages/web/src/content/docs/agents.mdx`.

### Documentation

For more info on how to configure Sealcode, see the docs under `packages/web/src/content/docs`.

### Contributing

If you're interested in contributing to Sealcode, please read our [contributing docs](./CONTRIBUTING.md) before submitting a pull request.

### Building on Sealcode

If you are working on a project that's related to Sealcode and is using "sealcode" as part of its name, for example "sealcode-dashboard" or "sealcode-mobile", please add a note to your README to clarify that it is not built by the Sealcode team and is not affiliated with us in any way.

### FAQ

#### How is this different from Claude Code?

It's very similar to Claude Code in terms of capability. Here are the key differences:

- 100% open source
- Not coupled to any provider. Sealcode can be used with Claude, OpenAI, Google, or local models. As models evolve, the gaps between them will close and pricing will drop, so being provider-agnostic is important.
- Built-in opt-in LSP support
- A focus on TUI. Sealcode is built by neovim users and the creators of [terminal.shop](https://terminal.shop); we are going to push the limits of what's possible in the terminal.
- A client/server architecture. This, for example, can allow Sealcode to run on your computer while you drive it remotely from a mobile app, meaning that the TUI frontend is just one of the possible clients.

---

### Attribution

Sealcode includes code derived from opencode by anomalyco under the MIT License. Sealcode is an independent rebranded project and is not affiliated with, endorsed by, or presented as an official GitHub fork of anomalyco/opencode.
