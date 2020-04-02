import { BufferFile } from 'vinyl';
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

function formatFile(file: BufferFile): IFile {
   return {
      name: file.basename,
      data: stringToStream(file.contents),
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IFile, formatFile };
