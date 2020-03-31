import { ReadStream } from 'fs';
import { ITask } from '@/tasks';
import { getFileName } from '@/utility/getFileNames';
import { convertFile } from './tools/convertFile';

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

async function sassBuildTask({
   paths,
   config: { sourcePath, options },
}: ITask) {
   return async (file: ReadStream, name: string) => {
      const { cssValue } = await convertFile(file, {
         sourcePath,
         fileName: name,
      });

      return { [`${name}.css`]: cssValue };
   };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sassBuildTask };
