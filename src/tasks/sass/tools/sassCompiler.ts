import { renderSync } from 'node-sass';
import { Transform } from 'stream';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function sassCompiler(options: IOptions) {
  return (path: string) =>
    new Transform({
      objectMode: true,
      transform: transformSource(path, options),
    });
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
    const result = renderSync({
      data: file.toString(),
      file: path,
      includePaths: includePath ? includePath.split(',') : [],
      sourceMap,
      sourceMapEmbed: sourceMap,
    });

    this.push(result);
  };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sassCompiler };
