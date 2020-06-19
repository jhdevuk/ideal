import fs from 'fs';
import path from 'path';
import { IResult } from '@/tasks';
import { getResultFileName } from '@/utility/getResultFileName';
import { stringToStream } from '@/utility/streamHelpers';
import { writeFile } from '@/utility/writeFile';

/* -----------------------------------
 *
 * Write
 *
 * -------------------------------- */

async function writeManifest(
   streams: IResult[],
   manifestPath: string
): Promise<IResult[]> {
   const outputPath = path.join(manifestPath, 'assets.json');
   const currentManifest = await loadManifest(outputPath);

   const buildAssets = streams.reduce((result, item) => {
      result[item.name + item.type] = getResultFileName(item);

      return result;
   }, {});

   const updatedManifest = stringToStream(
      JSON.stringify({ ...currentManifest, ...buildAssets })
   );

   await writeFile(outputPath, updatedManifest);

   return streams;
}

/* -----------------------------------
 *
 * loadManifest
 *
 * -------------------------------- */

const loadManifest = (manifestPath: string): Promise<object> =>
   new Promise((resolve, reject) =>
      fs.readFile(manifestPath, (error, data) => {
         let jsonData = {};

         if (error || !data) {
            resolve({});

            return;
         }

         try {
            jsonData = JSON.parse(data.toString());
         } catch {
            // no-op
         }

         resolve(jsonData);
      })
   );

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { writeManifest };
