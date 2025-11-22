import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import type { PackageJson } from 'type-fest';

/**
 * Detects the package manager used in a project based on lock files or package.json configuration.
 * @param {string} root The absolute path to the project root directory.
 * @returns {'npm' | 'yarn' | 'pnpm' | 'bun' | 'unknown'} The name of the detected package manager.
 * @example
 * const pm = detectPackageManager('./my-project');
 * console.log(pm); // 'pnpm'
 */
export function detectPackageManager(
  root: string
): 'npm' | 'yarn' | 'pnpm' | 'bun' | 'unknown' {
  const packageJsonPath = path.join(root, 'package.json');

  // 1. Check package.json "packageManager" field (Corepack)
  if (existsSync(packageJsonPath)) {
    try {
      const content = readFileSync(packageJsonPath, 'utf8');
      const pkg: PackageJson = JSON.parse(content);

      if (pkg.packageManager) {
        if (pkg.packageManager.startsWith('yarn')) return 'yarn';
        if (pkg.packageManager.startsWith('pnpm')) return 'pnpm';
        if (pkg.packageManager.startsWith('bun')) return 'bun';
        if (pkg.packageManager.startsWith('npm')) return 'npm';
      }
    } catch {
      // Ignore JSON parse errors and fall back to lock files
    }
  }

  // 2. Check for Lock Files
  if (existsSync(path.join(root, 'bun.lockb'))) return 'bun';
  if (existsSync(path.join(root, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(path.join(root, 'yarn.lock'))) return 'yarn';
  if (existsSync(path.join(root, 'package-lock.json'))) return 'npm';

  return 'unknown';
}
