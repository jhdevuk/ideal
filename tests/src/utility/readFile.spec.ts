import { createReadStream } from 'fs';

/* -----------------------------------
 *
 * Subject
 *
 * -------------------------------- */

import { readFile } from '@/utility/readFile';

/* -----------------------------------
 *
 * Mocks
 *
 * -------------------------------- */

jest.mock('fs', () => ({ createReadStream: jest.fn(() => 'stream') }));

/* -----------------------------------
 *
 * Test
 *
 * -------------------------------- */

describe('Utility:readFile', () => {
  const filePath = '/path/file.csv';

  it('can faltten a two dimensional array', () => {
    const result = readFile(filePath);

    expect(createReadStream).toBeCalledWith(filePath, null);
    expect(result).toEqual('stream');
  });
});
