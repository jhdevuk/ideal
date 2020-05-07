import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';
import { lintProcessor } from './tools/lintProcessor';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(options: IOptions): Promise<Task> {
   const process = lintProcessor(options);

   return async ({ data, path }: IProps) => {
      const result = await process(data, path);

      if (result.errored) {
         console.log(result);
         console.error(result.output);
      }
   };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
