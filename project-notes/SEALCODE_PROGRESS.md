# Sealcode Rebrand Progress

Last updated: 2026-05-17

## Status

The rebrand implementation is in progress. The main package directory has moved from `packages/opencode` to `packages/sealcode`, the CLI shim has moved from `bin/opencode` to `bin/sealcode`, and broad tracked text/file identity replacements have been applied.

The MIT license text is preserved with the original opencode copyright notice. Sealcode attribution has been added in `project-notes/ATTRIBUTION.md`.

Current focus before validation:

- Regenerate dependency metadata after package and path renames.
- Run local typecheck, test/build gates where possible.
- Verify a local `sealcode` command can be invoked.

## Rebrand Changes Applied

| Area | Result |
| --- | --- |
| Core package path | `packages/opencode` renamed to `packages/sealcode` |
| CLI shim | `packages/sealcode/bin/opencode` renamed to `packages/sealcode/bin/sealcode` |
| Package scopes | Internal workspace references moved from `@opencode-ai/*` to `@sealcode-ai/*` |
| Runtime identity | User-facing `opencode`/`OpenCode`/`OPENCODE` strings replaced with `sealcode`/`Sealcode`/`SEALCODE` |
| Config paths | Tracked `.opencode` examples renamed to `.sealcode` |
| Attribution | `project-notes/ATTRIBUTION.md` documents upstream derivation and independence |
| Public metadata | Root README and package repository URLs now point at `mnmalali/sealcode` instead of upstream-owned URLs |
| SDK naming | CamelCase SDK and client names moved from `Opencode` to `Sealcode` |
| External auth packages | Published `opencode-gitlab-auth` and `opencode-poe-auth` package names were restored after broad replacement |
| Package typecheck | `bun typecheck` from `packages/sealcode` passed after renaming TSX-bearing `cwd.ts` to `cwd.tsx` |
| SDK generation | `bun packages\sdk\js\script\build.ts` completed and regenerated JavaScript SDK output |
| Build | `bun run script\build.ts --single --skip-install` from `packages/sealcode` passed and built `dist/sealcode-windows-x64/bin/sealcode.exe` |
| Local invocation | `sealcode --version`, `node packages\sealcode\bin\sealcode --version`, and `node_modules\.bin\sealcode.exe --version` passed with the built binary |
| Tests | Full `bun test --timeout 30000` from `packages/sealcode` timed out after 15 minutes, matching the baseline Windows behavior; targeted `test\cli\run\runtime.boot.test.ts` passed 5 tests |
| Lint | `bun run lint` from repo root passed with warning-level findings |
| Final audit | `git diff --check` passed; source search found no remaining old identity outside preserved attribution/license and intentional external package names |

## Validation Summary

| Gate | Command | Directory | Result |
| --- | --- | --- | --- |
| Install/regenerate deps | `bun install --linker hoisted` | repo root | Approved run timed out at 5 minutes but completed in the background; `node_modules\.bin\sealcode.exe` was present afterward |
| JS SDK regeneration | `bun packages\sdk\js\script\build.ts` | repo root | Passed |
| Typecheck | `bun typecheck` | `packages/sealcode` | Passed after implementation and again after final cleanup |
| Build | `bun run script\build.ts --single --skip-install` | `packages/sealcode` | Passed; build smoke printed `0.0.0-main-202605171324` |
| CLI invocation | `sealcode --version` with built bin on PATH | repo root | Passed: `0.0.0-main-202605171324` |
| Package bin invocation | `node_modules\.bin\sealcode.exe --version` with `SEALCODE_BIN_PATH` | repo root | Passed: `0.0.0-main-202605171324` |
| Targeted test | `bun test test\cli\run\runtime.boot.test.ts --timeout 30000` | `packages/sealcode` | Passed: 5 tests |
| Full tests | `bun test --timeout 30000` | `packages/sealcode` | Timed out after 15 minutes, same known baseline Windows issue |
| Lint | `bun run lint` | repo root | Passed with warnings |
| Diff sanity | `git diff --check` | repo root | Passed |

## Pre-Change Smoke Check

Before implementation, `.\packages\opencode\bin\sealcode --version` failed because no local `sealcode` CLI existed. This is the expected red check for the rebrand.

The initial local blocker was environmental: Bun is required by the repository but was not installed or available on PATH. A local Bun 1.3.13 binary was downloaded under `.tools/` and used for dependency installation and baseline gate attempts.

## Repository Facts Verified

