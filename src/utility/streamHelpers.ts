import { Readable } from 'stream';

/* -----------------------------------
 *
 * String
 *
 * -------------------------------- */

function streamToString(
  stream: Readable,
  encoding: BufferEncoding = 'utf8'
): Promise<string> {
  const chunks: any[] = [];

  return new Promise((resolve, reject) => {
    stream
      .on('error', reject)
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks).toString(encoding)));
  });
}

/* -----------------------------------
 *
 * Stream
 *
 * -------------------------------- */

function stringToStream(
  value: string | Buffer,
  encoding: BufferEncoding = null
): Readable {
  const stream = new Readable();

  stream.push(value, encoding);
  stream.push(null, encoding);

  return stream;
}

/* -----------------------------------
 *
 * Stream
 *
 * -------------------------------- */

function bufferToStream(binary: Buffer) {
  const stream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });

  return stream;
}

/* -----------------------------------
 *
 * Buffer
 *
 * -------------------------------- */

function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: any[] = [];

  return new Promise((resolve, reject) => {
    stream
      .on('error', reject)
      .on('data', (chunk) => chunks.push(chunk))
      .on('end', () => resolve(Buffer.concat(chunks)));
  });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { streamToString, stringToStream, bufferToStream, streamToBuffer };
