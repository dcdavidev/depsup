import { spawn, type SpawnOptions } from 'node:child_process';

import chalk from 'chalk';

/**
 * Runs an Nx command.
 * @param cmd The command to run.
 * @param args The arguments for the command.
 * @param command The Nx command to run.
 * @returns A promise that resolves when the command is complete.
 * @example
 * runNxCommand('npx', [], ['nx', 'migrate', 'latest']);
 */
export async function runNxCommand(
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
