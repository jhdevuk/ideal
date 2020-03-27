import path from 'path';
import { IOptions } from '@/options';
import { readGlobFiles } from '@/utility/readGlobFiles';
import { getFileNames } from '@/utility/getFileNames';
import { writeFile } from '@/utility/writeFile';
import { convertFile } from './convertFile';

/* -----------------------------------
 *
 * SASS
 *
 * -------------------------------- */

async function sassBuildTask(
   source: string,
   { output, ...options }: IOptions
) {
   const files = await readGlobFiles(source);
   const names = getFileNames(files).map((file) => `${file}.css`);

   if (!files.length) {
      throw new Error('No matching files found');
   }

   let result: any;

   try {
      result = await Promise.all(
         files.map((file) => convertFile(file, options))
      );
   } catch ({ message }) {
      throw new Error(message);
   }

   await Promise.all(
      result.map(({ cssValue }, index) =>
         writeFile(path.join(output, names[index]), cssValue)
      )
   );

   return names;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sassBuildTask };
