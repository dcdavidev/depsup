import fs from 'node:fs/promises';
import path from 'node:path';

import fg from 'fast-glob';
import yaml from 'js-yaml';

/**
 * Reads the `pnpm-workspace.yaml` file from the workspace root,
 * resolves package directories based on the `packages` globs,
 * and returns a list of those package directories that contain a `package.json`.
 * @param {string} workspaceRoot The root directory of the pnpm workspace.
 * @returns {Promise<string[]>} A promise that resolves to an array of package directory paths relative to the workspace root.
 *
 * @example
 * const workspaceRoot = '/path/to/your/workspace';
 * const projects = await getProjects(workspaceRoot);
 * console.log(projects); // ['packages/pkg1', 'packages/pkg2', ...]
 */
export async function getProjects(workspaceRoot: string): Promise<string[]> {
  const yamlFile = path.join(workspaceRoot, 'pnpm-workspace.yaml');
  const content = await fs.readFile(yamlFile, 'utf8');
  const config = yaml.load(content) as { packages: string[] };

  if (!config || !config.packages) return [];

  const packagesGlobs = config.packages;

  // Resolve the package directories matching the globs
  const packageDirs = await fg(packagesGlobs, {
    cwd: workspaceRoot,
    onlyDirectories: true,
  });

  // Filter to directories that have a package.json
  const projects = [];

  for (const dir of packageDirs) {
    const pkgJsonPath = path.join(workspaceRoot, dir, 'package.json');
    try {
      await fs.access(pkgJsonPath);
      projects.push(dir);
    } catch {
      // skip if no package.json
    }
  }

  return projects;
}
