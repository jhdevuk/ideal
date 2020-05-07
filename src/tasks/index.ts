import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { IOptions } from '@/options';
import { method as convertSass } from './convertSass';
import { method as runWebpack } from './runWebpack';
import { method as lintSass } from './lintSass';

/* -----------------------------------
 *
 * ITasks
 *
 * -------------------------------- */

interface ITasks {
   [index: string]: Method;
}

/* -----------------------------------
 *
 * IProps
 *
 * -------------------------------- */

interface IProps {
   data: ReadStream;
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
   type: string;
   hash: string;
   prefix?: string;
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

type Task = (props: IProps) => Promise<IStream | void>;

/* -----------------------------------
 *
 * Tasks
 *
 * -------------------------------- */

const tasks: ITasks = {
   'build:css': convertSass,
   'build:js': runWebpack,
   'lint:css': lintSass,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IProps, IStream, IResult, Method, Task, tasks };
