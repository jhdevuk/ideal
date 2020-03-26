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

const METHOD = process.argv[2];
const SOURCE = process.argv[3];

/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

const OPTIONS: IOptions = {
   release: (argv.release as boolean) || false,
};

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

if (!tasks[METHOD] || !validOptions(SOURCE, OPTIONS)) {
   log.error('Missing required arguments');

   process.exit(1);
}

/* -----------------------------------
 *
 * Execute
 *
 * -------------------------------- */

tasks[METHOD](SOURCE, OPTIONS);
