import { Readable } from 'stream';
import { Result } from 'postcss';
import { IOptions } from '@/options';
import { sassCompiler } from './sassCompiler';
import { cssProcessor } from './cssProcessor';
import { emitFile } from './emitFile';

/* -----------------------------------
 *
 * IFile
 *
 * -------------------------------- */

interface IFile {
   cssValue: Readable;
}

/* -----------------------------------
 *
 * Bundle
 *
 * -------------------------------- */

function bundleCompiler(options: IOptions) {
   const compiler = sassCompiler(options);
   const processor = cssProcessor(options);

   return async (data: Readable, path: string): Promise<IFile> =>
      new Promise((resolve, reject) =>
         data
            .pipe(compiler(path))
            .pipe(processor(path))
            .pipe(emitFile(resolve))
            .on('error', reject)
      );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { bundleCompiler };
