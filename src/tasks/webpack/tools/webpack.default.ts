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
  outputPath,
}: IOptions): Configuration {
  return {
    target: 'web',
    mode: release ? 'production' : 'development',
    cache: !release,
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      jsonpFunction: '__IDL__',
      crossOriginLoading: 'anonymous',
      publicPath: path.join(outputPath, '/'),
    },
    resolve: {
      modules: [
        'node_modules',
        ...(includePath
          ? includePath.split(',').map((item) => path.resolve(item))
          : []),
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
