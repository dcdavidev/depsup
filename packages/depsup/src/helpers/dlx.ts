/**
 * Returns the appropriate command and arguments to run a package with a given package manager using its "dlx"-like functionality.
 *
 * - For 'yarn' and 'pnpm', uses 'dlx'.
 * - For 'bun', uses 'bunx'.
 * - For others, defaults to 'npx'.
 * @param pm The package manager ('yarn', 'pnpm', 'bun', or others).
 * @param cmdArgs The arguments to pass to the command.
 * @returns An object with the command and its arguments.
 *
 * @example
 * // For pnpm:
 * dlx('pnpm', ['create-react-app', 'my-app']);
 * // returns { cmd: 'pnpm', args: ['dlx', 'create-react-app', 'my-app'] }
 *
 * // For bun:
 * dlx('bun', ['create-react-app', 'my-app']);
 * // returns { cmd: 'bunx', args: ['create-react-app', 'my-app'] }
 *
 * // For npm:
 * dlx('npm', ['create-react-app', 'my-app']);
 * // returns { cmd: 'npx', args: ['create-react-app', 'my-app'] }
 */
export function dlx(
  pm: 'yarn' | 'pnpm' | 'bun' | string,
  cmdArgs: string[]
): { cmd: string; args: string[] } {
  if (pm === 'yarn' || pm === 'pnpm') {
    return {
      cmd: pm,
      args: ['dlx', ...cmdArgs],
    };
  } else if (pm === 'bun') {
    return {
      cmd: 'bunx',
      args: cmdArgs,
    };
  } else {
    return {
      cmd: 'npx',
      args: cmdArgs,
    };
  }
}