- Working directory: `C:\Users\mnmal\OneDrive\Projects\sealcode`
- Git status at start of documentation pass: `## main...origin/main` with untracked `project-notes/`
- Current branch: `main`
- Available branches: `main`, `remotes/origin/main`
- Repository instructions say the default branch is `dev`; this local clone does not currently have a local or remote `dev` ref.
- Remote: `origin https://github.com/mnmalali/sealcode.git`
- Current HEAD: `53e89f9d5 chore: generate`
- Root manifest: `package.json`
- Package manager: `bun@1.3.13`
- Root lockfile: `bun.lock`
- Root package: `opencode` before rebrand, `sealcode` after current edits
- Root package description: `AI-powered development tool`
- Root license: `MIT`

## Dependency Installation

Checked dependency directories:

- Root `node_modules`: absent before install, present after install
- `packages/opencode/node_modules`: absent before install, present after install
- `github/node_modules`: absent before install
- `sdks/vscode/node_modules`: absent before install

Commands:

| Command | Directory | Result |
| --- | --- | --- |
| `bun --version` | repo root | Failed: `bun` is not recognized |
| `where.exe bun` | repo root | Failed: no Bun executable found |
| `Invoke-WebRequest ... bun-v1.3.13-windows-x64-baseline.zip` | repo root | Initial sandbox network failure; approved retry succeeded |
| `.tools\bun-windows-x64-baseline\bun.exe --version` | repo root | Passed: `1.3.13` |
| `bun install --linker hoisted` | repo root | First sandbox attempt failed: Bun could not write to tempdir |
| `bun install --linker hoisted` with workspace temp and approval | repo root | Passed: 2326 packages installed; postinstall ran `packages/opencode fix-node-pty`; `husky` prepare ran |

Conclusion: dependencies were installed using local Bun 1.3.13. The local Bun download remains in `.tools/`.

## Baseline Gate Attempts

These commands were run or attempted to establish the baseline after dependency installation.

| Gate | Command | Directory | Result |
| --- | --- | --- | --- |
| Typecheck | `bun typecheck` | `packages/opencode` | Passed, exit 0 (`tsgo --noEmit`) |
| Lint | `bun run lint` | repo root | Passed, exit 0, with many warning-level findings from `oxlint` |
| Unit tests | `bun test --timeout 30000` | `packages/opencode` | Sandbox run failed with `EPERM`; approved retry timed out after 15 minutes |
| Build | `bun run script\build.ts` | `packages/opencode` | Sandbox run failed with `EPERM`; approved retry failed after building embedded web UI, while resolving `@opentui`/Babel modules for the Linux ARM64 target |

Build failure detail:

- The build printed version metadata and generated `models-snapshot.js`.
- Vite built the embedded web UI successfully in about 52 seconds, with chunk-size and duplicate-emitted-file warnings.
- The build then attempted Linux ARM64 output and failed with module resolution errors including `Cannot find module '@babel/helper-compilation-targets'`, `Could not resolve: "@opentui/solid"`, and `Could not resolve: "@opentui/core-linux-arm64"`.
- Tracked files modified by the build/install attempt (`bun.lock`, `packages/opencode/package.json`, and model snapshot files) were restored to HEAD so the baseline documentation remains the only intended source change.

## Canonical Commands Identified

From `package.json`, `CONTRIBUTING.md`, `turbo.json`, and GitHub workflows:

- Install dependencies: `bun install`
- Root lint: `bun run lint`
- Root CI typecheck: `bun typecheck`
- Package typecheck pattern required by repo instructions: run `bun typecheck` from package directories such as `packages/sealcode`
- Root tests: do not run; root `test` script intentionally exits with `do not run tests from root`
- Core package unit tests: `bun test --timeout 30000` from `packages/sealcode`
- Core package HTTP API gates: `bun run test:httpapi` from `packages/sealcode`
- Core package build: `bun run script/build.ts` from `packages/sealcode`
- CI unit tests: `bun turbo test:ci`
- App e2e tests: `bun --cwd packages/app test:e2e:local`
- Storybook build: `bun --cwd packages/storybook build`
- JavaScript SDK regeneration: `./packages/sdk/js/script/build.ts`

## License And Attribution Inventory

Files/assets found that should be preserved:

- `LICENSE`
- `packages/docs/LICENSE`
- `packages/extensions/zed/LICENSE`
- `project-notes/ATTRIBUTION.md`
- `packages/ui/src/assets/icons/file-types/authors.svg`
- `packages/ui/src/assets/icons/file-types/credits.svg`

## Open Baseline Items

- Decide whether to keep or remove the local `.tools/` Bun download.
- Investigate the `packages/opencode` test timeout on Windows.
- Investigate the `packages/opencode` build failure for Linux ARM64 target module resolution.
- Run broader CI-equivalent gates only after the core test/build blockers are understood.
- Complete validation after rebrand repairs and dependency regeneration.
