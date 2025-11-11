import { depsup } from './depsup.js';
import { getErrorMessage } from './lib/get-error-message.js';
import { logError } from './logger.js';

const args = new Set(process.argv.slice(2));
const yes = args.has('--yes') || args.has('-y');

(async () => {
  try {
    await depsup({ yes });
  } catch (error: unknown) {
    logError(getErrorMessage(error));
    process.exit(1);
  }
})();
