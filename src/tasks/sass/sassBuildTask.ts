import { IOptions } from '@/options';
import { readFiles } from '@/utility/readFiles';

/* -----------------------------------
 *
 * SASS
 *
 * -------------------------------- */

async function sassBuildTask(
   path: string,
   { release = false }: IOptions
) {
   const files = await readFiles(path);

   console.log('sassBuildTask!', path, files);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sassBuildTask };
