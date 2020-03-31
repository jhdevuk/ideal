import { Readable } from 'stream';
import fs, { PathLike } from 'fs';

/* -----------------------------------
 *
 * Write
 *
 * -------------------------------- */

function writeFile(
   filePath: PathLike,
   readStream: Readable,
   encoding: string = 'utf8'
): Promise<number> {
   const writeStream = fs.createWriteStream(filePath, encoding);

   return new Promise((resolve, reject) => {
      readStream.pipe(writeStream).on('finish', () => {
         const { size } = fs.statSync(filePath);

         resolve(size);
      });
      writeStream.on('error', reject);
   });
}

/* -----------------------------------
 *
 * EXPORT
 *
 * -------------------------------- */

export { writeFile };
