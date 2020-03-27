import log from 'fancy-log';
import chalk from 'chalk';

/* -----------------------------------
 *
 * Error
 *
 * -------------------------------- */

function error(value: string, subject = '', line = '') {
   log.error(
      `${chalk.red('Error')}: ${chalk.yellow(subject)} ${value} ${
         line && chalk.yellow(`on line ${line}`)
      }`
   );
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
