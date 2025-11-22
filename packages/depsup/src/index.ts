#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { Command } from 'commander';
import { type PackageJson } from 'type-fest';

import { depsup } from './depsup.js';

const packagePath = fileURLToPath(new URL('../package.json', import.meta.url));
const pkg: PackageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

const cli = new Command();

cli
  .name(pkg.name!) // I'm confident using the non-null assertion here because package.json is guaranteed to have a name field.
  .description(pkg.description!) // Same here for description.
  .version(pkg.version!) // And here for version.
  .option(
    '--ci [boolean]',
    'Enable CI mode. This command will automatically say yes to all prompts.',
    false
  )
  .option(
    '--nxVersion <version>',
    'Specify the Nx version to migrate to.',
    'latest'
  )
  .action(depsup);

// Parse arguments
cli.parse(process.argv);
