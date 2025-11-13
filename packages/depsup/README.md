# depsup

A powerful CLI tool to update dependencies in Nx workspaces and monorepos automatically.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Supported Package Managers](#supported-package-managers)
- [Examples](#examples)
- [Building](#building)
- [License](#license)

## Features

- 🚀 **Automatic Nx Updates**: Updates Nx to the latest version and runs migrations automatically (skips if Nx not present)
- 📦 **Monorepo & Single-Package Support**: Updates dependencies in workspace root and all packages in `packages/` directory
- 🎯 **Smart Package Manager Detection**: Automatically detects npm, pnpm, yarn, or bun based on lock files
- 🔄 **Interactive Mode**: Choose which dependencies to update interactively (default)
- ⚡ **Non-Interactive Mode**: Skip prompts and update all dependencies automatically with `-y` flag
- 🔍 **Workspace Root Detection**: Automatically finds the workspace root from any subdirectory
- 📊 **Uses npm-check-updates**: Leverages the powerful npm-check-updates tool under the hood

## Installation

```bash
# Using npm
npm install -g depsup

# Using pnpm
pnpm add -g depsup

# Using yarn
yarn global add depsup

# Using bun
bun add -g depsup
```

Or use directly with npx/pnpm dlx/yarn dlx/bunx:

```bash
npx depsup
pnpm dlx depsup
yarn dlx depsup
bunx depsup
```

## Usage

Run in your workspace root or any subdirectory:

```bash
# Interactive mode (default) - choose which dependencies to update
depsup

# Non-interactive mode - update all dependencies automatically
depsup -y
depsup --yes
```

## How It Works

1. **Resolves Workspace Root**: Automatically detects the workspace root by looking for workspace markers (`pnpm-workspace.yaml`, `.yarnrc.yml`, `bunfig.toml`) or `package.json` with lock files
2. **Detects Package Manager**: Identifies the package manager by scanning for lock files:
   - `package-lock.json` → npm
   - `pnpm-lock.yaml` → pnpm
   - `yarn.lock` → yarn
   - `bun.lock` or `bun.lockb` → bun
3. **Updates Nx** (if present): Runs `nx migrate latest` and applies migrations automatically
4. **Updates Root Dependencies**: Updates dependencies in the workspace root `package.json`
5. **Updates Package Dependencies**: Iterates through all packages in the `packages/` directory (skips if directory doesn't exist)
6. **Skips Non-Package Directories**: Automatically skips directories without a `package.json`

## Supported Package Managers

- **npm** - Uses `npx npm-check-updates`
- **pnpm** - Uses `pnpm dlx npm-check-updates`
- **yarn** - Uses `yarn dlx npm-check-updates`
- **bun** - Uses `bunx npm-check-updates`

## Examples

**Update all dependencies in interactive mode:**

```bash
depsup
```

**Update all dependencies automatically (CI/CD):**

```bash
depsup --yes
```

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build depsup` to build the library.

## License

This project is licensed under the MIT License.

**Copyright (c) 2025 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
