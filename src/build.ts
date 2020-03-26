import { argv } from 'yargs';
import log from 'fancy-log';
import { tasks } from '@/tasks';
import { IOptions } from '@/options';
import { validOptions } from '@/utility/validOptions';

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const method = process.argv[2];
const source = process.argv[3];

/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

const options: IOptions = {
   release: (argv.release as boolean) || false,
};

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

if (!tasks[method] || !validOptions(source, options)) {
   log.error('Missing required arguments');

   process.exit(1);
}

/* -----------------------------------
 *
 * Execute
 *
 * -------------------------------- */

tasks[method](source, options);
