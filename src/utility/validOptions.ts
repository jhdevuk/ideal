import isGlob from 'is-glob';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validOptions(source: string, { watchPath }: IOptions) {
   if (!isGlob(source)) {
      return false;
   }

   return true;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { validOptions };
