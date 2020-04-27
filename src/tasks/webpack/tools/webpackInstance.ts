import webpack, { Compiler } from 'webpack';
import { ThroughStream } from 'through';
import log from 'fancy-log';
import MemoryFileSystem from 'memory-fs';
import { BufferFile } from 'vinyl';
import { IOptions } from '@/options';
import { config } from './webpack.default';

/* -----------------------------------
 *
 * IEntry
 *
 * -------------------------------- */

interface IEntry {
   [index: string]: string[];
}

/* -----------------------------------
 *
 * Instance
 *
 * -------------------------------- */

class WebpackInstance {
   private options: IOptions;
   private instance: Compiler;
   private entry: IEntry = {};
   private isRunning = false;

   public constructor(options: IOptions) {
      this.options = options;
   }

   public onStreamWrite = (path: string, { named: name }: BufferFile) => {
      if (!this.entry[name]) {
         this.entry[name] = [];
      }

      this.entry[name].push(path);
   };

   public onStreamEnd = (stream: ThroughStream) => {
      const { options, entry, isRunning } = this;

      if (!this.instance) {
         this.instance = webpack({ ...config(options), entry });
      }

      if (!isRunning) {
         this.instance.run(this.onComplete);
         this.isRunning = true;

         this.onAfterEmit(stream);
      }
   };

   private onComplete = (error, stats) => {
      log.info(
         stats.toString({
            colors: true,
         })
      );

      console.log('WebpackInstance.onComplete()');
   };

   private onAfterEmit(stream: ThroughStream) {
      const { instance } = this;

      // Webpack 4
      instance.hooks.afterEmit.tapAsync(
         'WebpackStream',
         (compilation, callback) =>
            this.onTapAsync(stream, compilation, callback)
      );
   }

   private onTapAsync = (
      stream: ThroughStream,
      { assets }: webpack.compilation.Compilation,
      callback: () => void
   ) => {
      const fileNames = Object.keys(assets);

      fileNames.forEach((outname) => {
         if (assets[outname].emitted) {
            //   const file = this.prepareFile(fs, compiler, outname);
            //   stream.queue(file);
         }
      });

      callback();
   };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { WebpackInstance };
