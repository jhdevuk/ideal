import { argv } from 'yargs';
import { tasks } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { validOptions } from '@/utility/validOptions';
import { run } from '@/utility/taskRunner';

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const method = argv._[0];
const source = argv._[1];

/* -----------------------------------
 *
 * Options
 *
 * -------------------------------- */

const options: IOptions = {
   release: !!argv.release,
   output: (argv.output as string) || './dist',
};

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

if (!tasks[method]) {
   log.error(`Unknown build task method: ${method}`);

   process.exit(1);
}

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

if (!validOptions(source, options)) {
   log.error('Missing required arguments');

   process.exit(1);
}

/* -----------------------------------
 *
 * Execute
 *
 * -------------------------------- */

run(tasks[method], { source, options });
