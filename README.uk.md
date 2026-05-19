<p align="center">AI-агент для програмування з відкритим кодом.</p>
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

### Встановлення

```bash
# YOLO
curl -fsSL https://github.com/mnmalali/sealcode/install | bash

# Менеджери пакетів
npm i -g sealcode-ai@latest        # або bun/pnpm/yarn
scoop install sealcode             # Windows
choco install sealcode             # Windows
brew install mnmalali/tap/sealcode # macOS і Linux (рекомендовано, завжди актуально)
brew install sealcode              # macOS і Linux (офіційна формула Homebrew, оновлюється рідше)
sudo pacman -S sealcode            # Arch Linux (Stable)
paru -S sealcode-bin               # Arch Linux (Latest from AUR)
mise use -g sealcode               # Будь-яка ОС
nix run nixpkgs#sealcode           # або github:mnmalali/sealcode для найновішої dev-гілки
```

> [!TIP]
> Перед встановленням видаліть версії старші за 0.1.x.

### Terminal UI

Seal Code runs in your terminal: switch agents with `Tab`, open commands with `Ctrl+P`, and connect your provider with `/connect` before you start coding.

<p align="center">
  <img src=".github/assets/sealcode-tui.png" alt="Seal Code terminal UI">
</p>

#### Каталог встановлення

Скрипт встановлення дотримується такого порядку пріоритету для шляху встановлення:

1. `$SEALCODE_INSTALL_DIR` - Користувацький каталог встановлення
2. `$XDG_BIN_DIR` - Шлях, сумісний зі специфікацією XDG Base Directory
3. `$HOME/bin` - Стандартний каталог користувацьких бінарників (якщо існує або його можна створити)
4. `$HOME/.sealcode/bin` - Резервний варіант за замовчуванням

```bash
# Приклади
SEALCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://github.com/mnmalali/sealcode/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://github.com/mnmalali/sealcode/install | bash
```

### Агенти

Seal Code містить два вбудовані агенти, між якими можна перемикатися клавішею `Tab`.

- **build** - Агент за замовчуванням із повним доступом для завдань розробки
- **plan** - Агент лише для читання для аналізу та дослідження коду
  - За замовчуванням забороняє редагування файлів
  - Запитує дозвіл перед запуском bash-команд
  - Ідеально підходить для дослідження незнайомих кодових баз або планування змін

Також доступний допоміжний агент **general** для складного пошуку та багатокрокових завдань.
Він використовується всередині системи й може бути викликаний у повідомленнях через `@general`.

Дізнайтеся більше про [agents](https://github.com/mnmalali/sealcode/docs/agents).

### Документація

Щоб дізнатися більше про налаштування Seal Code, [**перейдіть до нашої документації**](https://github.com/mnmalali/sealcode/docs).

### Внесок

Якщо ви хочете зробити внесок в Seal Code, будь ласка, прочитайте нашу [документацію для контриб'юторів](./CONTRIBUTING.md) перед надсиланням pull request.

### Проєкти на базі Seal Code

Якщо ви працюєте над проєктом, пов'язаним з Seal Code, і використовуєте "sealcode" у назві, наприклад "sealcode-dashboard" або "sealcode-mobile", додайте примітку до свого README.
Уточніть, що цей проєкт не створений командою Seal Code і жодним чином не афілійований із нами.

### FAQ

#### Чим це відрізняється від Claude Code?

За можливостями це дуже схоже на Claude Code. Ось ключові відмінності:

- 100% open source
- Немає прив'язки до конкретного провайдера. Ми рекомендуємо моделі, які надаємо через [Seal Code Zen](https://github.com/mnmalali/sealcode/zen), але Seal Code також працює з Claude, OpenAI, Google і навіть локальними моделями. З розвитком моделей різниця між ними зменшуватиметься, а ціни падатимуть, тому незалежність від провайдера має значення.
- Підтримка LSP з коробки
- Фокус на TUI. Seal Code створено користувачами neovim та авторами [terminal.shop](https://terminal.shop); ми й надалі розширюватимемо межі можливого в терміналі.
- Клієнт-серверна архітектура. Наприклад, це дає змогу запускати Seal Code на вашому комп'ютері й керувати ним віддалено з мобільного застосунку, тобто TUI-фронтенд - лише один із можливих клієнтів.

---

**Приєднуйтеся до нашої спільноти** [Discord](https://discord.gg/sealcode) | [X.com](https://x.com/sealcode)
