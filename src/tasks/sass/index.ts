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

   return async ({ stream, name, path }: IProps) => {
      const fileName = `${name}.css`;

      const { cssResult, mapOutput } = await convertSassFile(stream, {
         filePath: path,
         includePaths,
         fileName: name,
         sourceMap,
      });

      const result = { [fileName]: cssResult };

      if (mapOutput) {
         result[`${fileName}.map`] = mapOutput;
      }

      return result;
   };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sass };
