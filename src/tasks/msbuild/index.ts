import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';
import { dotnetCompiler } from './tools/dotnetCompiler';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(options: IOptions): Promise<Task> {
  const compiler = dotnetCompiler(options);

  return async ({ path }: IProps) => {
    await compiler.nuget(path);
    await compiler.build(path);

    return {};
  };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
