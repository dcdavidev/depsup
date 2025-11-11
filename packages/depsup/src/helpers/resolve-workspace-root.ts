import { existsSync } from 'node:fs';
import path from 'node:path';

import { lockFilesNames, workspaceMarkers } from '../consts.js';

/**
 * Searches upwards from the starting directory to locate the monorepo or project root.
 * Recognizes roots for pnpm, yarn, npm, and bun by looking for conventional "workspace markers"
 * (e.g., 'pnpm-workspace.yaml', '.yarnrc.yml', 'bunfig.toml') or a 'package.json' plus any known lockfile
 * (e.g., 'pnpm-lock.yaml', 'yarn.lock', 'package-lock.json', 'bun.lockb').
 *
 * Returns the path to the first directory found that matches these criteria,
 * making it robust for polyrepo and monorepo setups across common package managers.
 * Throws an error (and sets process exit code) if no root is found.
 * @param {string} cwd The starting directory path, typically `process.cwd()`.
 * @returns {string|undefined} The absolute path to the workspace/project root if found, otherwise throws.
 *
 * @example
 * import { resolveWorkspaceRoot } from './helpers/resolve-workspace-root.js';
 *
 * const workspaceRoot = resolveWorkspaceRoot(process.cwd());
 * console.log('Workspace root found at:', workspaceRoot);
 */
export function resolveWorkspaceRoot(cwd: string): string | undefined {
  let currentDir = path.resolve(cwd);
  const rootDir = path.parse(currentDir).root;
  let potentialRoot: string | undefined;

  while (currentDir !== rootDir) {
    if (
      workspaceMarkers.some((marker) =>
        existsSync(path.join(currentDir, marker))
      )
    ) {
      return currentDir;
    }

    if (
      !potentialRoot &&
      existsSync(path.join(currentDir, 'package.json')) &&
      lockFilesNames.some((lockFile) =>
        existsSync(path.join(currentDir, lockFile))
      )
    ) {
      potentialRoot = currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }

  if (potentialRoot) {
    return potentialRoot;
  }

  process.exitCode = 1;
  throw new Error(
    `Workspace root not found: no directory contains a workspace marker or package.json and any of ${lockFilesNames.join(
      ', '
    )}`
  );
}
