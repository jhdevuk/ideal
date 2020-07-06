import { Task, IProps } from '@/tasks';
import { extname } from 'path';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(): Promise<Task> {
  return async ({ data, name, path }: IProps) => {
    const extension = extname(path);

    return {
      [name + extension]: data,
    };
  };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
