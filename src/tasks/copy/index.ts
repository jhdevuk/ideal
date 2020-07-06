import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';
import { extname } from 'path';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method({ renameFile }: IOptions): Promise<Task> {
  return async ({ data, name, path }: IProps) => {
    const extension = extname(path);

    if (typeof renameFile === 'function') {
      name = renameFile(name, path);
    }

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
