# Repository Guidelines

## Project Structure & Module Organization

This repository contains a TypeScript command-line client for the TinyPNG API. Source code lives under `src/`:

- `src/cli/` defines the main executable and setup entry points.
- `src/core/` contains logging and asynchronous task coordination.
- `src/config/` manages application configuration.
- `src/utils/` contains argument, cache, help, banner, and version helpers.
- `src/i18n/` contains localization setup and JSON dictionaries in `locales/`.

`tsup` compiles the two CLI entry points into `dist/`. Treat `dist/` as generated output; edit `src/` instead. User-facing documentation is maintained in `README.md` and `README_CN.md`.

## Build, Test, and Development Commands

Use the package manager represented by `pnpm-lock.yaml`:

- `pnpm install` installs dependencies and runs the optional setup script.
- `pnpm dev` rebuilds with `tsup` whenever source files change.
- `pnpm build` creates minified CommonJS bundles in `dist/`.
- `pnpm exec eslint .` checks TypeScript and configuration files.
- `pnpm exec tsc --noEmit` performs a strict type check.
- `pnpm test:cli:help` and `pnpm test:cli:version` smoke-test the built CLI; run `pnpm build` first.

Other `test:cli:*` scripts exercise live CLI behavior and may require a valid TinyPNG API key or create output/cache data.

## Coding Style & Naming Conventions

Follow the Antfu ESLint configuration in `eslint.config.mjs`; console output is intentionally allowed for this CLI. Existing TypeScript uses two-space indentation, single quotes, no semicolons, and trailing commas in multiline structures. Use `PascalCase` for classes (for example, `AsyncTaskManager`), `camelCase` for functions and variables, and descriptive lowercase filenames for utilities. Keep locale keys synchronized between `src/i18n/locales/en.json` and `zh.json`.

## Testing Guidelines

There is currently no unit-test framework or coverage threshold. For every change, run lint, type checking, a production build, and the relevant CLI smoke scripts. If adding automated tests, place them beside the implementation as `*.test.ts` or introduce a documented `tests/` directory and test command.

## Commit & Pull Request Guidelines

Recent history uses short subjects such as `fix`, `update`, and `release v0.0.49`. Prefer a more descriptive imperative subject, such as `fix cache lookup for output mode`, while keeping release commits in the existing `release vX.Y.Z` form. Pull requests should explain behavior changes, list verification commands, link related issues, and include terminal output or screenshots when CLI presentation changes. Never commit TinyPNG API keys, `~/.zd.tinify` contents, or generated test output.
