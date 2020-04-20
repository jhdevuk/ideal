import path from 'path';
import { IResult } from '@/tasks';
import { writeFile } from '@/utility/writeFile';

/* -----------------------------------
 *
 * Write
 *
 * -------------------------------- */

async function writeStreams(
   streams: IResult[],
   output: string
): Promise<IResult[]> {
   await Promise.all(
      streams.map(({ name, hash, type, stream }) =>
         writeFile(
            path.join(output, getFileName(name, hash, type)),
            stream
         )
      )
   );

   return streams;
}

/* -----------------------------------
 *
 * getFileName
 *
 * -------------------------------- */

function getFileName(name: string, hash: string, type: string) {
   const hashPart = hash ? `.${hash}` : '';

   return name + hashPart + type;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { writeStreams };
