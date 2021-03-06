import { Result } from 'node-sass';
import postCss, { Processor } from 'postcss';
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
  const plugins: any[] = [
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

  return (path: string, reject) =>
    new Transform({
      objectMode: true,
      transform: transformSource(instance, path, sourceMap),
    }).on('error', reject);
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
    try {
      const result = await instance.process(file.css, {
        from: path,
        map: sourceMap,
      });

      this.push(result);
    } catch (error) {
      this.emit('error', error);
    }
  };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { cssProcessor };
