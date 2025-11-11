import { dlx, type PackageManager } from '../consts.js';
import { runNxCommand } from './run-nx-command.js';

/**
 * Updates Nx using the specified package manager.
 * @param pm The package manager to use.
 * @returns A promise that resolves when the update is complete.
 * @example
 * updateNx('npm');
 */
export async function updateNx(pm: PackageManager): Promise<void> {
  const fullCommand = dlx[pm].split(' ');
  const cmd = fullCommand[0];
  const args = fullCommand.slice(1).filter(Boolean);

  try {
    await runNxCommand(cmd, args, ['nx', 'migrate', 'latest', '--verbose']);
    await runNxCommand(cmd, args, [
      'nx',
      'migrate',
      '--run-migrations=migrations.json',
      '--if-exists',
      '--verbose',
    ]);
  } catch (error) {
    // Errors are already logged in runNxCommand
    // We re-throw to stop the execution flow if a step fails
    throw new Error('Failed to update Nx.', { cause: error });
  }
}
