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

   return async ({ data, name, path }: IProps) => {
      const result = await process(data, path);

      if (result.errored) {
         // throw new Error(result.output);
         console.error(result.output);
      }

      return {};
   };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
