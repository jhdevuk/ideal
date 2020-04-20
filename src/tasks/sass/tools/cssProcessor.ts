import { Result } from 'node-sass';
import postCss, { Transformer } from 'postcss';
import autoprefixer from 'autoprefixer';
import modules from 'postcss-modules';
import { Transform } from 'stream';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Processor
 *
 * -------------------------------- */

function cssProcessor({ release, cssModules }: IOptions) {
   const plugins = [
      autoprefixer({
         cascade: false,
         overrideBrowserslist: ['last 2 versions', '> 1%'],
      }),
   ];

   if (cssModules) {
      plugins.push(
         modules({
            generateScopedName: release
               ? '[hash:base64:8]'
               : '[name]-[local]',
         })
      );
   }

   return (path: string) =>
      new Transform({
         objectMode: true,
         transform: transformSource(plugins, path),
      });
}

/* -----------------------------------
 *
 * Transfrom
 *
 * -------------------------------- */

function transformSource(plugins: Transformer[], path: string) {
   const instance = postCss(plugins);

   return async function run(file: Result) {
      const result = await instance.process(file.css, { from: path });

      this.push(result);
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { cssProcessor };
