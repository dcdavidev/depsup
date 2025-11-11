import { spawnSync } from 'node:child_process';

import { dlx, type PackageManager } from '../consts.js';

/**
 *Runs the npm-check-updates tool interactively for a given package manager synchronously.
 * @param {PackageManager} pm The package manager identifier (e.g., 'npm', 'yarn', 'pnpm').
 *
 * @example
 * // Runs npm-check-updates interactively using npm
 * name('npm');
 */
export function updateDeps(pm: PackageManager) {
  const fullCommand = dlx[pm].split(' ');
  const cmd = fullCommand[0];
  const args = fullCommand.slice(1).filter(Boolean);

  const up = spawnSync(cmd, [...args, 'npm-check-updates', '--interactive'], {
    stdio: 'inherit', // Enables interactive console and real time output
    encoding: 'utf8',
  });

  if (up.error) {
    process.exitCode = 1;
    throw new Error('Error updating deps:', { cause: up.error });
  }
}
