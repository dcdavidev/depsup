# depsup

A powerful CLI tool to update dependencies in Nx workspaces and monorepos automatically.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [CLI](#cli)
  - [Programmatic API](#programmatic-api)
- [How It Works](#how-it-works)
- [Supported Package Managers](#supported-package-managers)
- [API Reference](#api-reference)
  - [depsup(options)](#depsupoptions)
  - [Exported Utilities](#exported-utilities)
- [Examples](#examples)
- [Building](#building)
- [License](#license)

## Features

- 🚀 **Automatic Nx Updates**: Updates Nx to the latest version and runs migrations automatically
- 📦 **Monorepo Support**: Updates dependencies in all workspace packages, not just the root
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

### CLI

Run in your workspace root or any subdirectory:

```bash
# Interactive mode (default) - choose which dependencies to update
depsup

# Non-interactive mode - update all dependencies automatically
depsup -y
depsup --yes
```

### Programmatic API

You can also use depsup programmatically in your Node.js scripts:

```typescript
import { depsup } from 'depsup';

// Interactive mode
await depsup();

// Non-interactive mode
await depsup({ yes: true });
```

## How It Works

1. **Resolves Workspace Root**: Automatically detects the workspace root by looking for workspace markers (`pnpm-workspace.yaml`, `.yarnrc.yml`, `bunfig.toml`) or `package.json` with lock files
2. **Detects Package Manager**: Identifies the package manager by scanning for lock files:
   - `package-lock.json` → npm
   - `pnpm-lock.yaml` → pnpm
   - `yarn.lock` → yarn
   - `bun.lock` or `bun.lockb` → bun
3. **Updates Nx**: Runs `nx migrate latest` and applies migrations if Nx is detected in the workspace
4. **Updates Root Dependencies**: Updates dependencies in the workspace root `package.json`
5. **Updates Package Dependencies**: Iterates through all packages in the `packages/` directory and updates their dependencies
6. **Skips Non-Package Directories**: Automatically skips directories without a `package.json`

## Supported Package Managers

- **npm** - Uses `npx npm-check-updates`
- **pnpm** - Uses `pnpm dlx npm-check-updates`
- **yarn** - Uses `yarn dlx npm-check-updates`
- **bun** - Uses `bunx npm-check-updates`

## API Reference

### depsup(options)

Main function to update dependencies in the workspace.

**Parameters:**

- `options` (Object, optional):
  - `yes` (boolean, default: `false`): Skip interactive mode and confirm all prompts

**Returns:** `Promise<void>`

**Example:**

```typescript
import { depsup } from 'depsup';

// Interactive mode
await depsup();

// Auto-confirm all updates
await depsup({ yes: true });
```

### Exported Utilities

The package also exports several utility functions and constants that can be used independently:

```typescript
import {
  // Logging utilities
  logError,
  logInfo,
  logOk,
  logWarn,

  // Constants
  PACKAGE_MANAGER,
  PACKAGE_MANAGERS,
  LOCK_FILE,
  lockFilesNames,
  lockFileToPackageManager,
  dlx,
  workspaceMarkers,

  // Types
  type PackageManager,
} from 'depsup';
```

**Constants:**

- `PACKAGE_MANAGERS`: Object containing all supported package manager names
- `LOCK_FILE`: Object mapping package managers to their lock file names
- `lockFilesNames`: Array of all lock file names
- `lockFileToPackageManager`: Map from lock file name to package manager
- `dlx`: Map from package manager to their execute command (npx, pnpm dlx, etc.)
- `workspaceMarkers`: Array of files that indicate a workspace root

**Types:**

- `PackageManager`: Type representing supported package managers ('npm' | 'pnpm' | 'yarn' | 'bun')

## Examples

**Update all dependencies in interactive mode:**

```bash
depsup
```

**Update all dependencies automatically (CI/CD):**

```bash
depsup --yes
```

**Use in a npm script:**

```json
{
  "scripts": {
    "update-deps": "depsup",
    "update-deps:auto": "depsup -y"
  }
}
```

**Use programmatically:**

```typescript
import { depsup } from 'depsup';

async function updateProjectDeps() {
  try {
    await depsup({ yes: process.env.CI === 'true' });
    console.log('Dependencies updated successfully!');
  } catch (error) {
    console.error('Failed to update dependencies:', error);
    process.exit(1);
  }
}

updateProjectDeps();
```

## Building

This library was generated with [Nx](https://nx.dev).

Run `nx build depsup` to build the library.

## License

This project is licensed under the MIT License.

**Copyright (c) 2025 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
