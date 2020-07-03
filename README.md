ideal is a collection of pre-existing tools for generating client assets, wrapped up in a CLI. It currently supports `TypeScript` and `SASS`. The tools used are as follows:

-  [webpack](https://webpack.js.org/) and [node-sass](https://github.com/sass/node-sass) for compilation.

# Getting Started

Install with Yarn:

```
$ yarn add --dev @grpn/ideal
```

Install with NPM:

```
$ npm i --save-dev @grpn/ideal
```

TypeScript v3.8 is a `peerDependency` of ideal, so ensure you have it setup with a root [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) and installed as a dependency of your project.

# Basic Usage

There are currently three "tasks" provided, `build:css`, `build:js` and `update:csproj`. ideal uses a [glob](https://www.npmjs.com/package/glob) path to target files, and outputs in a relative directory. This can be configured with a contextual config file, outlined below.

Try it out:

```
$ ideal build:js ./src/*.ts
$ ideal build:css ./src/*.scss
```

# Configuration

You can configure each build task via CLI arguments, or with an `ideal.config.js` file, located relative to where ideal is being run from.

## CLI Arguments

Arguments are passed to ideal via the following pattern: `--{key}={value}`. Where arguments are `boolean`, no value is required and their presence consistutes `true`.

See below for full list of configurable options:

| Key               | Value  | Default | About                                                                   |
| ----------------- | ------ | ------- | ----------------------------------------------------------------------- |
| --outputPath      | Path   | ./dist  | A relative path to where you would like files to be written             |
| --sourceDirectory | Path   | null    | A base directory to resolve all files from prior to sourcePath          |
| --sourcePath      | Path   | null    | The path to source files, this can also be provided as the 3rd argument |
| --release         | N/A    | false   | Determine whether files are built for development or production         |
| --sourceMap       | N/A    | false   | Output source maps to built assets                                      |
| --cssModules      | N/A    | false   | Hash class names and build a json map file                              |
| --watch           | N/A    | false   | Watch files for changes                                                 |
| --watchPath       | N/A    | null    | Path to where source files are being watched                            |
| --verbose         | N/A    | false   | Output more info in the console                                         |
| --pathAlias       | Path   | null    | Define a path alias for "@/" in webpack                                 |
| --filePrefix      | String | null    | Prepend this value to built assets, useful for versioning               |
| --includePath     | Path   | null    | Define source directory for file resolution                             |
| --skipManifest    | N/A    | false   | Exclude output files from being written to the manifest                 |
| --manifestPath    | Path   | null    | Path where the manifest json file will be, default to "--outputPath"    |

## Config File

The structure of the `ideal.config.js` file can be seen below. Each top level property key matches a particular build task, e.g `build:css`.

```
module.exports = {
   'build:css': {
      cssModules: true,
      watchPath: './src/**/*.scss',
      ...
   },
   'build:js': {
      watchPath: './src/**/*.ts,
      ...
   }
};
```

This is then picked up at runtime by ideal. Each set of properties match their CLI equivelants, in value and casing.

### Webpack Specific

ideal allows you to manually specify a `webpack.config.js` file in the root directory of where ideal is being run from. If this file is found, these values will be used, if not a default config will be used instead.

# Manifest

ideal creates an `assets.json` file in the output directory that keeps a record of all assets built _so far_. Each subsequent run of ideal appends each file name as a property with the hashed or _real_ file name as a value. Each build overides previous keys or declares new ones that don't yet exist. This file is intended to be ephermeral, e.g when running a production build with `--release`, this file should not exist in the output path. Equally the `assets.json` file should not be commited to your repository. This ensures that the file is an accurate reflection of the built files for the _currently_ provided source.

# Development

Once you've cloned this repo and run `yarn`, then `yarn start`, you can make use of [`npm link`](https://docs.npmjs.com/cli/link.html) to simulate how this package will work when installed globally. From there, you can run the following in a directory of your choice to run a build:

```
$ ideal build:js ./path/to/stuff --watch
```
