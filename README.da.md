<p align="center">Den open source AI-kodeagent.</p>
<p align="center">
  <a href="https://github.com/mnmalali/sealcode/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/sealcode-ai"><img alt="npm" src="https://img.shields.io/npm/v/sealcode-ai?style=flat-square" /></a>
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

<p align="center">
  <img src="packages/web/src/assets/lander/seal-code-banner.png" alt="Seal Code banner">
</p>

---

### Installation

```bash
# YOLO
curl -fsSL https://github.com/mnmalali/sealcode/install | bash

# Pakkehåndteringer
npm i -g sealcode-ai@latest        # eller bun/pnpm/yarn
scoop install sealcode             # Windows
choco install sealcode             # Windows
brew install mnmalali/tap/sealcode # macOS og Linux (anbefalet, altid up to date)
brew install sealcode              # macOS og Linux (officiel brew formula, opdateres sjældnere)
sudo pacman -S sealcode            # Arch Linux (Stable)
paru -S sealcode-bin               # Arch Linux (Latest from AUR)
mise use -g sealcode               # alle OS
nix run nixpkgs#sealcode           # eller github:mnmalali/sealcode for nyeste dev-branch
```

> [!TIP]
> Fjern versioner ældre end 0.1.x før installation.

### Terminal UI

Seal Code runs in your terminal: switch agents with `Tab`, open commands with `Ctrl+P`, and connect your provider with `/connect` before you start coding.

<p align="center">
  <img src=".github/assets/sealcode-tui.png" alt="Seal Code terminal UI">
</p>

#### Installationsmappe

Installationsscriptet bruger følgende prioriteringsrækkefølge for installationsstien:

1. `$SEALCODE_INSTALL_DIR` - Tilpasset installationsmappe
2. `$XDG_BIN_DIR` - Sti der følger XDG Base Directory Specification
3. `$HOME/bin` - Standard bruger-bin-mappe (hvis den findes eller kan oprettes)
4. `$HOME/.sealcode/bin` - Standard fallback

```bash
# Eksempler
SEALCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://github.com/mnmalali/sealcode/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://github.com/mnmalali/sealcode/install | bash
```

### Agents

Seal Code har to indbyggede agents, som du kan skifte mellem med `Tab`-tasten.

- **build** - Standard, agent med fuld adgang til udviklingsarbejde
- **plan** - Skrivebeskyttet agent til analyse og kodeudforskning
  - Afviser filredigering som standard
  - Spørger om tilladelse før bash-kommandoer
  - Ideel til at udforske ukendte kodebaser eller planlægge ændringer

Derudover findes der en **general**-subagent til komplekse søgninger og flertrinsopgaver.
Den bruges internt og kan kaldes via `@general` i beskeder.

Læs mere om [agents](https://github.com/mnmalali/sealcode/docs/agents).

### Dokumentation

For mere info om konfiguration af Seal Code, [**se vores docs**](https://github.com/mnmalali/sealcode/docs).

### Bidrag

Hvis du vil bidrage til Seal Code, så læs vores [contributing docs](./CONTRIBUTING.md) før du sender en pull request.

### Bygget på Seal Code

Hvis du arbejder på et projekt der er relateret til Seal Code og bruger "sealcode" som en del af navnet; f.eks. "sealcode-dashboard" eller "sealcode-mobile", så tilføj en note i din README, der tydeliggør at projektet ikke er bygget af Seal Code-teamet og ikke er tilknyttet os på nogen måde.

### FAQ

#### Hvordan adskiller dette sig fra Claude Code?

Det minder meget om Claude Code i forhold til funktionalitet. Her er de vigtigste forskelle:

- 100% open source
- Ikke låst til en udbyder. Selvom vi anbefaler modellerne via [Seal Code Zen](https://github.com/mnmalali/sealcode/zen); kan Seal Code bruges med Claude, OpenAI, Google eller endda lokale modeller. Efterhånden som modeller udvikler sig vil forskellene mindskes og priserne falde, så det er vigtigt at være provider-agnostic.
- LSP-support out of the box
- Fokus på TUI. Seal Code er bygget af neovim-brugere og skaberne af [terminal.shop](https://terminal.shop); vi vil skubbe grænserne for hvad der er muligt i terminalen.
- Klient/server-arkitektur. Det kan f.eks. lade Seal Code køre på din computer, mens du styrer den eksternt fra en mobilapp. Det betyder at TUI-frontend'en kun er en af de mulige clients.

---

**Bliv en del af vores community** [Discord](https://discord.gg/sealcode) | [X.com](https://x.com/sealcode)
