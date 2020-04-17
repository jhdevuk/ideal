import { Readable } from 'stream';
import { Result } from 'postcss';
import { IOptions } from '@/options';
import { sassCompiler } from './sassCompiler';
import { IFile, formatFile } from './formatFile';

/* -----------------------------------
 *
 * Bundle
 *
 * -------------------------------- */

function bundleCompiler(options: IOptions) {
   const compiler = sassCompiler(options);

   return async (data: Readable, path: string): Promise<IFile> =>
      new Promise((resolve, reject) => {
         let result: IFile;

         data
            .pipe(compiler(path))
            .on('data', (file: any) => (result = formatFile(file)))
            .on('error', reject)
            .on('close', () => resolve(result));

         return {};
      });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { bundleCompiler };
