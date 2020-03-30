import path from 'path';
import { ReadStream } from 'fs';

/* -----------------------------------
 *
 * Names
 *
 * -------------------------------- */

function getFileNames(files: ReadStream[]) {
   return files.map(getFileName);
}

/* -----------------------------------
 *
 * Name
 *
 * -------------------------------- */

function getFileName({ path: filePath }: ReadStream) {
   const { name } = path.parse(filePath as string);

   return name;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { getFileName, getFileNames };
