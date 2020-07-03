import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';
import { loadManifest } from './tools/loadManifest';
import { buildResult } from './tools/buildResult';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method({ manifestPath }: IOptions): Promise<Task> {
  const manifest = await loadManifest(manifestPath);

  return async ({ data, name }: IProps) => {
    const result = await buildResult(manifestPath, manifest, data);

    return {
      [`${name}.csproj`]: result,
    };
  };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
