import { buildAsyncSass } from './sass/buildAsyncSass';

/* -----------------------------------
 *
 * ITasks
 *
 * -------------------------------- */

interface ITasks {
   [index: string]: (...args: any) => void;
}

/* -----------------------------------
 *
 * Tasks
 *
 * -------------------------------- */

const tasks: ITasks = {
   'sass:async': buildAsyncSass,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { tasks };
