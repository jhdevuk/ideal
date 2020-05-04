import webpack, { Compiler, Stats, Configuration } from 'webpack';
import { ThroughStream } from 'through';
import log from 'fancy-log';
import MemoryFileSystem from 'memory-fs';
import File, { BufferFile } from 'vinyl';
import path from 'path';
import { IOptions } from '@/options';
import { runtimeRequire } from '@/utility/runtimeRequire';
import { defaultWebpackConfig } from './webpack.default';

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
   private instance: Compiler;
   private config: Configuration;
   private fileSystem = new MemoryFileSystem();
   private entry: IEntry = {};

   public constructor(private readonly options: IOptions) {}

   public onStreamWrite = ({
      named: name,
      path: filePath,
   }: BufferFile) => {
      if (!this.entry[name]) {
         this.entry[name] = [];
      }

      this.entry[name].push(filePath);
   };

   public onStreamEnd = (stream: ThroughStream) => {
      const config = this.getWebpackConfig();

      if (!this.instance) {
         this.instance = webpack(config);
      }

      this.instance.run(this.onComplete(stream));

      this.onAfterEmit(stream);
   };

   private onComplete = (stream: ThroughStream) => (
      error: Error,
      stats: Stats
   ) => {
      if (error) {
         stream.emit('error', error);

         return;
      }

      log.info(
         stats.toString({
            colors: true,
         })
      );

      stream.emit('end');
   };

   private onAfterEmit(stream: ThroughStream) {
      const { instance, fileSystem } = this;

      instance.outputFileSystem = fileSystem;

      // Webpack 4 API
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

      for (const name of fileNames) {
         if (!assets[name].emitted) {
            continue;
         }

         const file = this.prepareFile(name);

         stream.queue(file);
      }

      callback();
   };

   private getWebpackConfig() {
      const { options, entry, config } = this;

      if (this.config) {
         return this.config;
      }

      let configObject;

      try {
         configObject = runtimeRequire('./webpack.config.js');
      } catch (error) {
         configObject = defaultWebpackConfig(options);
      }

      return (this.config = { ...configObject, entry });
   }

   private prepareFile(name: string) {
      const { instance, fileSystem } = this;

      let filePath = fileSystem.join(instance.outputPath, name);

      if (filePath.indexOf('?') !== -1) {
         filePath = filePath.split('?')[0];
      }

      const contents = fileSystem.readFileSync(filePath);

      const file = new File({
         base: instance.outputPath,
         path: path.join(instance.outputPath, name),
         contents,
      });

      return file;
   }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { WebpackInstance };
