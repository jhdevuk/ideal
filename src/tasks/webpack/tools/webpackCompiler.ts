import { Transform } from 'stream';
import buildTool from 'webpack-stream';
import webpack, { Compiler } from 'webpack';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function webpackCompiler(options: IOptions) {
   return (path: string) =>
      new Transform({
         objectMode: true,
         transform: transformSource(path),
      });
}

/* -----------------------------------
 *
 * Transform
 *
 * -------------------------------- */

function transformSource(path: string) {
   return function run(file: Buffer) {
      this.push(file);
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { webpackCompiler };
