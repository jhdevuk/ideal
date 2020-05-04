import isGlob from 'is-glob';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validOptions(sourcePath: string, { watchPath }: IOptions) {
   if (!isGlob(sourcePath)) {
      throw new Error('Missing or incorrectly formatted "sourcePath"');
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
