<p align="center">Ο πράκτορας τεχνητής νοημοσύνης ανοικτού κώδικα για προγραμματισμό.</p>
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

### Εγκατάσταση

```bash
# YOLO
curl -fsSL https://github.com/mnmalali/sealcode/install | bash

# Διαχειριστές πακέτων
npm i -g sealcode-ai@latest        # ή bun/pnpm/yarn
scoop install sealcode             # Windows
choco install sealcode             # Windows
brew install mnmalali/tap/sealcode # macOS και Linux (προτείνεται, πάντα ενημερωμένο)
brew install sealcode              # macOS και Linux (επίσημος τύπος brew, λιγότερο συχνές ενημερώσεις)
sudo pacman -S sealcode            # Arch Linux (Σταθερό)
paru -S sealcode-bin               # Arch Linux (Τελευταία έκδοση από AUR)
mise use -g sealcode               # Οποιοδήποτε λειτουργικό σύστημα
nix run nixpkgs#sealcode           # ή github:mnmalali/sealcode με βάση την πιο πρόσφατη αλλαγή από το dev branch
```

> [!TIP]
> Αφαίρεσε παλαιότερες εκδόσεις από τη 0.1.x πριν από την εγκατάσταση.

### Terminal UI

Seal Code runs in your terminal: switch agents with `Tab`, open commands with `Ctrl+P`, and connect your provider with `/connect` before you start coding.

<p align="center">
  <img src=".github/assets/sealcode-tui.png" alt="Seal Code terminal UI">
</p>

#### Κατάλογος Εγκατάστασης

Το script εγκατάστασης τηρεί την ακόλουθη σειρά προτεραιότητας για τη διαδρομή εγκατάστασης:

1. `$SEALCODE_INSTALL_DIR` - Προσαρμοσμένος κατάλογος εγκατάστασης
2. `$XDG_BIN_DIR` - Διαδρομή συμβατή με τις προδιαγραφές XDG Base Directory
3. `$HOME/bin` - Τυπικός κατάλογος εκτελέσιμων αρχείων χρήστη (εάν υπάρχει ή μπορεί να δημιουργηθεί)
4. `$HOME/.sealcode/bin` - Προεπιλεγμένη εφεδρική διαδρομή

```bash
# Παραδείγματα
SEALCODE_INSTALL_DIR=/usr/local/bin curl -fsSL https://github.com/mnmalali/sealcode/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://github.com/mnmalali/sealcode/install | bash
```

### Πράκτορες

Το Seal Code περιλαμβάνει δύο ενσωματωμένους πράκτορες μεταξύ των οποίων μπορείτε να εναλλάσσεστε με το πλήκτρο `Tab`.

- **build** - Προεπιλεγμένος πράκτορας με πλήρη πρόσβαση για εργασία πάνω σε κώδικα
- **plan** - Πράκτορας μόνο ανάγνωσης για ανάλυση και εξερεύνηση κώδικα
  - Αρνείται την επεξεργασία αρχείων από προεπιλογή
  - Ζητά άδεια πριν εκτελέσει εντολές bash
  - Ιδανικός για εξερεύνηση άγνωστων αρχείων πηγαίου κώδικα ή σχεδιασμό αλλαγών

Περιλαμβάνεται επίσης ένας **general** υποπράκτορας για σύνθετες αναζητήσεις και πολυβηματικές διεργασίες.
Χρησιμοποιείται εσωτερικά και μπορεί να κληθεί χρησιμοποιώντας `@general` στα μηνύματα.

Μάθετε περισσότερα για τους [πράκτορες](https://github.com/mnmalali/sealcode/docs/agents).

### Οδηγός Χρήσης

Για περισσότερες πληροφορίες σχετικά με τη ρύθμιση του Seal Code, [**πλοηγήσου στον οδηγό χρήσης μας**](https://github.com/mnmalali/sealcode/docs).

### Συνεισφορά

Εάν ενδιαφέρεσαι να συνεισφέρεις στο Seal Code, διαβάστε τα [οδηγό χρήσης συνεισφοράς](./CONTRIBUTING.md) πριν υποβάλεις ένα pull request.

### Δημιουργία πάνω στο Seal Code

Εάν εργάζεσαι σε ένα έργο σχετικό με το Seal Code και χρησιμοποιείτε το "sealcode" ως μέρος του ονόματός του, για παράδειγμα "sealcode-dashboard" ή "sealcode-mobile", πρόσθεσε μια σημείωση στο README σας για να διευκρινίσεις ότι δεν είναι κατασκευασμένο από την ομάδα του Seal Code και δεν έχει καμία σχέση με εμάς.

### Συχνές Ερωτήσεις

#### Πώς διαφέρει αυτό από το Claude Code;

Είναι πολύ παρόμοιο με το Claude Code ως προς τις δυνατότητες. Ακολουθούν οι βασικές διαφορές:

- 100% ανοιχτού κώδικα
- Δεν είναι συνδεδεμένο με κανέναν πάροχο. Αν και συνιστούμε τα μοντέλα που παρέχουμε μέσω του [Seal Code Zen](https://github.com/mnmalali/sealcode/zen), το Seal Code μπορεί να χρησιμοποιηθεί με Claude, OpenAI, Google, ή ακόμα και τοπικά μοντέλα. Καθώς τα μοντέλα εξελίσσονται, τα κενά μεταξύ τους θα κλείσουν και οι τιμές θα μειωθούν, οπότε είναι σημαντικό να είσαι ανεξάρτητος από τον πάροχο.
- Out-of-the-box υποστήριξη LSP
- Εστίαση στο TUI. Το Seal Code είναι κατασκευασμένο από χρήστες που χρησιμοποιούν neovim και τους δημιουργούς του [terminal.shop](https://terminal.shop)· θα εξαντλήσουμε τα όρια του τι είναι δυνατό στο terminal.
- Αρχιτεκτονική client/server. Αυτό, για παράδειγμα, μπορεί να επιτρέψει στο Seal Code να τρέχει στον υπολογιστή σου ενώ το χειρίζεσαι εξ αποστάσεως από μια εφαρμογή κινητού, που σημαίνει ότι το TUI frontend είναι μόνο ένας από τους πιθανούς clients.

---

**Γίνε μέλος της κοινότητάς μας** [Discord](https://discord.gg/sealcode) | [X.com](https://x.com/sealcode)
