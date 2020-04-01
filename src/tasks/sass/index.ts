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
      const { cssResult, mapOutput } = await convertSassFile(stream, {
         filePath: path,
         includePaths,
         fileName: name,
         sourceMap,
      });

      const result = { [`${name}.css`]: cssResult };

      if (mapOutput) {
         result[`${name}.map.css`] = mapOutput;
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
