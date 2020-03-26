import { tasks } from '@/tasks';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

if (!tasks[process.argv[2]]) {
   process.exit(1);
}

/* -----------------------------------
 *
 * Execute
 *
 * -------------------------------- */

tasks[process.argv[2]]();
