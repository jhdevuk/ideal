import { Configuration } from 'webpack';

/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

const config: Configuration = {
   target: 'web',
   mode: 'development',
   output: {
      libraryTarget: 'commonjs',
      filename: '[name].js',
      chunkFilename: '[name].js',
      jsonpFunction: '__VC__',
      publicPath: '/dist/',
   },
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { config };
