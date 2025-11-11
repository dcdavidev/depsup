import { type PackageManager } from 'src/consts.js';

import { logError } from '../logger.js';
import { getErrorMessage } from './get-error-message.js';
import { updateDeps } from './update-deps.js';

/**
 * Attempts to update dependencies using the specified package manager.
 * Logs an error message if the update process throws an exception.
 * @param {PackageManager} pm The package manager to use for updating dependencies.
 * @example
 * tryUpdateDeps('npm');
 * tryUpdateDeps('yarn');
 */
export async function tryUpdateDeps(pm: PackageManager) {
  try {
    updateDeps(pm);
  } catch (error) {
    logError(getErrorMessage(error));
  }
}
