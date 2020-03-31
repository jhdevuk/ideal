import { Task } from '@/tasks';

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

async function webpack(): Promise<Task> {
   return async () => {
      return {};
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { webpack };
