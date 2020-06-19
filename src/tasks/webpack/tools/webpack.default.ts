import path from 'path';
import { Configuration } from 'webpack';
import { IOptions } from '@/options';
import { resolveLoader } from './resolveLoader';

/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

function defaultWebpackConfig({
   release,
   pathAlias,
   includePath,
}: IOptions): Configuration {
   return {
      target: 'web',
      mode: release ? 'production' : 'development',
      cache: !release,
      output: {
         libraryTarget: 'commonjs',
         filename: '[name].js',
         chunkFilename: '[name].js',
         jsonpFunction: '__IDL__',
         crossOriginLoading: 'anonymous',
      },
      resolve: {
         modules: [
            'node_modules',
            ...(includePath ? [path.resolve(includePath)] : []),
         ],
         extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.json',
            '.scss',
            '.css',
         ],
         alias: {
            ...(pathAlias ? { '@': path.resolve(pathAlias) } : {}),
         },
      },
      module: {
         rules: [
            {
               test: /\.tsx?$/,
               include: includePath ? path.resolve(includePath) : void 0,
               use: [
                  {
                     loader: resolveLoader('ts-loader'),
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
                  name: 'common',
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
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { defaultWebpackConfig };
