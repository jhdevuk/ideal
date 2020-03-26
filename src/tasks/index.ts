import { sassBuildTask } from './sass/sassBuildTask';

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
   'sass:build': sassBuildTask,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { tasks };
