import path from 'path';
import { Configuration } from 'webpack';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

const defaultWebpackConfig = ({
   release,
   pathAlias,
   includePath,
}: IOptions): Configuration => ({
   target: 'web',
   mode: release ? 'production' : 'development',
   // cache: !release,
   output: {
      libraryTarget: 'commonjs',
      filename: '[name].js',
      chunkFilename: '[name].js',
      jsonpFunction: '__IDL__',
   },
   resolve: {
      modules: [
         'node_modules',
         ...(includePath && [path.resolve(includePath)]),
      ],
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
         ...(pathAlias && {
            '@': path.resolve(pathAlias),
         }),
      },
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
            ...(includePath && {
               include: path.resolve(includePath),
            }),
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

export { defaultWebpackConfig };
