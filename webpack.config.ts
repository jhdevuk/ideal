import {
   Configuration,
   Entry,
   DefinePlugin,
   BannerPlugin,
} from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
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
   entry: fs
      .readdirSync(path.join(__dirname, `./${config.path.bin}`))
      .filter((file) => file.match(/.*\.ts$/))
      .reduce(getEntryFile, {}),

   mode: RELEASE ? 'production' : 'development',
   target: 'node',
   devtool: DEBUG ? 'eval-source-map' : void 0,
   context: path.join(__dirname, `./${config.path.src}`),
   cache: !RELEASE,
   output: {
      path: path.join(__dirname, `./${config.path.dist}`),
      filename: '[name].js',
   },
   resolve: {
      extensions: ['.ts', '.tsx', 'json'],
      alias: {
         '@': path.join(__dirname, `../${config.path.src}`),
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
            use: [
               {
                  loader: 'ts-loader',
               },
            ],
         },
         {
            loader: 'shebang-loader',
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
 * Entry
 *
 * -------------------------------- */

function getEntryFile(result: Entry, file: string) {
   const name = path.basename(file, path.extname(file));

   result[name] = path.join(__dirname, `./${config.path.bin}`, file);

   return result;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default client;
