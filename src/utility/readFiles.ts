import glob from 'glob';

/* -----------------------------------
 *
 * Files
 *
 * -------------------------------- */

const readFiles = (path: string) =>
   new Promise((resolve, reject) =>
      glob(path, (error, files) => {
         if (error) {
            reject(error);

            return;
         }

         resolve(files);
      })
   );

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { readFiles };
