import isGlob from 'is-glob';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validOptions(source: string, { watchPath }: IOptions) {
   if (!isGlob(source)) {
      throw new Error('Missing or incorrectly formatted "sourcePath"');
   }

   return true;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { validOptions };
