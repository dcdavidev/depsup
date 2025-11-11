import { depsup } from './depsup.js';

export type { PackageManager } from './consts.js';
export {
  dlx,
  LOCK_FILE,
  lockFilesNames,
  lockFileToPackageManager,
  PACKAGE_MANAGER,
  PACKAGE_MANAGERS,
  workspaceMarkers,
} from './consts.js';
export { logError, logInfo, logOk, logWarn } from './logger.js';

// I am adding this to execute the depsup function when the script is run.
(() => {
  depsup();
})();
