import path from 'path';
import { Configuration } from 'webpack';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

const config = ({ release }: IOptions): Configuration => ({
   target: 'web',
   mode: release ? 'production' : 'development',
   output: {
      libraryTarget: 'commonjs',
      filename: '[name].js',
      chunkFilename: '[name].js',
      jsonpFunction: '__IDL__',
   },
   resolve: {
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
         '@': path.resolve('./src/'),
      },
   },
   externals: {
      'ideal.config': './ideal.config.js',
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
   optimization: {
      mergeDuplicateChunks: true,
      runtimeChunk: false,
      splitChunks: {
         name: true,
         chunks: 'async',
         cacheGroups: {
            default: false,
            commons: {
               name: 'shared',
               minChunks: 2,
               maxInitialRequests: 5,
            },
            vendor: {
               test: /[\\/]node_modules[\\/]/,
               name: 'vendor',
               enforce: true,
               chunks: 'all',
            },
         },
      },
   },
});

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { config };
