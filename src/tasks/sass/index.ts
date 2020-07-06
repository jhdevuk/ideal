import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';
import { bundleCompiler } from './tools/bundleCompiler';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method(options: IOptions): Promise<Task> {
  const compiler = bundleCompiler(options);

  return async ({ data, name, path }: IProps) => {
    const { cssValue, cssModule } = await compiler(data, path);

    if (typeof options.renameFile === 'function') {
      name = options.renameFile(name, path);
    }

    const fileName = `${name}.css`;

    return {
      [fileName]: cssValue,
      [`${fileName}.json`]: cssModule,
    };
  };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
