import { Task, IProps } from '@/tasks';
import { bundleCompiler } from './tools/bundleCompiler';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(): Promise<Task> {
   const compiler = bundleCompiler();

   return async ({ data, path }: IProps) => {
      const output = await compiler(data, path);

      const result = output.reduce((prev, item) => {
         prev[item.name] = item.data;

         return prev;
      }, {});

      return result;
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
