import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { IOptions } from '@/options';
import { sass } from './sass';
import { webpack } from './webpack';

/* -----------------------------------
 *
 * IStream
 *
 * -------------------------------- */

interface IStream {
   [index: string]: Readable;
}

/* -----------------------------------
 *
 * IResult
 *
 * -------------------------------- */

interface IResult {
   fileName: string;
   fileSize: number;
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
) => Promise<IStream>;

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

export { IStream, IResult, Method, Task, tasks };
