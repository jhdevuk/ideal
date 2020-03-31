import path from 'path';
import { IStream, IResult } from '@/tasks';
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
   const names = stream.map((item) => Object.keys(item)).flat();

   const files = stream
      .map((item) => Object.keys(item).map((key) => item[key]))
      .flat();

   const sizes = await Promise.all(
      files.map((file, index) =>
         writeFile(path.join(output, names[index]), file)
      )
   );

   const result = sizes.reduce((array, size, index) => {
      array.push({ fileName: names[index], fileSize: size });

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
