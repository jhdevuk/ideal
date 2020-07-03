import fs from 'fs';
import path from 'path';

/* -----------------------------------
 *
 * Load
 *
 * -------------------------------- */

function loadManifest(manifestPath: string): Promise<object> {
  const filePath = path.resolve(manifestPath, 'assets.json');

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject(error);

        return;
      }

      resolve(JSON.parse(data.toString()));
    });
  });
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { loadManifest };
