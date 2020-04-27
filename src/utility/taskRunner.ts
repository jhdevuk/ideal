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
 * IConfig
 *
 * -------------------------------- */

interface IConfig {
   sourcePath: string;
   options: IOptions;
}

/* -----------------------------------
 *
 * Runner
 *
 * -------------------------------- */

async function taskRunner(
   methodKey: string,
   { sourcePath, options }: IConfig
) {
   const startTime = new Date().getTime();
   const paths = await readGlobFiles(sourcePath);
   const method = await tasks[methodKey](options);
   const taskMethod = () => runTask(method, paths, options);

   if (!paths.length) {
      log.error('No matching files for', sourcePath);

      return;
   }

   log.info('Running', methodKey, 'task...');

   await mkdir(options.outputPath);
   await taskMethod();

   const duration = timeAgo(new Date().getTime() - startTime);

   log.info('Finished', methodKey, `after ${duration}`);

   if (options.watch) {
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

            await watchTask(methodKey, taskMethod);

            runWatch = false;
         });
   }
}

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

async function runTask(task: Task, paths: string[], options: IOptions) {
   const files = paths.map((item) => readFile(item));

   const streams = files.map((data, index) =>
      task({
         data,
         path: paths[index],
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

/* -----------------------------------
 *
 * Watch
 *
 * -------------------------------- */

async function watchTask(
   methodKey: string,
   taskMethod: () => Promise<void>
) {
   const startTime = new Date().getTime();

   log.info('Running', methodKey, 'task...');

   await taskMethod();

   const duration = timeAgo(new Date().getTime() - startTime);

   log.info('Finished', methodKey, `after ${duration}`);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { taskRunner };
