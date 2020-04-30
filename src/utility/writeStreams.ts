import path from 'path';
import { IResult } from '@/tasks';
import { getResultFileName } from '@/utility/getResultFileName';
import { writeFile } from '@/utility/writeFile';

/* -----------------------------------
 *
 * Write
 *
 * -------------------------------- */

async function writeStreams(
   streams: IResult[],
   outputPath: string
): Promise<IResult[]> {
   await Promise.all(
      streams.map((result) =>
         writeFile(
            path.join(outputPath, getResultFileName(result)),
            result.stream
         )
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
