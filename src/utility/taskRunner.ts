import chokidar from 'chokidar';
import { tasks, Method } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { readFile } from '@/utility/readFile';
import { readGlobFiles } from '@/utility/readGlobFiles';
import { getFileName } from '@/utility/getFileNames';
import { processStreams } from '@/utility/processStreams';
import { hashFileNames } from '@/utility/hashFileNames';
import { writeStreams } from '@/utility/writeStreams';

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
   const taskMethod = () => runTask(tasks[methodKey], paths, options);

   if (!paths.length) {
      log.error('No matching files for', sourcePath);

      return;
   }

   log.info('Running', methodKey, 'task...');

   await taskMethod();

   const endTime = new Date().getTime();

   log.info('Finished', methodKey, `after ${endTime - startTime} ms`);

   if (options.watch) {
      chokidar
         .watch(sourcePath)
         .on('change', async () => watchTask(taskMethod));
   }
}

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

async function runTask(
   method: Method,
   paths: string[],
   options: IOptions
) {
   const files = paths.map((item) => readFile(item));
   const task = await method(options);

   const streams = files.map((stream, index) =>
      task({
         stream,
         path: paths[index],
         name: getFileName(stream),
      })
   );

   let result = [];

   try {
      result = await processStreams(streams);
      result = await hashFileNames(result, options.release);
      result = await writeStreams(result, options.output);
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

async function watchTask(task: () => Promise<void>) {
   //
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { taskRunner };
