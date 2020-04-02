import { File } from 'vinyl';
import path from 'path';
import { Readable } from 'stream';
import { stringToStream } from '@/utility/streamHelpers';

/* -----------------------------------
 *
 * IFile
 *
 * -------------------------------- */

interface IFile {
   name: string;
   data: Readable;
}

/* -----------------------------------
 *
 * Format
 *
 * -------------------------------- */

function formatFile(file: File): IFile {
   return {
      name: path.basename(file.path),
      data: stringToStream(file.contents),
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IFile, formatFile };
