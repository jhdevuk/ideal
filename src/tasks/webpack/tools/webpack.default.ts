import path from 'path';
import { Configuration } from 'webpack';
import { IOptions } from '@/options';
import { resolveLoader } from './resolveLoader';

/* -----------------------------------
 *
 * Plugins
 *
 * -------------------------------- */

// @ts-ignore
import ChunkRenamePlugin from 'webpack-chunk-rename-plugin';
import RuntimePathPlugin from 'webpack-update-public-path-plugin';

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
      chunkFilename: release ? '[name].[chunkhash:8].js' : '[name].js',
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
    plugins: [
      new ChunkRenamePlugin({
        vendor: '[name].js',
      }),
      new RuntimePathPlugin({
        publicPath: getRuntimePath(outputPath),
      }),
    ],
  };
}

/* -----------------------------------
 *
 * Runtime
 *
 * -------------------------------- */

function getRuntimePath(outputPath: string) {
  const runtimePath = 'window.__publicPath';

  const result = path
    .join('/', outputPath, '/')
    .replace(/\\/g, '/')
    .toLowerCase();

  return `${runtimePath} || '${result}'`;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { defaultWebpackConfig };
