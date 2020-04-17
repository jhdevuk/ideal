import { Result } from 'postcss';
import { Readable } from 'stream';
import { stringToStream } from '@/utility/streamHelpers';

/* -----------------------------------
 *
 * IFile
 *
 * -------------------------------- */

interface IFile {
   cssValue: Readable;
   sourceMap?: any;
}

/* -----------------------------------
 *
 * Format
 *
 * -------------------------------- */

function formatFile(file: Result): IFile {
   return {
      cssValue: stringToStream(file.content),
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IFile, formatFile };
