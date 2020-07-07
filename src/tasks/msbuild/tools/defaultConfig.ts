/* -----------------------------------
 *
 * Config
 *
 * -------------------------------- */

const msbuildConfig = {
  configuration: 'Debug',
  nuget: 'C:/tools/nuget.exe',
  platform: 'Any CPU',
  targets: ['Build'],
  toolsVersion: '16.0',
  errorsOnly: true,
};

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { msbuildConfig };
