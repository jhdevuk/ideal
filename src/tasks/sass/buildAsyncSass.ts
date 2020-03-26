import { IOptions } from '@/options';
import { readFiles } from '@/utility/readFiles';

/* -----------------------------------
 *
 * Async
 *
 * -------------------------------- */

async function buildAsyncSass(
   path: string,
   { release = false }: IOptions
) {
   const files = await readFiles(path);

   console.log('buildAsyncSass!', path, files);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { buildAsyncSass };
