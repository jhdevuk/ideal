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
      transform: (file: any) => {
         console.log('FILE', file);

         resolve([]);
      },
   });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { emitFile };
