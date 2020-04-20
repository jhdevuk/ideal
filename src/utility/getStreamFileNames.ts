import path from 'path';
import { ReadStream } from 'fs';

/* -----------------------------------
 *
 * Names
 *
 * -------------------------------- */

function getStreamFileNames(files: ReadStream[]) {
   return files.map(getStreamFileName);
}

/* -----------------------------------
 *
 * Name
 *
 * -------------------------------- */

function getStreamFileName({ path: filePath }: ReadStream) {
   const { name } = path.parse(filePath as string);

   return name;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { getStreamFileName, getStreamFileNames };
