import glob from 'glob';

/* -----------------------------------
 *
 * Files
 *
 * -------------------------------- */

const readGlobFiles = (path: string): Promise<string[]> =>
  new Promise((resolve, reject) =>
    glob(path, async (error, files) => {
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

export { readGlobFiles };
