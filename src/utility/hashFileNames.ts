import { Readable } from 'stream';
import getHash from 'hasha';
import { IResult } from '@/tasks';
import { streamToString, stringToStream } from '@/utility/streamHelpers';
import { isHashed } from '@/utility/isHashed';

/* -----------------------------------
 *
 * Hash
 *
 * -------------------------------- */

async function hashFileNames(
  resultData: IResult[],
  applyHash: boolean
): Promise<IResult[]> {
  if (!applyHash) {
    return resultData;
  }

  const { contents, streams } = await convertStreams(
    resultData.map(({ stream: data }) => data)
  );

  const hashData = contents.map((item) =>
    getHash(item, { algorithm: 'md5' }).substr(0, 8)
  );

  const result = resultData.map((item, index) => ({
    ...item,
    stream: streams[index],
    hash: !isHashed(item.name) && hashData[index],
  }));

  return result;
}

/* -----------------------------------
 *
 * Cache
 *
 * -------------------------------- */

async function convertStreams(data: Readable[]) {
  const contents = await Promise.all(
    data.map((item) => streamToString(item))
  );

  const streams = contents.map((item) => stringToStream(item));

  return { contents, streams };
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { hashFileNames };
