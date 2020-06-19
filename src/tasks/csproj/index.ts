import { IOptions } from '@/options';
import { Task, IProps } from '@/tasks';
import { loadManifest } from './tools/loadManifest';
import { parseXMLDoc } from './tools/parseXMLDoc';

/* -----------------------------------
 *
 * Method
 *
 * -------------------------------- */

async function method({ manifestPath }: IOptions): Promise<Task> {
   const manifest = await loadManifest(manifestPath);

   return async ({ data, name, path }: IProps) => {
      const xmlDoc = await parseXMLDoc(data);

      console.log('CSPROJ', xmlDoc);

      return {
         [name]: undefined,
      };
   };
}

/* --------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { method };
