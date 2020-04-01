import webpack from 'webpack-stream';
import named from 'vinyl-named';
import { Task, IProps } from '@/tasks';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(): Promise<Task> {
   const webpackStream = webpack();

   return async ({ data, name, path }: IProps) => {
      const result = data.pipe(named()).pipe(webpackStream);

      console.log(result);

      return {};
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
