import chalk from 'chalk';

type LogFn = (msg: string, ...args: unknown[]) => void;

const symbols = {
  info: chalk.blue('ℹ'),
  success: chalk.green('✔'),
  warning: chalk.yellow('⚠'),
  error: chalk.red('✖'),
};

const logger = {
  info: ((msg: string, ...args: unknown[]) => {
    console.log(`${symbols.info} ${chalk.blue(msg)}`, ...args);
  }) as LogFn,

  ok: ((msg: string, ...args: unknown[]) => {
    console.log(`${symbols.success} ${chalk.green(msg)}`, ...args);
  }) as LogFn,

  warn: ((msg: string, ...args: unknown[]) => {
    console.log(`${symbols.warning} ${chalk.yellow(msg)}`, ...args);
  }) as LogFn,

  fatal: ((msg: string, ...args: unknown[]) => {
    console.log(`${symbols.error} ${chalk.red.bold(msg)}`, ...args);
  }) as LogFn,

  step: ((msg: string) => {
    console.log(`\n${chalk.cyan.bold('→')} ${chalk.cyan(msg)}`);
  }) as (msg: string) => void,
};

export default logger;
