import { sassBuildTask } from './sass/sassBuildTask';
import { IOptions } from '@/options';

/* -----------------------------------
 *
 * IMethod
 *
 * -------------------------------- */

type Method = (source: string, options: IOptions) => Promise<void>;

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
 * Tasks
 *
 * -------------------------------- */

const tasks: ITasks = {
   'build:css': sassBuildTask,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { Method, tasks };
