import { renderSync } from 'node-sass';
import { Transform } from 'stream';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function sassCompiler(options: IOptions) {
  return (path: string, reject) =>
    new Transform({
      objectMode: true,
      transform: transformSource(path, options),
    }).on('error', reject);
}

/* -----------------------------------
 *
 * Transform
 *
 * -------------------------------- */

function transformSource(
  path: string,
  { sourceMap, includePath }: IOptions
) {
  return function run(file: Buffer) {
    try {
      const result = renderSync({
        data: file.toString(),
        file: path,
        includePaths: includePath ? includePath.split(',') : [],
        sourceMap,
        sourceMapEmbed: sourceMap,
      });

      this.push(result);
    } catch (error) {
      this.emit('error', error);
    }
  };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sassCompiler };
