import path from 'path';
import { ReadStream } from 'fs';

/* -----------------------------------
 *
 * Names
 *
 * -------------------------------- */

function getFileNames(files: ReadStream[]) {
   return files.map(({ path: filePath }) => {
      const { name } = path.parse(filePath as string);

      return name;
   });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { getFileNames };
