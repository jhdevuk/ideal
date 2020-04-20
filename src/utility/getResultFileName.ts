/* -----------------------------------
 *
 * getResultFileName
 *
 * -------------------------------- */

function getResultFileName(name: string, hash: string, type: string) {
   const hashPart = hash ? `.${hash}` : '';

   return name + hashPart + type;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { getResultFileName };
