/* -----------------------------------
 *
 * Nuget
 *
 * -------------------------------- */

function nugetArguments(nupkg: any, options: any) {
  const args = ['restore', nupkg];

  const withValues = [
    'source',
    'configFile',
    'packagesDirectory',
    'solutionDirectory',
    'msBuildVersion',
    'verbosity',
  ];

  const withoutValues = [
    'noCache',
    'requireConsent',
    'disableParallelProcessing',
  ];

  withValues.forEach((prop) => {
    const value = options[prop];

    if (value) {
      args.push('-' + prop);
      args.push(value);
    }
  });

  withoutValues.forEach((prop) => {
    const value = options[prop];

    if (value) {
      args.push('-' + prop);
    }
  });

  args.push('-noninteractive');

  return args;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { nugetArguments };
