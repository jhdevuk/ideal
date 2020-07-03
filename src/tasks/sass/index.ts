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
    let fileName = `${name}.css`;

    const { cssValue, cssModule } = await compiler(data, path);

    if (typeof options.renameFile === 'function') {
      fileName = options.renameFile(fileName, path);
    }

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
