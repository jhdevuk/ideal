import buildTool from 'webpack-stream';
import webpack from 'webpack';
import source from 'vinyl-source-stream';
import named from 'vinyl-named';
import { BufferFile } from 'vinyl';
import { Readable } from 'stream';
import { IOptions } from '@/options';
import { config } from './webpack.default';
import { stringToStream } from '@/utility/streamHelpers';

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
   const compiler = buildTool(config(options));

   return (data: Readable, path: string): Promise<IFile[]> =>
      new Promise((resolve, reject) => {
         const result: IFile[] = [];

         data
            .pipe(source(path))
            .pipe(named())
            .pipe(compiler)
            .on('data', ({ basename, contents }: BufferFile) =>
               result.push({
                  name: basename,
                  data: stringToStream(contents),
               })
            )
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
