import { Readable } from 'stream';
import { renderSync } from 'node-sass';
import { IOptions } from '@/options';
import { streamToString, stringToStream } from '@/utility/streamHelpers';

/* -----------------------------------
 *
 * Convert
 *
 * -------------------------------- */

async function convertFile(stream: Readable, options: IOptions) {
   const { css, map } = renderSync({
      data: await streamToString(stream),
   });

   return {
      cssValue: stringToStream(css),
      sourceMap: map,
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { convertFile };
