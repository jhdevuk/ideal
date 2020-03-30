import { ReadStream } from 'fs';
import { sassBuildTask } from './sass/sassBuildTask';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * ISetup
 *
 * -------------------------------- */

interface ISetup {
   files: ReadStream[];
   config: {
      source: string;
      options: IOptions;
   };
}

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

type Method = (setup: ISetup) => Promise<Task>;

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

type Task = (file: ReadStream, index: number) => Promise<any>;

/* -----------------------------------
 *
 * Tasks
 *
 * -------------------------------- */

const tasks = {
   'build:css': sassBuildTask,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { ISetup, Method, tasks };
