import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';
import fontkit from 'fontkit';
import { streamToBuffer, stringToStream } from '@/utility/streamHelpers';
import { fontTemplate } from './tools/fontTemplate';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method({ renameFile }: IOptions): Promise<Task> {
  return async ({ data, name, path }: IProps) => {
    const file = await streamToBuffer(data);
    const { familyName } = fontkit.create(file);

    const result = fontTemplate({
      familyName,
      fileName: name,
      encodedData: file.toString('base64'),
    });

    if (typeof renameFile === 'function') {
      name = renameFile(name, path);
    }

    return {
      [`${name}.css`]: stringToStream(result),
    };
  };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
