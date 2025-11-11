import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Checks if 'nx' is listed in the devDependencies of a package.json located in the given workspace root.
 * @param {string} workspaceRoot The absolute path to the workspace directory containing package.json.
 * @returns {Promise<boolean|undefined>} Returns true if 'nx' is found in devDependencies, false if not.
 * Returns undefined and sets process.exitCode to 1 if reading or parsing package.json fails.
 *
 * @example
 * // Assuming the workspace root has a package.json with nx in devDependencies
 * const hasNx = await checkNxExistence('/path/to/workspace');
 * console.log(hasNx); // true or false
 */
export async function checkNxExistence(
  workspaceRoot: string
): Promise<boolean | undefined> {
  const packageJsonPath = path.resolve(workspaceRoot, 'package.json');

  try {
    const packageJsonRaw = await fs.readFile(packageJsonPath, {
      encoding: 'utf8',
    });
    const packageJson = JSON.parse(packageJsonRaw);

    const devDependencies = packageJson.devDependencies || {};

    return 'nx' in devDependencies ? true : false;
  } catch (error: unknown) {
    process.exitCode = 1;

    throw error;
  }
}
