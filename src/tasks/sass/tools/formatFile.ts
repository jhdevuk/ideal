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

function formatFile({ content, map }: Result): IFile {
   return {
      cssValue: stringToStream(content),
      sourceMap: stringToStream(map.toString()),
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IFile, formatFile };
