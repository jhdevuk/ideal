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

const taskMethod = argv._[0];
const sourcePath = argv._[1];

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

if (!tasks[taskMethod]) {
   log.error(`Unknown build task method: ${taskMethod}`);

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

run(tasks[taskMethod], { sourcePath, options });
