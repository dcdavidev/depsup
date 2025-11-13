import { spawn, type SpawnOptions } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import chalk from 'chalk';

import { dlx, type PackageManager } from '../consts.js';

/**
 * Runs an Nx command.
 * @param cmd The command to run.
 * @param args The arguments for the command.
 * @param command The Nx command to run.
 * @returns A promise that resolves when the command is complete.
 * @example
 * runNxCommand('npx', [], ['nx', 'migrate', 'latest']);
 */
async function runNxCommand(
  cmd: string,
  args: string[],
  command: string[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    const options: SpawnOptions = {
      stdio: 'inherit',
    };
    const process = spawn(cmd, [...args, ...command], options);

    process.on('error', (error: Error) => {
      console.error(
        chalk.red(
          `Error running command: ${command.join(' ')}: ${error.message}`
        )
      );
      reject(error);
    });

    process.on('close', (code: number) => {
      if (code === 0) {
        resolve();
      } else {
        const error = new Error(
          `Command '${command.join(' ')}' exited with code ${code}`
        );
        console.error(chalk.red(error.message));
        reject(error);
      }
    });
  });
}

/**
 * Checks if Nx is installed in the workspace.
 * @param workspaceRoot The workspace root path.
 * @returns True if Nx is installed, false otherwise.
 * @example
 * isNxInstalled('/path/to/workspace');
 */
function isNxInstalled(workspaceRoot: string): boolean {
  const packageJsonPath = path.join(workspaceRoot, 'package.json');
  if (!existsSync(packageJsonPath)) {
    return false;
  }

  try {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    const hasNx =
      (packageJson.dependencies && packageJson.dependencies.nx) ||
      (packageJson.devDependencies && packageJson.devDependencies.nx);
    return Boolean(hasNx);
  } catch {
    return false;
  }
}

/**
 * Updates Nx using the specified package manager.
 * Skips the update if Nx is not installed in the workspace.
 * @param pm The package manager to use.
 * @param workspaceRoot The workspace root path.
 * @returns A promise that resolves when the update is complete.
 * @example
 * updateNx('npm', '/path/to/workspace');
 */
export async function updateNx(
  pm: PackageManager,
  workspaceRoot: string
): Promise<void> {
  if (!isNxInstalled(workspaceRoot)) {
    console.log(
      chalk.blue('Nx is not installed in this workspace, skipping Nx update.')
    );
    return;
  }

  console.log(chalk.blue('Updating Nx...'));
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
