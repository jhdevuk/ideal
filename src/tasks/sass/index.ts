import { ReadStream } from 'fs';
import { IOptions } from '@/options';
import { convertSassFile } from './tools/convertSassFile';

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

async function sass({ sourceMap }: IOptions) {
   const includePaths = [];

   return async (
      stream: ReadStream,
      filePath: string,
      fileName: string
   ) => {
      const { cssResult, mapOutput } = await convertSassFile(stream, {
         filePath,
         includePaths,
         fileName,
         sourceMap,
      });

      const result = { [`${fileName}.css`]: cssResult };

      if (mapOutput) {
         result[`${fileName}.map.css`] = mapOutput;
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
