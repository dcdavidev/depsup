import chalk from 'chalk';

type LogFn = (msg: string, ...args: unknown[]) => void;

const pad = (str: string) => str.padEnd(6, ' ');

const logger = {
  info: ((msg: string, ...args: unknown[]) => {
    console.log('\n');
    const label = chalk.bgBlue.white.bold(pad('INFO'));
    console.log(`${label} ${chalk.blue(msg)}`, ...args);
  }) as LogFn,

  ok: ((msg: string, ...args: unknown[]) => {
    console.log('\n');
    const label = chalk.bgGreen.black.bold(pad('OK'));
    console.log(`${label} ${chalk.green(msg)}`, ...args);
  }) as LogFn,

  warn: ((msg: string, ...args: unknown[]) => {
    console.log('\n');
    const label = chalk.bgYellow.black.bold(pad('WARN'));
    console.log(`${label} ${chalk.yellow(msg)}`, ...args);
  }) as LogFn,

  fatal: ((msg: string, ...args: unknown[]) => {
    console.log('\n');
    const label = chalk.bgRed.white.bold(pad('FATAL'));
    console.log(`${label} ${chalk.red(msg)}`, ...args);
  }) as LogFn,
};

export default logger;
