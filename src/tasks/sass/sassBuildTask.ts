import path from 'path';
import { IOptions } from '@/options';
import { readGlobFiles } from '@/utility/readGlobFiles';
import { convertFile } from './convertFile';
import { writeFile } from '@/utility/writeFile';

/* -----------------------------------
 *
 * SASS
 *
 * -------------------------------- */

async function sassBuildTask(source: string, options: IOptions) {
   const { output = './dist' } = options;

   const files = await readGlobFiles(source);

   const result = await Promise.all(
      files.map((file) => convertFile(file, options))
   );

   await Promise.all(
      result.map(({ cssValue }) =>
         writeFile(path.join(output, `test.css`), cssValue)
      )
   );

   console.log('sassBuildTask!', path, options, result);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sassBuildTask };
