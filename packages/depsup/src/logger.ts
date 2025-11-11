import chalk from 'chalk';

/**
 * Logs a message with a colored label background and colored text.
 * @param {string} levelLabel The label of the log level (e.g., 'INFO', 'WARN').
 * @param {(text: string) => string} labelBgColor Chalk function to apply background color to the label.
 * @param {(text: string) => string} msgColor Chalk function to color the message text (no background).
 * @param {string} msg The message string to log.
 * @param {Record<string, unknown>} [obj] Optional extra object to log alongside the message.
 *
 * @example
 * logWithColor('INFO', chalk.bgBlueBright, chalk.blue, 'Server started', { port: 3000 });
 */
function logWithColor(
  levelLabel: string,
  labelBgColor: (text: string) => string,
  msgColor: (text: string) => string,
  msg: string,
  obj?: Record<string, unknown>
) {
  const label = labelBgColor(` ${levelLabel} `);
  const coloredMsg = msgColor(msg);
  if (obj) {
    console.log(label, coloredMsg, JSON.stringify(obj, null, 2));
  } else {
    console.log(label, coloredMsg);
  }
}

/**
 * Logs an INFO level message with blue background label and blue text.
 * @param {string} msg The info message to log.
 * @param {Record<string, unknown>} [obj] Optional object to log alongside the message.
 *
 * @example
 * logInfo('User logged in', { userId: 42 });
 */
export function logInfo(msg: string, obj?: Record<string, unknown>) {
  logWithColor('INFO', chalk.bgBlueBright, chalk.blue, msg, obj);
}

/**
 * Logs a WARN level message with yellow background label and yellow text.
 * @param {string} msg The warning message to log.
 * @param {Record<string, unknown>} [obj] Optional object to log alongside the message.
 *
 * @example
 * logWarn('Disk space low', { freeSpace: '500MB' });
 */
export function logWarn(msg: string, obj?: Record<string, unknown>) {
  logWithColor('WARN', chalk.bgYellowBright, chalk.yellow, msg, obj);
}

/**
 * Logs an ERROR level message with red background label and red text.
 * @param {string} msg The error message to log.
 * @param {Record<string, unknown>} [obj] Optional object to log alongside the message.
 *
 * @example
 * logError('Database connection failed', { retryCount: 3 });
 */
export function logError(msg: string, obj?: Record<string, unknown>) {
  logWithColor('ERROR', chalk.bgRedBright, chalk.red, msg, obj);
}

/**
 * Logs an OK level message with green background label and green text.
 * @param {string} msg The success message to log.
 * @param {Record<string, unknown>} [obj] Optional object to log alongside the message.
 *
 * @example
 * logOk('Operation completed');
 */
export function logOk(msg: string, obj?: Record<string, unknown>) {
  logWithColor('OK', chalk.bgGreenBright, chalk.green, msg, obj);
}
