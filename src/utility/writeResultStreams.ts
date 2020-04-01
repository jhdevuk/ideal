import path from 'path';
import { IStream, IResult } from '@/tasks';
import { flattenArray } from '@/utility/flattenArray';
import { writeFile } from '@/utility/writeFile';

/* -----------------------------------
 *
 * Write
 *
 * -------------------------------- */

async function writeResultStreams(
   stream: IStream[],
   output: string
): Promise<IResult[]> {
   const names = flattenArray(stream.map((item) => Object.keys(item)));

   const files = flattenArray(
      stream.map((item) => Object.keys(item).map((key) => item[key]))
   );

   const sizes = await Promise.all(
      files.map((file, index) =>
         writeFile(path.join(output, names[index]), file)
      )
   );

   const result = names.reduce((array, name, index) => {
      array.push({ fileName: name, fileSize: sizes[index] });

      return array;
   }, []);

   return result;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { writeResultStreams };
