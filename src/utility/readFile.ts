import { createReadStream, PathLike, ReadStream } from 'fs';

/* -----------------------------------
 *
 * Read
 *
 * -------------------------------- */

function readFile(file: PathLike, encoding: string = null): ReadStream {
  return createReadStream(file, encoding);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { readFile };
