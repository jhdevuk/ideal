import { Configuration, DefinePlugin, BannerPlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import * as path from 'path';
import { config } from './src/config';

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const RELEASE = process.argv.includes('--release');
const DEBUG = process.argv.includes('--debug');

/* -----------------------------------
 *
 * Client
 *
 * -------------------------------- */

const client: Configuration = {
  entry: path.join(__dirname, `./${config.path.src}/build.ts`),
  mode: RELEASE ? 'production' : 'development',
  target: 'node',
  externals: [nodeExternals()],
  devtool: DEBUG ? 'eval-source-map' : void 0,
  context: path.join(__dirname, `./${config.path.src}`),
  cache: !RELEASE,
  output: {
    path: path.join(__dirname, `./${config.path.dist}`),
    filename: 'build.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', 'json'],
    alias: {
      '@': path.join(__dirname, `./${config.path.src}`),
    },
  },
  node: {
    __filename: true,
    __dirname: true,
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
  performance: {
    hints: !DEBUG ? 'warning' : void 0,
  },
  plugins: [
    new DefinePlugin({
      __DEV__: !RELEASE,
    }),
    new BannerPlugin({
      banner: '#! /usr/bin/env node',
      raw: true,
    }),
  ],
  stats: {
    colors: true,
    timings: true,
  },
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default client;
