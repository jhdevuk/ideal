import stream, { ThroughStream } from 'through';
import { IOptions } from '@/options';
import { WebpackInstance } from './webpackInstance';

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function webpackCompiler(options: IOptions) {
   const instance = new WebpackInstance(options);
   let handle: ThroughStream = null;

   return () => {
      if (!handle) {
         handle = createStream(instance);
      }

      handle.on('end', () => {
         handle = null;
      });

      return handle;
   };
}

/* -----------------------------------
 *
 * Create
 *
 * -------------------------------- */

function createStream(instance: WebpackInstance) {
   const result = stream(instance.onStreamWrite, function end() {
      instance.onStreamEnd(this);
   });

   return result;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { webpackCompiler };
