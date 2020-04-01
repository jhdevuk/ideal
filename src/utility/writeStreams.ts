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
      streams.map(({ name, stream }) =>
         writeFile(path.join(output, name), stream)
      )
   );

   return streams;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { writeStreams };
