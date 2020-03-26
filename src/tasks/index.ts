import { buildAsyncSass } from './sass/buildAsyncSass';

/* -----------------------------------
 *
 * ITasks
 *
 * -------------------------------- */

interface ITasks {
   [index: string]: (source: string, options?: object) => void;
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
