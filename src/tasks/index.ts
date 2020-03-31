import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { IOptions } from '@/options';
import { sass } from './sass';

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
   'build:css': sass,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { ITask, IResult, Method, tasks };
