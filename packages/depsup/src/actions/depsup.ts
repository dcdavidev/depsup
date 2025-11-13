import { existsSync } from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';

import { getErrorMessage } from '../helpers/get-error-message.js';
import { getWorkspaceProjectPaths } from '../helpers/get-workspace-project-paths.js';
import { resolvePackageManager } from '../helpers/resolve-package-manager.js';
import { resolveWorkspaceRoot } from '../helpers/resolve-workspace-root.js';
import { updateDeps } from '../helpers/update-deps.js';
import { updateNx } from '../helpers/update-nx.js';

interface DepsupOptions {
  yes?: boolean;
}

/**
 * Updates dependencies in the workspace.
 * @param options The options for the command.
 * @returns A promise that resolves when the update is complete.
 * @example
 * actionDepsup({ yes: true });
 */
export async function actionDepsup(options: DepsupOptions = {}): Promise<void> {
  const { yes = false } = options;

  try {
    const workspaceRoot = resolveWorkspaceRoot(process.cwd());
    console.log(chalk.blue(`Resolved workspaceRoot: ${workspaceRoot}`));
    if (!workspaceRoot) {
      console.error(chalk.red('Workspace root could not be resolved.'));
      return;
    }

    const pm = resolvePackageManager(workspaceRoot);
    await updateNx(pm, workspaceRoot);

    const originalDirectory = process.cwd();
    process.chdir(workspaceRoot);

    // also update root package.json
    console.log(chalk.blue(`Updating dependencies in ${workspaceRoot}`));
    await updateDeps(pm, yes);

    const projectPaths = await getWorkspaceProjectPaths(workspaceRoot);

    for (const projectPath of projectPaths) {
      if (!existsSync(path.join(projectPath, 'package.json'))) {
        console.log(
          chalk.yellow(
            `Skipping ${projectPath} as it does not contain a package.json`
          )
        );
        continue;
      }
      console.log(chalk.blue(`Updating dependencies in ${projectPath}`));
      process.chdir(projectPath);
      await updateDeps(pm, yes);
    }

    process.chdir(originalDirectory);
  } catch (error: unknown) {
    console.error(chalk.red(getErrorMessage(error)));
    throw error;
  }
}
