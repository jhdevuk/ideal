import { Transform } from 'stream';
import stream from 'through';
import webpack, { Compiler, Entry } from 'webpack';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * IEntry
 *
 * -------------------------------- */

interface IEntry {
   [index: string]: string[];
}

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function webpackCompiler(options: IOptions) {
   const entry: IEntry = {};

   return (path: string) =>
      stream(
         ({ named: name }) => {
            if (!entry[name]) {
               entry[name] = [];
            }

            entry[name].push(path);
         },
         function end() {
            console.log('ENTRIES', entry);

            this.emit('close');
         }
      );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { webpackCompiler };
