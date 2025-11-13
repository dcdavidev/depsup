import { existsSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';

/**
 * Gets a list of all project paths in the workspace by reading the 'packages' directory.
 * Returns an empty array if the packages directory does not exist.
 * @param workspaceRoot The root of the workspace.
 * @returns A promise that resolves with an array of absolute project paths.
 * @example
 * getWorkspaceProjectPaths('/path/to/workspace');
 */
export async function getWorkspaceProjectPaths(
  workspaceRoot: string
): Promise<string[]> {
  const packagesDir = path.join(workspaceRoot, 'packages');

  if (!existsSync(packagesDir)) {
    return [];
  }

  const projectDirs = await readdir(packagesDir);
  const projectPaths = [];
  for (const dir of projectDirs) {
    const projectPath = path.join(packagesDir, dir);
    const stats = await stat(projectPath);
    if (stats.isDirectory()) {
      projectPaths.push(projectPath);
    }
  }
  return projectPaths;
}
