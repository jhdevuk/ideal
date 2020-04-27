import source from 'vinyl-source-stream';
import named from 'vinyl-named';
import { Readable } from 'stream';
import { BufferFile } from 'vinyl';
import { IOptions } from '@/options';
import { webpackCompiler } from './webpackCompiler';
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
   const compiler = webpackCompiler(options);

   return (data: Readable, path: string): Promise<IFile[]> =>
      new Promise((resolve, reject) => {
         const result: IFile[] = [];

         data
            .pipe(source(path))
            .pipe(named())
            .pipe(compiler())
            .on('data', ({ basename, contents }: BufferFile) => {
               result.push({
                  name: basename,
                  data: stringToStream(contents),
               });
            })
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
