import { existsSync } from 'node:fs';
import path from 'node:path';

import { lockFilesNames, workspaceMarkers } from '../consts.js';

/**
 * Searches upwards from the starting directory to locate the monorepo or project root.
 * @param cwd The starting directory path.
 * @returns The absolute path to the workspace/project root if found.
 * @throws If no root is found.
 * @example
 * resolveWorkspaceRoot(process.cwd());
 */
export function resolveWorkspaceRoot(cwd: string): string {
  let currentDir = path.resolve(cwd);
  const rootDir = path.parse(currentDir).root;

  while (currentDir !== rootDir) {
    if (
      workspaceMarkers.some((marker) =>
        existsSync(path.join(currentDir, marker))
      )
    ) {
      return currentDir;
    }

    if (
      existsSync(path.join(currentDir, 'package.json')) &&
      lockFilesNames.some((lockFile) =>
        existsSync(path.join(currentDir, lockFile))
      )
    ) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break;
    currentDir = parentDir;
  }

  throw new Error(
    `Workspace root not found: no directory contains a workspace marker or package.json and any of ${lockFilesNames.join(
      ', '
    )}`
  );
}
