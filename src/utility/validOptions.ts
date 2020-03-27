import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validOptions(source: string, { output }: IOptions) {
   if (!source) {
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
