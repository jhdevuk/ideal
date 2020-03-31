import { IResult, Method } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { readFile } from './readFile';
import { readGlobFiles } from './readGlobFiles';
import { getFileName } from './getFileNames';

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
   const start = new Date();
   const { sourcePath } = config;

   const paths = await readGlobFiles(sourcePath);
   const files = paths.map((item) => readFile(item));
   const build = await taskMethod({ paths, config });

   log.info('Running', taskMethod.name);

   try {
      const result = await Promise.all(
         files.map((file) => build(file, getFileName(file)))
      );

      const output = writeOutput(result);

      output?.forEach(log.file);
   } catch ({ message, file, line }) {
      log.error(message, file, line);

      return;
   }

   const end = new Date();
   const time = end.getTime() - start.getTime();

   log.info('Finished', taskMethod.name, `after ${time} ms`);
}

/* -----------------------------------
 *
 * Write
 *
 * -------------------------------- */

function writeOutput(result: IResult[]) {
   const names = Object.keys(result);

   console.log('NAMES', result);

   return [];
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { run };
