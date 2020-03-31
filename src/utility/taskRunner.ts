import path from 'path';
import { IResult, Method } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { readFile } from './readFile';
import { readGlobFiles } from './readGlobFiles';
import { getFileName } from './getFileNames';
import { writeFile } from './writeFile';

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

async function run(taskMethod: Method, config: IConfig) {
   const startTime = new Date().getTime();

   const {
      sourcePath,
      options: { output },
   } = config;

   const paths = await readGlobFiles(sourcePath);
   const files = paths.map((item) => readFile(item));
   const build = await taskMethod({ paths, config });

   log.info('Running', taskMethod.name, 'task...');

   try {
      const streams = await Promise.all(
         files.map((file) => build(file, getFileName(file)))
      );

      const result = await writeOutput(streams, output);

      result?.forEach(log.file);
   } catch ({ message, file, line }) {
      log.error(message, file, line);

      return;
   }

   const endTime = new Date().getTime();

   log.info(
      'Finished',
      taskMethod.name,
      `after ${endTime - startTime} ms`
   );
}

/* -----------------------------------
 *
 * Write
 *
 * -------------------------------- */

async function writeOutput(result: IResult[], output: string) {
   const files = result
      .map((item) => Object.keys(item).map((key) => item[key]))
      .flat();

   const names = result.map((item) => Object.keys(item)).flat();

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

export { run };
