import { Command } from 'commander';

import { depsup } from './depsup.js';
import { getErrorMessage } from './lib/get-error-message.js';
import { logError } from './logger.js';

const program = new Command();

program
  .option('-y, --yes', 'Skip interactive mode and confirm all prompts', false)
  .action(async (options) => {
    try {
      await depsup({ yes: options.yes });
    } catch (error: unknown) {
      logError(getErrorMessage(error));
      process.exit(1);
    }
  });

program.parse(process.argv);
