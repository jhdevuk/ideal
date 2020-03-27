import log from 'fancy-log';
import chalk from 'chalk';

/* -----------------------------------
 *
 * Error
 *
 * -------------------------------- */

function error(value: string) {
   log.error(`${chalk.red('Error')}: ${value}`);
}

/* -----------------------------------
 *
 * Info
 *
 * -------------------------------- */

function info(prefix: string, value: string, suffix: string = '') {
   const output = [prefix, chalk.cyan(value), suffix];

   log.info(output.join(' '));
}

/* -----------------------------------
 *
 * File
 *
 * -------------------------------- */

function file(value: string) {
   const output = [
      chalk.grey(' ->'),
      chalk.yellow(value),
      chalk.grey('built'),
   ];

   log.info(output.join(' '));
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { error, info, file };
