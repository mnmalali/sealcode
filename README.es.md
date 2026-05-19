<p align="center">El agente de programación con IA de código abierto.</p>
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

### Instalación

```bash
# YOLO
curl -fsSL https://github.com/mnmalali/sealcode/install | bash

# Gestores de paquetes
npm i -g sealcode-ai@latest        # o bun/pnpm/yarn
scoop install sealcode             # Windows
choco install sealcode             # Windows
brew install mnmalali/tap/sealcode # macOS y Linux (recomendado, siempre al día)
brew install sealcode              # macOS y Linux (fórmula oficial de brew, se actualiza menos)
sudo pacman -S sealcode            # Arch Linux (Stable)
paru -S sealcode-bin               # Arch Linux (Latest from AUR)
mise use -g sealcode               # cualquier sistema
nix run nixpkgs#sealcode           # o github:mnmalali/sealcode para la rama dev más reciente
```

> [!TIP]
> Elimina versiones anteriores a 0.1.x antes de instalar.

### Terminal UI

Seal Code runs in your terminal: switch agents with `Tab`, open commands with `Ctrl+P`, and connect your provider with `/connect` before you start coding.

<p align="center">
  <img src=".github/assets/sealcode-tui.png" alt="Seal Code terminal UI">
</p>

#### Directorio de instalación

El script de instalación respeta el siguiente orden de prioridad para la ruta de instalación:

1. `$SEALCODE_INSTALL_DIR` - Directorio de instalación personalizado
2. `$XDG_BIN_DIR` - Ruta compatible con la especificación XDG Base Directory
3. `$HOME/bin` - Directorio binario estándar del usuario (si existe o se puede crear)
4. `$HOME/.sealcode/bin` - Alternativa por defecto

```bash
# Ejemplos
SEALCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://github.com/mnmalali/sealcode/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://github.com/mnmalali/sealcode/install | bash
```

### Agentes

Seal Code incluye dos agentes integrados que puedes alternar con la tecla `Tab`.

- **build** - Por defecto, agente con acceso completo para tareas de desarrollo
- **plan** - Agente de solo lectura para análisis y exploración de código
  - Deniega ediciones de archivos por defecto
  - Pide permiso antes de ejecutar comandos bash
  - Ideal para explorar codebases desconocidas o planificar cambios

Además, incluye un subagente **general** para búsquedas complejas y tareas de varios pasos.
Se usa internamente y se puede invocar con `@general` en los mensajes.

Más información sobre [agentes](https://github.com/mnmalali/sealcode/docs/agents).

### Documentación

Para más información sobre cómo configurar Seal Code, [**ve a nuestra documentación**](https://github.com/mnmalali/sealcode/docs).

### Contribuir

Si te interesa contribuir a Seal Code, lee nuestras [docs de contribución](./CONTRIBUTING.md) antes de enviar un pull request.

### Proyectos basados en Seal Code

Si estás trabajando en un proyecto basado en Seal Code y usas "sealcode" como parte del nombre, por ejemplo, "sealcode-dashboard" u "sealcode-mobile", agrega una nota en tu README para aclarar que no está hecho por el equipo de Seal Code y que no está afiliado con nosotros de ninguna manera.

### FAQ

#### ¿En qué se diferencia de Claude Code?

Es muy similar a Claude Code en cuanto a capacidades. Estas son las diferencias clave:

- 100% open source
- No está ligado a ningún proveedor. Aunque recomendamos los modelos que ofrecemos a través de [Seal Code Zen](https://github.com/mnmalali/sealcode/zen), Seal Code se puede usar con Claude, OpenAI, Google o incluso modelos locales. A medida que evolucionan los modelos, las brechas se cerrarán y los precios bajarán, por lo que ser agnóstico al proveedor es importante.
- Soporte LSP listo para usar
- Un enfoque en la TUI. Seal Code es desarrollado por usuarios de Neovim y los creadores de [terminal.shop](https://terminal.shop); vamos a llevar al límite lo que es posible en la terminal.
- Arquitectura cliente/servidor. Esto, por ejemplo, permite ejecutar Seal Code en tu computadora mientras lo controlas de forma remota desde una app móvil. Esto significa que el frontend TUI es solo uno de los posibles clientes.

---

**Únete a nuestra comunidad** [Discord](https://discord.gg/sealcode) | [X.com](https://x.com/sealcode)
