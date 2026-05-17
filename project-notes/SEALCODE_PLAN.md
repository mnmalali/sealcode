# Sealcode Baseline Plan

Last updated: 2026-05-17

## Purpose

Establish the current repository baseline before any rebranding work. Do not rename packages, source symbols, files, branding assets, URLs, licenses, or attribution yet.

## Current Baseline

- Repository path: `C:\Users\mnmal\OneDrive\Projects\sealcode`
- Git remote: `origin https://github.com/mnmalali/sealcode.git`
- Current local branch: `main`
- Repository instructions say the default branch is `dev`, but this clone only has `main` and `origin/main` locally at the time of this baseline.
- Current HEAD: `53e89f9d5 chore: generate`
- Root package name: `opencode`
- Root package description: `AI-powered development tool`
- Root repository metadata still points to `https://github.com/anomalyco/opencode`
- Root license: `MIT`
- User-facing baseline branding in `README.md`: OpenCode / opencode.ai
- No rebranding or rename changes have been made as part of this baseline pass.

## Package Manager And Dependency Plan

- Canonical package manager: Bun, from root `package.json` field `packageManager: "bun@1.3.13"`.
- Lockfile: root `bun.lock`.
- CI installs Bun through `.github/actions/setup-bun/action.yml`.
- Canonical install command from `CONTRIBUTING.md`: `bun install`.
- CI uses `bun install --linker hoisted` on Windows and `bun install` elsewhere.
- `bun` was not available on PATH initially, so Bun 1.3.13 was downloaded locally to `.tools/bun-windows-x64-baseline/bun.exe`.
- Dependencies were installed with the Windows CI-style command: `bun install --linker hoisted`.
- After install, root `node_modules` and `packages/opencode/node_modules` exist.

## Canonical Commands Found

Use Bun commands from the repository/package directories. Do not use `tsc` directly for repo typechecking.

### Root

- Install dependencies: `bun install`
- Development CLI: `bun dev`
- Lint: `bun run lint` (`lint` script runs `oxlint`)
- Root typecheck script: `bun typecheck` (`typecheck` script runs `bun turbo typecheck`)
- Root test script: intentionally blocked by `echo 'do not run tests from root' && exit 1`

### Core Package: `packages/opencode`

- Typecheck: `bun typecheck`
- Unit tests: `bun test --timeout 30000`
- CI unit tests: `bun test --timeout 30000 --reporter=junit --reporter-outfile=.artifacts/unit/junit.xml`
- HTTP API gates: `bun run test:httpapi`
- Build CLI: `bun run script/build.ts`
- Dev CLI: `bun run --conditions=browser ./src/index.ts`

### SDK

- JavaScript SDK package: `packages/sdk/js`
- Typecheck: `bun typecheck`
- Build/regenerate SDK: `./packages/sdk/js/script/build.ts` or `bun ./script/build.ts` from `packages/sdk/js`
- Root `script/generate.ts` also calls `bun ./packages/sdk/js/script/build.ts`

### CI Gates

- `.github/workflows/typecheck.yml`: `bun typecheck`
- `.github/workflows/test.yml`: `bun turbo test:ci`
- `.github/workflows/test.yml`: `bun run test:httpapi` from `packages/opencode` on Linux
- `.github/workflows/test.yml`: `bun --cwd packages/app test:e2e:local`
- `.github/workflows/storybook.yml`: `bun --cwd packages/storybook build`

## License And Attribution Preservation

Preserve these files and assets during any future rebranding work:

- `LICENSE`
- `packages/docs/LICENSE`
- `packages/extensions/zed/LICENSE`
- `project-notes/ATTRIBUTION.md`
- `packages/ui/src/assets/icons/file-types/authors.svg`
- `packages/ui/src/assets/icons/file-types/credits.svg`

Also preserve all existing copyright, license, attribution, third-party notice, and translated README content unless there is a specific reviewed change.

## Next Steps After Baseline

1. Decide whether to keep the local `.tools/` Bun download or replace it with a normal Bun installation on PATH.
2. Investigate the Windows test timeout from `bun test --timeout 30000` in `packages/opencode`.
3. Investigate the Windows build failure from `bun run script/build.ts` in `packages/opencode`; the build reached the embedded web UI build, then failed resolving `@opentui`/Babel modules while building the Linux ARM64 target.
4. Optionally run broader CI-equivalent gates once the test/build blockers are understood:
   - `bun turbo test:ci`
   - `bun run test:httpapi` from `packages/opencode`
   - `bun --cwd packages/app test:e2e:local`
   - `bun --cwd packages/storybook build`
5. Only after a documented green or intentionally accepted baseline should rebranding changes begin.

## Sealcode Rebrand Implementation Plan

Goal: rename user-facing project identity from opencode/OpenCode to sealcode/Sealcode while preserving MIT licensing, copyright notices, and independent attribution.

Scope:

- Rename package metadata from `opencode` / `@opencode-ai/*` to `sealcode` / `@sealcode-ai/*` for workspace packages.
- Rename the core package directory from `packages/opencode` to `packages/sealcode` and update repository scripts and CI paths that point to it.
- Rename the CLI shim and built binary from `opencode` to `sealcode`.
- Change runtime identity defaults: script name, user agent, XDG app/config/cache/state paths, env vars, app protocol/product names, and generated binary/package names.
- Update README, CONTRIBUTING, install script, and project notes to describe Sealcode as independent and derived from opencode by anomalyco under MIT.
- Preserve external dependency package names that are not owned by this repo, including `opencode-gitlab-auth` and `opencode-poe-auth`.
- Preserve original `LICENSE`, package `license` fields, and all required attribution/copyright notices.

Validation plan:

1. Pre-change smoke: `packages/opencode/bin/sealcode --version` should fail because the binary does not exist yet.
2. After edits, run `bun install --linker hoisted` with local Bun 1.3.13.
3. Run package typecheck from `packages/sealcode`: `bun typecheck`.
4. Run root lint: `bun run lint`.
5. Run targeted tests where possible, starting with package smoke/unit commands that complete locally.
6. Run local build from `packages/sealcode`: `bun run script/build.ts --single --skip-install` if full multi-target build remains blocked by cross-platform optional dependency resolution.
7. Verify local invocation as `sealcode` using either the generated binary or package bin shim: `sealcode --version`.

Known risk:

- The baseline full build on Windows failed when the all-target build reached Linux ARM64 optional dependency resolution. The first completion target is a local single-platform build that proves `sealcode` can be built and invoked locally.
