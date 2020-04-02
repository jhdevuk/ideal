import buildTool from 'webpack-stream';
import webpack from 'webpack';
import source from 'vinyl-source-stream';
import named from 'vinyl-named';
import { Readable } from 'stream';
import { config } from './webpack.default';

/* -----------------------------------
 *
 * Bundle
 *
 * -------------------------------- */

function bundleCompiler() {
   const callback = (resolve: any) => resolve();
   const compiler = buildTool(config as any);

   return (data: Readable, path: string) =>
      new Promise((resolve, reject) => {
         const result: Buffer[] = [];

         data
            .pipe(source(path))
            .pipe(named())
            .pipe(compiler)
            .on('data', (file: Buffer) => result.push(file))
            .on('end', () => resolve(result));
      });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { bundleCompiler };
