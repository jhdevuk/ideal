import fileSize from 'filesize';
import path from 'path';
import { IStream, IResult } from '@/tasks';
import { flattenArray } from '@/utility/flattenArray';

/* -----------------------------------
 *
 * Process
 *
 * -------------------------------- */

async function processStreams(
   tasks: Array<Promise<IStream>>
): Promise<IResult[]> {
   const streams: IStream[] = await Promise.all(tasks);

   const result = flattenArray(
      streams
         .map((item) => Object.keys(item))
         .map((item, index) =>
            item.map((name) => formatResult(streams[index], name))
         )
   ).filter(
      (file, index, array) =>
         array.findIndex((item) => item.name === file.name) === index
   );

   return result.filter(({ stream }) => !!stream);
}

/* -----------------------------------
 *
 * Format
 *
 * -------------------------------- */

function formatResult(stream: IStream, name: string): IResult {
   const file = path.parse(name);
   const data = stream[name];

   return {
      name: file.name,
      extension: file.ext,
      hash: null,
      size: data && fileSize(data.readableLength),
      stream: data,
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { processStreams };
