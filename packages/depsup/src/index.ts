#!/usr/bin/env node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { Command } from 'commander';

import { actionDepsup } from './actions/depsup.js';

const packagePath = fileURLToPath(new URL('../package.json', import.meta.url));

const packageJson = JSON.parse(readFileSync(packagePath, 'utf8')) as {
  name: string;
  version: string;
  description: string;
};

const depsup = new Command();

// Initialize CLI
depsup
  .name(packageJson.name)
  .description(packageJson.description)
  .version(packageJson.version)
  .option('-y, --yes', 'Skip interactive mode and confirm all prompts', false)
  .action(actionDepsup);

// Parse arguments
depsup.parse(process.argv);
