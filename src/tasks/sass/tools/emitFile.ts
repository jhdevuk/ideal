import { Result } from 'postcss';
import { Transform } from 'stream';
import { stringToStream } from '@/utility/streamHelpers';

/* -----------------------------------
 *
 * Emit
 *
 * -------------------------------- */

function emitFile(resolve: any) {
   return new Transform({
      objectMode: true,
      transform: ({ css }: Result) => {
         resolve({
            cssValue: stringToStream(css),
         });
      },
   });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { emitFile };
