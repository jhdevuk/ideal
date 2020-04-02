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
   },
   resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.json'],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
               fix: true,
            },
         },
         {
            test: /\.tsx?$/,
            use: [
               {
                  loader: 'ts-loader',
               },
            ],
         },
      ],
   },
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { config };
