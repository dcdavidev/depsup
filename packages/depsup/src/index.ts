#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { Command } from 'commander';
import gradient from 'gradient-string';
import { type PackageJson } from 'type-fest';

import { depsup } from './depsup.js';

const packagePath = fileURLToPath(new URL('../package.json', import.meta.url));
const pkg: PackageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

const cli = new Command();

const logo = `
   ____  ____  ____  ____  _   _ ____  
  |  _ \\|  _ \\|  _ \\/ ___|| | | |  _ \\ 
  | | | | |_) | |_) \\___ \\| | | | |_) |
  | |_| |  __/|  __/ ___) | |_| |  __/ 
  |____/|_|   |_|   |____/ \\___/|_|    
`;

cli
  .name(pkg.name!)
  .description(pkg.description!)
  .version(pkg.version!)
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
  .action((options) => {
    console.log(gradient.pastel.multiline(logo));
    console.log(`v${pkg.version}\n`);
    return depsup(options);
  });

// Parse arguments
cli.parse(process.argv);
