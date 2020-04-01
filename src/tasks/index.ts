import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { IOptions } from '@/options';
import { sass } from './sass';
import { webpack } from './webpack';

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
   stream: ReadStream;
   path: string;
   name: string;
}

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
   name: string;
   hash: Promise<string>;
   size: string;
   stream: Readable;
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

type Task = (props: IProps) => Promise<IStream>;

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

export { IProps, IStream, IResult, Method, Task, tasks };
