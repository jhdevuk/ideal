import { Method } from '@/tasks';
import { IOptions } from '@/options';
import * as log from '@/utility/logOutput';

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

async function run(method: Method, { source, options }: IConfig) {
   const start = new Date();

   log.info('Running', method.name);

   try {
      const result = await method(source, options);

      result.forEach((file) => log.file(file));
   } catch ({ message }) {
      log.error(message);

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
