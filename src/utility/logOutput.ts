import log from 'fancy-log';
import chalk from 'chalk';
import getFileSize from 'filesize';
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

function result({ fileName, fileSize }: IResult) {
   const output = [
      chalk.grey(' ->'),
      chalk.yellow(fileName),
      '-',
      chalk.green(getFileSize(fileSize)),
      chalk.grey('built'),
   ];

   log.info(output.join(' '));
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { error, info, result };
