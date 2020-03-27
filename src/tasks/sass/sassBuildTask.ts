import path from 'path';
import { IOptions } from '@/options';
import { readGlobFiles } from '@/utility/readGlobFiles';
import { getFileNames } from '@/utility/getFileNames';
import { writeFile } from '@/utility/writeFile';
import { TaskError } from '@/utility/taskError';
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
   const names = getFileNames(files);

   if (!files.length) {
      throw new Error('No matching files found');
   }

   let result: any;

   result = await Promise.all(
      files.map((file, index) =>
         convertFile(file, options).catch((error) => {
            error.file = `${names[index]}.scss`;

            throw error;
         })
      )
   );

   await Promise.all(
      result.map(({ cssValue }, index) =>
         writeFile(path.join(output, `${names[index]}.css`), cssValue)
      )
   );

   return names.map((file) => `${file}.css`);
}

/* --------------------------------
---
 *
 * Export
 *
 * -------------------------------- */

export { sassBuildTask };
