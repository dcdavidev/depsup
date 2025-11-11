import { spawn, type SpawnOptions } from 'node:child_process';

import { dlx, type PackageManager } from '../consts.js';
import { logError } from '../logger.js';

/**
 * Updates dependencies using the specified package manager.
 * @param pm The package manager to use.
 * @param yes Whether to skip the interactive mode.
 * @returns A promise that resolves when the update is complete.
 * @example
 * updateDeps('npm', true);
 */
export function updateDeps(pm: PackageManager, yes: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    const fullCommand = dlx[pm].split(' ');
    const cmd = fullCommand[0];
    const args = fullCommand.slice(1).filter(Boolean);

    const commandArgs = ['npm-check-updates'];
    if (yes) {
      commandArgs.push('-u');
    } else {
      commandArgs.push('--interactive');
    }

    const options: SpawnOptions = {
      stdio: 'inherit',
    };

    const up = spawn(cmd, [...args, ...commandArgs], options);

    up.on('error', (error: Error) => {
      logError(`Error updating deps: ${error.message}`);
      reject(error);
    });

    up.on('close', (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        const error = new Error(`Update process exited with code ${code}`);
        logError(error.message);
        reject(error);
      }
    });
  });
}
