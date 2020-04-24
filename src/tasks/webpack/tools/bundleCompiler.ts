import source from 'vinyl-source-stream';
import named from 'vinyl-named';
import { BufferFile } from 'vinyl';
import { Readable } from 'stream';
import { IOptions } from '@/options';
import { config } from './webpack.default';
import { stringToStream } from '@/utility/streamHelpers';
import { webpackCompiler } from './webpackCompiler';
import { emitFile } from './emitFile';

/* -----------------------------------
 *
 * IFile
 *
 * -------------------------------- */

interface IFile {
   name: string;
   data: Readable;
}

/* -----------------------------------
 *
 * Bundle
 *
 * -------------------------------- */

function bundleCompiler(options: IOptions) {
   const compiler = webpackCompiler(options);

   return (data: Readable, path: string): Promise<IFile[]> =>
      new Promise((resolve, reject) => {
         const result: IFile[] = [];

         data
            .pipe(source(path))
            .pipe(named())
            .pipe(compiler(path))
            // .pipe(emitFile(resolve))
            .on('error', reject)
            .on('close', () => resolve(result));
      });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IFile, bundleCompiler };
