import isGlob from 'is-glob';
import fs from 'fs';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validOptions({ sourcePath, outputPath, watchPath }: IOptions) {
   if (!isGlob(sourcePath) && !fs.existsSync(sourcePath)) {
      throw new Error(`Invalid source path: "${sourcePath}"`);
   }

   if (!outputPath || (outputPath && !fs.existsSync(outputPath))) {
      throw new Error(`Missing output path "${outputPath}"`);
   }

   if (watchPath && !isGlob(watchPath)) {
      throw new Error(`Incorrectly formatted "${watchPath}"`);
   }

   return true;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { validOptions };
