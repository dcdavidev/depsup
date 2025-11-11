import { existsSync } from 'node:fs';
import path from 'node:path';

import {
  LOCK_FILE,
  lockFileToPackageManager,
  type PackageManager,
} from '../consts.js';
import { logWarn } from '../logger.js';

/**
 * Detects the package manager used in the given directory by checking for known lock files.
 * @param {string} cwd The directory path to check for package manager lock files.
 * @returns {PackageManager} The detected package manager name ('npm', 'yarn', 'pnpm', 'bun') or 'npm' as fallback.
 *
 * @example
 * ```
 * const pm = resolvePackageManager('/path/to/my/project');
 * console.log(pm); // 'npm', 'yarn', 'pnpm', or 'bun'
 * ```
 */
export function resolvePackageManager(cwd: string): PackageManager {
  for (const lockFile of Object.values(LOCK_FILE)) {
    const lockFilePath = path.join(cwd, lockFile);

    if (existsSync(lockFilePath)) {
      const pm = lockFileToPackageManager[lockFile];
      if (pm) {
        return pm;
      }
    }
  }

  logWarn('No package manager lock file found, falling back to `npm.');
  return 'npm';
}
