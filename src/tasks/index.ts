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
   'build:css': sassBuildTask,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { tasks };
