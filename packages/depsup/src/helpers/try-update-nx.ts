import { type PackageManager } from '../consts.js';
import { logError } from '../logger.js';
import { checkNxExistence } from './check-nx-existence.js';
import { getErrorMessage } from './get-error-message.js'; // Needed to log error messages
import { updateNx } from './update-nx.js';

/**
 * Checks if Nx exists in the specified workspace and attempts to update it using the given package manager.
 * Logs any errors encountered during the update process.
 * @param {string} workspaceRoot The root path of the workspace to check for Nx.
 * @param {PackageManager} pm The package manager to use for updating Nx.
 * @example
 * await tryUpdateNx('/path/to/workspace', 'npm');
 */
export async function tryUpdateNx(workspaceRoot: string, pm: PackageManager) {
  const hasNx = await checkNxExistence(workspaceRoot);
  if (!hasNx) return;

  try {
    updateNx(pm);
  } catch (error) {
    logError(getErrorMessage(error));
  }
}
