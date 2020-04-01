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
         item.map((name) => ({
            fileName: name,
            stream: streams[index][name],
         }))
      );

   return flattenArray(result);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { processStreams };
