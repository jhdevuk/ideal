import { ReadStream } from 'fs';
import { ITask } from '@/tasks';
import { convertSassFile } from './tools/convertSassFile';

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

async function sass({ config: { options } }: ITask) {
   const includePaths = [];

   return async (stream: ReadStream, path: string, name: string) => {
      const { cssResult, mapOutput } = await convertSassFile(stream, {
         filePath: path,
         includePaths,
         fileName: name,
         sourceMap: options.sourceMap,
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
