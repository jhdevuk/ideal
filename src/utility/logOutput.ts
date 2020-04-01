import log from 'fancy-log';
import chalk from 'chalk';
import { IResult } from '@/tasks';

/* -----------------------------------
 *
 * Error
 *
 * -------------------------------- */

function error(subject: string, details = '', line = '') {
   log.error(
      `${chalk.red('Error')}: ${subject} ${chalk.yellow(details)} ${
         line && chalk.red(`on line ${line}`)
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
 * Result
 *
 * -------------------------------- */

function result({ name, size }: IResult) {
   const output = [
      chalk.grey(' ->'),
      chalk.yellow(name),
      chalk.grey(size),
   ];

   log.info(output.join(' '));
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { error, info, result };
