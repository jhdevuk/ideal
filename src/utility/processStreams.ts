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
   tasks: Array<Promise<IStream>>,
   filePrefix?: string
): Promise<IResult[]> {
   const streams: IStream[] = await Promise.all(tasks);
   const result = simplifyStreams(streams, filePrefix);

   return result;
}

/* -----------------------------------
 *
 * Simplify
 *
 * -------------------------------- */

function simplifyStreams(streams: IStream[], filePrefix?: string) {
   const formatItems = streams
      .map((item) => Object.keys(item))
      .map((item, index) =>
         item.map((name) =>
            formatResult(streams[index], name, filePrefix)
         )
      );

   const result = flattenArray(formatItems)
      .filter(
         (file, index, array) =>
            array.findIndex(
               ({ name, type }) =>
                  name === file.name && type === file.type
            ) === index
      )
      .filter(({ stream }) => !!stream);

   return result;
}

/* -----------------------------------
 *
 * Format
 *
 * -------------------------------- */

function formatResult(
   stream: IStream,
   name: string,
   filePrefix?: string
): IResult {
   const file = path.parse(name);
   const data = stream[name];

   return {
      name: file.name,
      type: file.ext,
      hash: '',
      prefix: filePrefix,
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
