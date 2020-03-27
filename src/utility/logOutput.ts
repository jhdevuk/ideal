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
   log.info(`${prefix}: ${chalk.cyan(value)} ${suffix}...`);
}

/* -----------------------------------
 *
 * File
 *
 * -------------------------------- */

function file(value: string) {
   log.info(`${chalk.grey(' ->')} ${chalk.yellow(value)} complete`);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { error, info, file };
