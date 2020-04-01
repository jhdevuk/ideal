import hash from 'hasha';
import { IOptions } from '@/options';
import { IResult } from '@/tasks';
import { flattenArray } from '@/utility/flattenArray';

/* -----------------------------------
 *
 * Hash
 *
 * -------------------------------- */

async function hashFileNames(
   streams: IResult[],
   applyHash: boolean
): Promise<IResult[]> {
   return streams;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { hashFileNames };
