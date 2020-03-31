import path from 'path';
import { IResult, tasks, Method } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { readFile } from '@/utility/readFile';
import { readGlobFiles } from '@/utility/readGlobFiles';
import { getFileName } from '@/utility/getFileNames';
import { writeFile } from '@/utility/writeFile';

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
      log.error('has no matching files', sourcePath);

      return;
   }

   const files = paths.map((item) => readFile(item));
   const build = await method(options);

   log.info('Running', methodKey, 'task...');

   try {
      const streams = await Promise.all(
         files.map((stream, index) =>
            build(stream, paths[index], getFileName(stream))
         )
      );

      const result = await writeStreams(streams, options.output);

      result?.forEach(log.file);
   } catch ({ message, file, line }) {
      log.error(message, file, line);

      return;
   }

   const endTime = new Date().getTime();

   log.info('Finished', methodKey, `after ${endTime - startTime} ms`);
}

/* -----------------------------------
 *
 * Write
 *
 * -------------------------------- */

async function writeStreams(result: IResult[], output: string) {
   const names = result.map((item) => Object.keys(item)).flat();

   const files = result
      .map((item) => Object.keys(item).map((key) => item[key]))
      .flat();

   await Promise.all(
      files.map((file, index) =>
         writeFile(path.join(output, names[index]), file)
      )
   );

   return names;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { taskRunner };
