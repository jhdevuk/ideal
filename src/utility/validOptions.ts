import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validOptions(path: string, options: IOptions) {
   if (!path) {
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
