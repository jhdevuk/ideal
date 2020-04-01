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

   const hash = await Promise.all(streams.map((item) => item.hash));

   console.log(streams);
   // console.log(hash);

   return streams;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { hashFileNames };
