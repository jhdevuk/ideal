import buildTool from 'webpack-stream';
import source from 'vinyl-source-stream';
import named from 'vinyl-named';
import { File } from 'vinyl';
import { Readable } from 'stream';
import { config } from './webpack.default';
import { IFile, formatFile } from './formatFile';

/* -----------------------------------
 *
 * Bundle
 *
 * -------------------------------- */

function bundleCompiler() {
   const compiler = buildTool(config);

   return (data: Readable, path: string): Promise<IFile[]> =>
      new Promise((resolve, reject) => {
         const result: IFile[] = [];

         data
            .pipe(source(path))
            .pipe(named())
            .pipe(compiler)
            .on('data', (file: File) => result.push(formatFile(file)))
            .on('error', reject)
            .on('close', () => resolve(result));
      });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { bundleCompiler };
