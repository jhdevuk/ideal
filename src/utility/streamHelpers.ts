import { Readable } from 'stream';

/* -----------------------------------
 *
 * Stringify
 *
 * -------------------------------- */

function streamToString(
   readStream: Readable,
   encoding: string = 'utf8'
): Promise<string> {
   const chunks: any[] = [];

   return new Promise((resolve, reject) => {
      readStream
         .on('error', reject)
         .on('data', (chunk) => chunks.push(chunk))
         .on('end', () =>
            resolve(Buffer.concat(chunks).toString(encoding))
         );
   });
}

/* -----------------------------------
 *
 * Streamify
 *
 * -------------------------------- */

function stringToStream(
   value: string | Buffer,
   encoding: string = null
): Readable {
   const readStream = new Readable();

   readStream.push(value, encoding);
   readStream.push(null, encoding);

   return readStream;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { streamToString, stringToStream };
