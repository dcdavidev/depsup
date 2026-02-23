import { existsSync } from 'node:fs';
import path from 'node:path';

import { command } from './helpers/command.js';
import { detectPackageManager } from './helpers/detect-package-manager.js';
import { dlx } from './helpers/dlx.js';
import logger from './helpers/logger.js';

export type DepsupOptions = {
  /**
   * Ci mode flag. When true, the command will automatically say yes to all prompts.
   * @default false
   */
  ci?: boolean;

  /**
   * Specify the Nx version to migrate to.
   * @default "latest"
   */
  nxVersion?: string;

  /**
   * Automatically create a git commit after updating dependencies.
   * @default false
   */
  createCommit?: boolean;
};

export const depsup = function (options: DepsupOptions) {
  const { ci = false, nxVersion = 'latest', createCommit = false } = options;

  logger.step('Starting depsup...');

  const cwd = process.cwd();
  logger.info(`Running depsup in directory: ${cwd}`);

  // Look for a package.json in the current working directory
  const projectPackageJsonPath = path.join(cwd, 'package.json');
  if (!existsSync(projectPackageJsonPath)) {
    logger.fatal('No package.json found in the current directory.');
    process.exitCode = 1;
    return;
  }

  logger.ok('package.json found. Proceeding with dependency update...');

  // Detect Package Manager
  const pm = detectPackageManager(cwd);
  if (pm === 'unknown') {
    logger.fatal('Could not detect a supported package manager.');
    process.exitCode = 1;
    return;
  }

  logger.ok(`Detected package manager: ${pm}`);

  // Check if it's an Nx workspace by looking for nx.json
  const isNxWorkspace = existsSync(path.join(cwd, 'nx.json'));
  if (isNxWorkspace) {
    logger.step('Nx workspace detected!');
    logger.info('Running nx migrate latest...');

    // Checking for nx latest release
    const { cmd: nxCheckCmd, args: nxCheckCmdArgs } = dlx(pm, [
      'nx',
      'migrate',
      nxVersion,
    ]);

    command(nxCheckCmd, nxCheckCmdArgs);

    // Runs nx migrations
    if (existsSync(path.join(cwd, 'migrations.json'))) {
      logger.step('Apply nx migrations...');

      const { cmd: nxMigrateCmd, args: nxMigrateCmdArgs } = dlx(pm, [
        'nx',
        'migrate',
        '--if-exists',
        '--run-migrations',
        'migrations.json',
        ...(createCommit
          ? ['--create-commit', '--commit-prefix', 'chore(nx): ']
          : []),
      ]);
      command(nxMigrateCmd, nxMigrateCmdArgs);
    }
  }

  logger.step('Updating other dependencies...');
  const ncuArgs = [
    'npm-check-updates',
    ci ? null : '--interactive',
    '--format',
    'group',
    '--reject',
    'nx',
    '--reject',
    '@nrwl/*',
    '--reject',
    '@nx/*',
    '--packageManager',
    pm,
    ...(ci ? ['--install', 'always'] : ['--install', 'prompt']),
    '-u',
    '--deep',
  ].filter(Boolean) as string[];
  const { cmd: ncuCmd, args: ncuCmdArgs } = dlx(pm, ncuArgs);
  command(ncuCmd, ncuCmdArgs);

  logger.ok('Dependency update process completed.');
};
