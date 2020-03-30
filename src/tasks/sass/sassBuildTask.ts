import path from 'path';
import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { ISetup } from '@/tasks';
import { convertFile } from './tools/convertFile';

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

async function sassBuildTask({ files, config }: ISetup) {
   return async (file: ReadStream, index: number) => {
      const { cssValue } = await convertFile(file);

      console.log('PROCESS', cssValue);
   };
}
/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sassBuildTask };
