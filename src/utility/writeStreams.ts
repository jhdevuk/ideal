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
      streams.map(({ fileName, stream }) =>
         writeFile(path.join(output, fileName), stream)
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
