import buildTool from 'webpack-stream';
import named from 'vinyl-named';
import { Task, IProps } from '@/tasks';
import { config } from './webpack.default';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(): Promise<Task> {
   const webpackStream = buildTool(config as any); // type error without any

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
