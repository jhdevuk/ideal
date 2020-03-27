import glob from 'glob';
import { ReadStream } from 'fs';
import { readFile } from './readFile';

/* -----------------------------------
 *
 * Files
 *
 * -------------------------------- */

const readGlobFiles = (path: string): Promise<ReadStream[]> =>
   new Promise((resolve, reject) =>
      glob(path, async (error, files) => {
         if (error) {
            reject(error);

            return;
         }

         const result = files.map((file) => readFile(file));

         resolve(result);
      })
   );

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { readGlobFiles };
