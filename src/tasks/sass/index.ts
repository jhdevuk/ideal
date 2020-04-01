import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';
import { convertSassFile } from './tools/convertSassFile';

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

async function sass({ sourceMap }: IOptions): Promise<Task> {
   const includePaths = [];

   return async ({ data, name, path }: IProps) => {
      const fileName = `${name}.css`;

      const { cssResult, mapOutput } = await convertSassFile(data, {
         filePath: path,
         includePaths,
         fileName: name,
         sourceMap,
      });

      const result = {
         [fileName]: cssResult,
         [`${fileName}.map`]: mapOutput,
      };

      return result;
   };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sass };
