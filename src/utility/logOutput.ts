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
  const items = [prefix, chalk.cyan(value), suffix];

  log.info(items.join(' '));
}

/* -----------------------------------
 *
 * Result
 *
 * -------------------------------- */

function result({ name, size, type }: IResult) {
  const items = [
    chalk.grey(' ->'),
    chalk.yellow(name + type),
    chalk.grey(size),
  ];

  log.info(items.join(' '));
}

/* -----------------------------------
 *
 * Other
 *
 * -------------------------------- */

function output(prefix: string, value: string) {
  const items = [prefix, chalk.grey(' ->'), '\n', chalk.grey(value)];

  log.info(items.join(' '));
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { error, info, result, output };
