import { argv } from 'yargs';
import { tasks } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { validOptions } from '@/utility/validOptions';
import { taskRunner } from '@/utility/taskRunner';

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const methodKey = argv._[0] || '';
const sourcePath = argv._[1] || '';

/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

const options: IOptions = {
   release: !!argv.release,
   output: (argv.output as string) || './dist',
   sourceMap: !!argv.sourceMap,
   watch: !!argv.watch,
   verbose: !!argv.verbose,
};

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

if (!tasks[methodKey]) {
   log.error('Unknown build task:', `"${methodKey}"`);

   process.exit(1);
}

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

if (!validOptions(sourcePath, options)) {
   log.error('Missing required arguments');

   process.exit(1);
}

/* -----------------------------------
 *
 * Execute
 *
 * -------------------------------- */

taskRunner(methodKey, { sourcePath, options });
