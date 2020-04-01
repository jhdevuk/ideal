import { tasks, Method } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { readFile } from '@/utility/readFile';
import { readGlobFiles } from '@/utility/readGlobFiles';
import { getFileName } from '@/utility/getFileNames';
import { writeResultStreams } from '@/utility/writeResultStreams';

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
   const method: Method = tasks[methodKey];

   if (!paths.length) {
      log.error('No matching files for', sourcePath);

      return;
   }

   const files = paths.map((item) => readFile(item));
   const build = await method(options);

   log.info('Running', methodKey, 'task...');

   try {
      const streams = await Promise.all(
         files.map((stream, index) =>
            build({
               stream,
               path: paths[index],
               name: getFileName(stream),
            })
         )
      );

      const result = await writeResultStreams(streams, options.output);

      result.forEach(log.result);
   } catch ({ message, file, line }) {
      log.error(message, file, line);

      process.exit(1);

      return;
   }

   const endTime = new Date().getTime();

   log.info('Finished', methodKey, `after ${endTime - startTime} ms`);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { taskRunner };
