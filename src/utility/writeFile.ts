import hash from 'hasha';
import { Readable } from 'stream';
import fs, { PathLike } from 'fs';

/* -----------------------------------
 *
 * Write
 *
 * -------------------------------- */

async function writeFile(
   filePath: PathLike,
   readStream: Readable,
   encoding: string = 'utf8'
): Promise<void> {
   const writeStream = fs.createWriteStream(filePath, encoding);

   return new Promise(async (resolve, reject) => {
      readStream.pipe(writeStream).on('finish', resolve);

      writeStream.on('error', reject);
   });
}

/* -----------------------------------
 *
 * EXPORT
 *
 * -------------------------------- */

export { writeFile };
