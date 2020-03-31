import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { sassBuildTask } from './sass/sassBuildTask';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * ITask
 *
 * -------------------------------- */

interface ITask {
   paths: string[];
   config: {
      sourcePath: string;
      options: IOptions;
   };
}

/* -----------------------------------
 *
 * IResult
 *
 * -------------------------------- */

interface IResult {
   [index: string]: Readable;
}

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

type Method = (props: ITask) => Promise<Task>;

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

type Task = (file: ReadStream, name: string) => Promise<IResult>;

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

export { ITask, IResult, Method, tasks };
