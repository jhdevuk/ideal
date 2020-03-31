import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { IOptions } from '@/options';
import { sass } from './sass';
import { webpack } from './webpack';

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

type Method = (options: IOptions) => Promise<Task>;

/* -----------------------------------
 *
 * Task
 *
 * -------------------------------- */

type Task = (
   file: ReadStream,
   path: string,
   name: string
) => Promise<IResult>;

/* -----------------------------------
 *
 * Tasks
 *
 * -------------------------------- */

const tasks = {
   'build:css': sass,
   'build:js': webpack,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IResult, Method, Task, tasks };
