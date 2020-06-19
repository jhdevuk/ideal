import isGlob from 'is-glob';
import fs from 'fs';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validOptions(sourcePath: string, { watchPath }: IOptions) {
   if (!isGlob(sourcePath) && !fs.existsSync(sourcePath)) {
      throw new Error('No files found in "sourcePath"');
   }

   if (watchPath && !isGlob(watchPath)) {
      throw new Error('Incorrectly formatted "watchPath"');
   }

   return true;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { validOptions };
