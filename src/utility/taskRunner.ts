import { Method } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';
import { readGlobFiles } from './readGlobFiles';

/* -----------------------------------
 *
 * IConfig
 *
 * -------------------------------- */

interface IConfig {
   source: string;
   options: IOptions;
}

/* -----------------------------------
 *
 * Runner
 *
 * -------------------------------- */

async function run(method: Method, config: IConfig) {
   const { source } = config;

   const start = new Date();
   const files = await readGlobFiles(source);
   const build = await method({ files, config });

   log.info('Running', method.name);

   try {
      const result = await Promise.all(files.map(build));

      result.forEach((file) => log.file(file));
   } catch ({ message, file, line }) {
      log.error(message, file, line);

      return;
   }

   const end = new Date();
   const time = end.getTime() - start.getTime();

   log.info('Finished', method.name, `after ${time} ms`);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { run };
