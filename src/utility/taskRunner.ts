import chokidar, { watch } from 'chokidar';
import timeAgo from 'pretty-ms';
import mkdir from 'mkdirp';
import { IResult, tasks, Task } from '@/tasks';
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
   private endTime: number;
   private filePaths: string[];
   private taskMethod: () => Promise<void>;

   public constructor(
      private readonly methodKey: string,
      private readonly sourcePath: string,
      private readonly options: IOptions
   ) {}

   public async start() {
      const { methodKey, sourcePath, options } = this;

      await this.setTime('start');

      const filePaths = await this.readPaths();

      if (!filePaths.length) {
         log.error('No matching files for', sourcePath);

         return;
      }

      await this.setMethod();

      log.info('Running', methodKey, 'task...');

      await mkdir(options.outputPath);

      await this.taskMethod();

      const duration = timeAgo(new Date().getTime() - this.startTime);

      log.info('Finished', methodKey, `after ${duration}`);

      await this.watch();
   }

   private async watch() {
      const { sourcePath, methodKey, options } = this;

      if (!options.watch) {
         return;
      }

      let runWatch = false;

      log.info('Watching', methodKey, `task...`);

      chokidar
         .watch(options.watchPath || sourcePath, {
            atomic: false,
            ignored: [options.outputPath],
         })
         .on('change', async () => {
            if (runWatch) {
               return;
            }

            runWatch = true;

            await this.watchTask();

            runWatch = false;
         });
   }

   private setTime(type: 'start' | 'end') {
      const timeValue = new Date().getTime();

      if (type === 'start') {
         this.startTime = timeValue;

         return;
      }

      this.endTime = timeValue;
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
      const { options, filePaths } = this;

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
         result = await processStreams(streams);
         result = await hashFileNames(result, options.release);
         result = await writeStreams(result, options.outputPath);
         result = await writeManifest(result, options.outputPath);
      } catch ({ message, file, line }) {
         log.error(message, file, line);

         process.exit(1);
      }

      if (options.verbose) {
         result.forEach(log.result);
      }
   }

   private async watchTask() {
      const { methodKey } = this;

      const startTime = new Date().getTime();

      log.info('Running', methodKey, 'task...');

      await this.taskMethod();

      const duration = timeAgo(new Date().getTime() - startTime);

      log.info('Finished', methodKey, `after ${duration}`);
   }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { TaskRunner };
