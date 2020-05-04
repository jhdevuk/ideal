import { Task, IProps } from '@/tasks';
import { IOptions } from '@/options';
import { bundleCompiler } from './tools/bundleCompiler';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(options: IOptions): Promise<Task> {
   const compiler = bundleCompiler(options);

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
