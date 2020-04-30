import isGlob from 'is-glob';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validOptions(
   source: string,
   { watchPath, localWebpackConfig }: IOptions
) {
   if (!isGlob(source)) {
      throw new Error('Missing or incorrectly formatted "sourcePath"');
   }

   if (localWebpackConfig && typeof localWebpackConfig !== 'function') {
      throw new Error('Local webpack config must be a function');
   }

   return true;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { validOptions };
