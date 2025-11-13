<img alt="logo" src="./images/readme-banner.png" />

# depsup

A powerful CLI tool to update dependencies in Nx workspaces and monorepos automatically.

## Table of Contents

- [What does depsup do?](#what-does-depsup-do)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## What does depsup do?

**depsup** is a CLI tool that automates dependency updates across your entire workspace:

1. 🔍 **Auto-detects your environment**
   - Finds workspace root (supports pnpm, yarn, bun workspaces)
   - Identifies package manager (npm, pnpm, yarn, bun) via lock files

2. 🚀 **Updates Nx (if present)**
   - Runs `nx migrate latest`
   - Applies migrations automatically
   - Skips if Nx isn't in your project

3. 📦 **Updates all dependencies**
   - Root `package.json` first
   - Then all packages in `packages/` directory
   - Skips directories without `package.json`
   - Works in monorepos and single-package projects

4. 🎯 **Two modes**
   - **Interactive** (default): Choose which dependencies to update
   - **Auto** (`-y`): Update everything automatically

Built with Commander.js and powered by `npm-check-updates` under the hood.

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

Or use directly without installation:

```bash
npx depsup
pnpm dlx depsup
yarn dlx depsup
bunx depsup
```

## Usage

```bash
# Interactive mode (default) - choose which dependencies to update
depsup

# Auto mode - update all dependencies automatically
depsup -y
depsup --yes
```

---

## License

This project is licensed under the MIT License.

**Copyright (c) 2025 Davide Di Criscito**

For the full details, see the [LICENSE](LICENSE) file.
