import { spawnSync } from 'node:child_process';

/**
 * Executes a command synchronously and streams the output directly to the terminal (inherit).
 * WARNING: This function CANNOT capture the output. The 'output' and 'error' fields will be empty strings.
 * @param {string} command The command to execute (e.g., 'npm').
 * @param {string[]} args The arguments for the command (e.g., ['install']).
 * @returns {{ success: boolean, code: number | null }} An object containing only the execution status code.
 * @example
 * // You will see the npm install progress bar in the terminal
 * const result = command('npm', ['install']);
 *
 * if (result.success) {
 * console.log('Install complete!');
 * } else {
 * console.error('Install failed with code:', result.code);
 * }
 */
export function command(
  command: string,
  args: string[]
): { success: boolean; code: number | null } {
  const result = spawnSync(command, args, {
    stdio: 'inherit', // Direct stream to console, no capture
    shell: true,
  });

  return {
    success: result.status === 0,
    code: result.status,
  };
}
