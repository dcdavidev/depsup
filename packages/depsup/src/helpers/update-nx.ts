import { spawnSync } from 'node:child_process';

import { dlx, type PackageManager } from '../consts.js';

/**
 * Runs the latest Nx migrations using the specified package manager.
 * Prints command outputs to the console.
 * @param {PackageManager} pm The package manager to run migrations with (e.g., 'npm', 'yarn', 'pnpm').
 *
 * @example
 * updateNx('npm');
 */
export function updateNx(pm: PackageManager) {
  const fullCommand = dlx[pm].split(' ');
  const cmd = fullCommand[0];
  const args = fullCommand.slice(1).filter(Boolean);

  // Run `nx migrate latest`
  const migrateLatest = spawnSync(
    cmd,
    [...args, 'nx', 'migrate', 'latest', '--verbose'],
    {
      stdio: 'inherit', // Enables interactive console and real time output
      encoding: 'utf8',
    }
  );

  if (migrateLatest.error) {
    process.exitCode = 1;
    throw new Error('Error running migrate latest:', {
      cause: migrateLatest.error,
    });
  }

  // Run `nx migrate --run-migrations=migrations.json --if-exists`
  const migrateRun = spawnSync(
    cmd,
    [
      ...args,
      'nx',
      'migrate',
      '--run-migrations=migrations.json',
      '--if-exists',
      '--verbose',
    ],
    {
      stdio: 'inherit',
      encoding: 'utf8',
    }
  );

  if (migrateRun.error) {
    process.exitCode = 1;
    throw new Error('Error running migrate:', { cause: migrateRun.error });
  }
}
