import { renderSync } from 'node-sass';
import { Transform } from 'stream';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function sassCompiler({ sourceMap }: IOptions) {
   return (path: string) =>
      new Transform({
         objectMode: true,
         transform: transformSource(path, sourceMap),
      });
}

/* -----------------------------------
 *
 * Transform
 *
 * -------------------------------- */

function transformSource(path: string, sourceMap: boolean) {
   return function run(file: Buffer) {
      const result = renderSync({
         data: file.toString(),
         file: path,
         includePaths: [],
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
