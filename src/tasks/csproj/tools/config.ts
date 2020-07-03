/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

const config = {
  xpath: '/xmlns:Project/xmlns:ItemGroup[xmlns:Content]',
  xmlns: 'http://schemas.microsoft.com/developer/msbuild/2003',
  element: 'Content',
  attribute: 'Include',
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { config };
