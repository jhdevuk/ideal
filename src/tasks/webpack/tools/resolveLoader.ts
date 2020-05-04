import fs from 'fs';
import path from 'path';

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const deepPath = 'node_modules/ideal-tools/node_modules';

/* -----------------------------------
 *
 * Resolve
 *
 * -------------------------------- */

function resolveLoader(name: string) {
   if (fs.existsSync(`node_modules/${name}`)) {
      return name;
   }

   return path.resolve(deepPath, name);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { resolveLoader };
