import { IResult } from '@/tasks';

/* -----------------------------------
 *
 * getResultFileName
 *
 * -------------------------------- */

function getResultFileName({ name, type, hash, prefix }: IResult) {
  const hashPart = hash ? `.${hash}` : '';

  let result = name + hashPart + type;

  if (prefix) {
    result = `${prefix}-${result}`;
  }

  return result;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { getResultFileName };
