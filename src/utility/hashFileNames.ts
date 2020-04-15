import { IResult } from '@/tasks';

/* -----------------------------------
 *
 * Hash
 *
 * -------------------------------- */

async function hashFileNames(
   streams: IResult[],
   applyHash: boolean
): Promise<IResult[]> {
   if (!applyHash) {
      return streams;
   }

   console.log('HASH', streams);
   // console.log(hash);

   return streams;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { hashFileNames };
