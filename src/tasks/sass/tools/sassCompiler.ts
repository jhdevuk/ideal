import buildTool, { Processor } from 'postcss';
import sass from '@csstools/postcss-sass';
import syntax from 'postcss-scss';
import autoprefixer from 'autoprefixer';
import { Transform } from 'stream';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Compiler
 *
 * -------------------------------- */

function sassCompiler(options: IOptions) {
   const postCss = buildTool([
      sass({
         outputStyle: 'expanded',
         includePaths: [],
      }),
      autoprefixer({
         cascade: false,
         overrideBrowserslist: ['last 2 versions', '> 1%'],
      }),
   ]);

   return (path: string) =>
      new Transform({
         objectMode: true,
         transform: processSource(postCss, path),
      });
}

/* -----------------------------------
 *
 * Process
 *
 * -------------------------------- */

function processSource(postCss: Processor, path: string) {
   return async function run(file: Buffer) {
      const result = await postCss.process(file, { syntax, from: path });

      this.emit('data', result);
      this.emit('close');
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sassCompiler };
