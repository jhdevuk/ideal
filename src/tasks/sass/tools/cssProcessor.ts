import { Result } from 'node-sass';
import postCss, { Processor, Transformer } from 'postcss';
import autoprefixer from 'autoprefixer';
import modules from 'postcss-modules';
import minify from 'cssnano';
import { Transform } from 'stream';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Processor
 *
 * -------------------------------- */

function cssProcessor({ release, cssModules, sourceMap }: IOptions) {
   const plugins = [
      autoprefixer({
         cascade: false,
         overrideBrowserslist: ['last 2 versions', '> 1%'],
      }),
   ];

   if (cssModules) {
      plugins.unshift(
         modules({
            generateScopedName: release
               ? '[hash:base64:8]'
               : '[name]-[local]',
         })
      );
   }

   if (release) {
      plugins.push(minify());
   }

   const instance = postCss(plugins);

   return (path: string) =>
      new Transform({
         objectMode: true,
         transform: transformSource(instance, path, sourceMap),
      });
}

/* -----------------------------------
 *
 * Transfrom
 *
 * -------------------------------- */

function transformSource(
   instance: Processor,
   path: string,
   sourceMap: boolean
) {
   return async function run(file: Result) {
      const result = await instance.process(file.css, {
         from: path,
         map: sourceMap,
      });

      this.push(result);
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { cssProcessor };
