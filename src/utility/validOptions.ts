import isGlob from 'is-glob';
import fs from 'fs';
import path from 'path';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Validate
 *
 * -------------------------------- */

function validOptions({
  sourceDirectory = '',
  sourcePath,
  outputPath,
  watchPath,
}: IOptions) {
  if (
    !isGlob(sourcePath) &&
    !fs.existsSync(path.join(sourceDirectory, sourcePath))
  ) {
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
