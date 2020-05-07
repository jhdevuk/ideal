import chokidar from 'chokidar';
import timeAgo from 'pretty-ms';
import mkdir from 'mkdirp';
import { IResult, tasks, Task, IStream } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { readFile } from '@/utility/readFile';
import { readGlobFiles } from '@/utility/readGlobFiles';
import { getStreamFileName } from '@/utility/getStreamFileNames';
import { processStreams } from '@/utility/processStreams';
import { hashFileNames } from '@/utility/hashFileNames';
import { writeStreams } from '@/utility/writeStreams';
import { writeManifest } from '@/utility/writeManifest';

/* -----------------------------------
 *
 * Runner
 *
 * -------------------------------- */

class TaskRunner {
   private startTime: number;
   private filePaths: string[];
   private taskMethod: () => Promise<void>;
   private taskRunning: boolean;

   public constructor(
      private readonly methodKey: string,
      private readonly sourcePath: string,
      private readonly options: IOptions
   ) {}

   public async start() {
      const { sourcePath, options } = this;
      const filePaths = await this.readPaths();

      if (!filePaths.length) {
         log.error('No matching files for', sourcePath);

         return;
      }

      await mkdir(options.outputPath);

      await this.setMethod();
      await this.taskMethod();
   }

   public async watch() {
      const { sourcePath } = this;
      const { watch, watchPath, outputPath } = this.options;

      if (!watch) {
         return;
      }

      chokidar
         .watch(watchPath || sourcePath, {
            atomic: false,
            ignored: [outputPath],
         })
         .on('change', () => this.taskMethod());
   }

   private async readPaths() {
      const { sourcePath } = this;

      this.filePaths = await readGlobFiles(sourcePath);

      return this.filePaths;
   }

   private async setMethod() {
      const { methodKey, options } = this;

      const method = await tasks[methodKey](options);

      this.taskMethod = () => this.runTask(method);
   }

   private async runTask(method: Task) {
      const { options, filePaths, taskRunning } = this;

      if (taskRunning) {
         return;
      }

      this.taskRunning = true;
      this.logRunTime('start');

      const files = filePaths.map((item) => readFile(item));

      const streams = files.map((data, index) =>
         method({
            data,
            path: filePaths[index],
            name: getStreamFileName(data),
         })
      );

      let result: IResult[] = [];

      try {
         result = await this.processTasks(streams);
      } catch ({ message, file, line }) {
         log.error(message, file, line);

         process.exit(1);
      }

      if (options.verbose) {
         result.forEach(log.result);
      }

      this.taskRunning = false;
      this.logRunTime('end');
   }

   private logRunTime(type: 'start' | 'end') {
      const { methodKey } = this;

      const timeValue = new Date().getTime();

      if (type === 'start') {
         this.startTime = timeValue;

         log.info('Running', methodKey, `task...`);

         return;
      }

      const duration = timeAgo(new Date().getTime() - this.startTime);

      log.info('Finished', methodKey, `after ${duration}`);
   }

   private async processTasks(streams: Array<Promise<IStream | void>>) {
      const { release, outputPath, filePrefix } = this.options;

      let result: IResult[] = [];

      result = await processStreams(streams, filePrefix);
      result = await hashFileNames(result, release);
      result = await writeStreams(result, outputPath);
      result = await writeManifest(result, outputPath);

      return result;
   }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { TaskRunner };
