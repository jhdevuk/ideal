import { fromStream as getHash } from 'hasha';
import fileSize from 'filesize';
import { IStream, IResult } from '@/tasks';
import { flattenArray } from '@/utility/flattenArray';

/* -----------------------------------
 *
 * Format
 *
 * -------------------------------- */

async function processStreams(
   tasks: Array<Promise<IStream>>
): Promise<IResult[]> {
   const streams: IStream[] = await Promise.all(tasks);

   const result = streams
      .map((item) => Object.keys(item))
      .map((item, index) =>
         item.map((name) => {
            const stream = streams[index][name];

            return {
               name,
               hash: getHash(stream, { algorithm: 'md5' }),
               size: fileSize(stream.readableLength),
               stream,
            };
         })
      );

   return flattenArray(result);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { processStreams };
