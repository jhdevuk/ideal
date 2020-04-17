import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';
import { bundleCompiler } from './tools/bundleCompiler';
import { streamToString, stringToStream } from '@/utility/streamHelpers';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(options: IOptions): Promise<Task> {
   const compiler = bundleCompiler(options);

   return async ({ data, name, path }: IProps) => {
      const fileName = `${name}.css`;

      const { cssValue, sourceMap } = await compiler(data, path);

      const result = {
         [fileName]: cssValue,
         [`${fileName}.map`]: options.sourceMap && sourceMap,
      };

      return result;
   };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
