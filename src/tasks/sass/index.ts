import { ReadStream } from 'fs';
import { ITask } from '@/tasks';
import { convertFile } from './tools/convertFile';

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

async function sass({
   config: {
      sourcePath,
      options: { sourceMap },
   },
}: ITask) {
   return async (file: ReadStream, name: string) => {
      const { cssResult, mapOutput } = await convertFile(file, {
         sourcePath,
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
