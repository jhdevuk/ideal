import { Task, IProps } from '@/tasks';
import { bundleCompiler } from './tools/bundleCompiler';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(): Promise<Task> {
   const compiler = bundleCompiler();

   return async ({ data, name, path }: IProps) => {
      const result = await compiler(data, path);

      console.log('RESULT', result);

      return {};
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
