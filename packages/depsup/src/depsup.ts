import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getErrorMessage } from './lib/get-error-message.js';
import { getWorkspaceProjectPaths } from './lib/get-workspace-project-paths.js';
import { resolvePackageManager } from './lib/resolve-package-manager.js';
import { resolveWorkspaceRoot } from './lib/resolve-workspace-root.js';
import { updateDeps } from './lib/update-deps.js';
import { updateNx } from './lib/update-nx.js';
import { logError, logInfo } from './logger.js';

interface DepsUpOptions {
  yes?: boolean;
}

/**
 * Updates dependencies in the workspace.
 * @param options The options for the command.
 * @returns A promise that resolves when the update is complete.
 * @example
 * depsup({ yes: true });
 */
export async function depsup(options: DepsUpOptions = {}): Promise<void> {
  const { yes = false } = options;
  const $filename = fileURLToPath(import.meta.url);
  const $dirname = path.dirname($filename);
  logInfo($dirname);

  try {
    const workspaceRoot = resolveWorkspaceRoot($dirname);
    logInfo(`Resolved workspaceRoot: ${workspaceRoot}`);
    if (!workspaceRoot) {
      return logError('Workspace root could not be resolved.');
    }

    const pm = resolvePackageManager(workspaceRoot);
    await updateNx(pm);

    const originalDirectory = process.cwd();
    process.chdir(workspaceRoot);

    // also update root package.json
    logInfo(`Updating dependencies in ${workspaceRoot}`);
    await updateDeps(pm, yes);

    const projectPaths = await getWorkspaceProjectPaths(workspaceRoot);

    for (const projectPath of projectPaths) {
      if (!existsSync(path.join(projectPath, 'package.json'))) {
        logInfo(
          `Skipping ${projectPath} as it does not contain a package.json`
        );
        continue;
      }
      logInfo(`Updating dependencies in ${projectPath}`);
      process.chdir(projectPath);
      await updateDeps(pm, yes);
    }

    process.chdir(originalDirectory);
  } catch (error: unknown) {
    logError(getErrorMessage(error));
  }
}
