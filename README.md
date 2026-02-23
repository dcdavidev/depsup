# depsup

A powerful CLI tool to update dependencies in Nx workspaces and monorepos automatically.

![depsup logo](logo.png)

## Overview

`depsup` is designed to streamline the dependency update process for modern JavaScript/TypeScript monorepos, with first-class support for Nx workspaces. It handles the complexities of updating Nx itself, running migrations, and then systematically updating all other dependencies across your workspace using `npm-check-updates`.

## Features

- 🚀 **Automatic Nx Updates**: Updates Nx to the latest version and runs migrations automatically (skips if Nx not present).
- 📦 **Monorepo & Single-Package Support**: Updates dependencies in the workspace root and all packages within the `packages/` directory.
- 🎯 **Smart Package Manager Detection**: Automatically detects `npm`, `pnpm`, `yarn`, or `bun` based on lock files.
- 🔄 **Interactive Mode**: Choose which dependencies to update interactively (default).
- ⚡ **Non-Interactive/CI Mode**: Skip prompts and update all dependencies automatically with the `--ci` flag.
- 🖍️ **Fancy CLI**: Features a beautiful, color-coded output and a stylish startup logo.

## Quick Start

Run it directly without installation:

```bash
npx depsup
# or
pnpm dlx depsup
```

## Usage

```bash
# Interactive mode (default) - choose which dependencies to update
depsup

# Non-interactive/CI mode - update all dependencies automatically
depsup --ci

# Specify a custom Nx version to migrate to
depsup --nxVersion 18.0.0
```

## Development

This repository is a monorepo managed with [Turborepo](https://turbo.build/) and [pnpm](https://pnpm.io/).

### Tech Stack

- **Build Tool**: [tsdown](https://github.com/rolldown/tsdown) (powered by [Rolldown](https://rolldown.rs/))
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **Monorepo Manager**: [Turborepo](https://turbo.build/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Linting & Formatting**: [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) with custom configurations from `@spellbookx`.
- **Release Management**: [Release It!](https://github.com/release-it/release-it)

### Building

To build the `depsup` package:

```bash
pnpm run build
```

This will trigger `turbo run build`, which uses `tsdown` for bundling and `tsc` for type generation.

## License

This project is licensed under the MIT License.

**Copyright (c) 2026 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
