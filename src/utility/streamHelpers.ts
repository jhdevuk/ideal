import { Readable } from 'stream';

/* -----------------------------------
 *
 * String
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
 * Stream
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
 * Buffer
 *
 * -------------------------------- */

function bufferToStream(binary: Buffer) {
   const readStream = new Readable({
      read() {
         this.push(binary);
         this.push(null);
      },
   });

   return readStream;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { streamToString, stringToStream, bufferToStream };
