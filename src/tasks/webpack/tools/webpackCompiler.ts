import stream from 'through';
import { IOptions } from '@/options';
import { WebpackInstance } from './webpackInstance';

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function webpackCompiler(options: IOptions) {
   const instance = new WebpackInstance(options);

   return (path: string) =>
      stream(
         (file) => instance.onStreamWrite(path, file),
         function end() {
            instance.onStreamEnd(this);
         }
      );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { webpackCompiler };
