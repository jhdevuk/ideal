import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method({ manifestPath }: IOptions): Promise<Task> {
  return async ({ data, name }: IProps) => {
    console.log('COPY', name);

    return {};
  };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
