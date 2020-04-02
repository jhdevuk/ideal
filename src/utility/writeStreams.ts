import path from 'path';
import mkdir from 'mkdirp';
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
   await mkdir(output);

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
