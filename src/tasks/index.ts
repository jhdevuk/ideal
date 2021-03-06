import { ReadStream } from 'fs';
import { Readable } from 'stream';
import { IOptions } from '@/options';
import { method as sassMethod } from './sass';
import { method as webpackMethod } from './webpack';
import { method as copyMethod } from './copy';
import { method as fontsMethod } from './fonts';
import { method as csprojMethod } from './csproj';
import { method as msbuildMethod } from './msbuild';

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

type Task = (props: IProps) => Promise<IStream>;

/* -----------------------------------
 *
 * Tasks
 *
 * -------------------------------- */

const tasks: ITasks = {
  css: sassMethod,
  js: webpackMethod,
  copy: copyMethod,
  fonts: fontsMethod,
  csproj: csprojMethod,
  msbuild: msbuildMethod,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { IProps, IStream, IResult, Method, Task, tasks };
