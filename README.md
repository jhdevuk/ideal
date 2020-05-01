ideal is a collection of pre-existing tools for generating client assets, wrapped up in an easy to use CLI. It currently supports `TypeScript` and `SASS`. The tools used are as follows:

-  [webpack](https://webpack.js.org/) and [node-sass](https://github.com/sass/node-sass) for compilation.
-  ~~[jest](https://jestjs.io/) and [pupeteer](https://pptr.dev/) for unit and integration tests.~~ Coming soon
-  ~~[ts-lint](https://palantir.github.io/tslint/) and [stylelint](https://stylelint.io/) for linting.~~ Coming soon

# Getting Started

Install with npm:

```
npm install --save-dev ideal-tools
```

Install with yarn:

```
yarn add --dev ideal-tools
```

There are currently two "tasks" provided, `build:css` and `build:js`.

# Basic Usage

`ideal` uses a [glob](https://www.npmjs.com/package/glob) path to target files, and outputs, by default, in a relative directory: `./dist`. This can be configured with a contextual config file, outlined below.

Try it out:

```
$ ideal build:js ./src/*.ts
$ ideal build:css ./src/*.scss
```

# Configuration

You can configure each build task via CLI arguments, or with an `ideal.config.js` file, located relative to where `ideal` is being run from.

## CLI Arguments

Arguments are passed to `ideal` via the following pattern: `--{key}={value}`. Where arguments are `boolean`, no value is required and their presence consistutes `true`.

See below for full list of configurable options:

| Key          | Value             | About                                                           |
| ------------ | ----------------- | --------------------------------------------------------------- |
| --outputPath | Relative path     | A relative path to where you would like files to be written     |
| --release    | N/A               | Determine whether files are built for development or production |
| --sourceMap  | N/A               | Output source maps to built assets                              |
| --cssModules | N/A               | Hash class names and build a json map file                      |
| --watch      | N/A               | Watch files for changes                                         |
| --watchPath  | N/A               | Path to where source files are being watched                    |
| --verbose    | N/A               | Output more info in the console                                 |
| --pathAlias  | Relative path     | Define a path alias for webpack                                 |
| --filePrefix | Valid file string | Prepend this value to built assets, useful for versioning       |

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

This is then picked up at runtime by `ideal`. Each set of properties match their CLI equivelants, in value and casing.

### JavaScript Specific

The config file also allows you to pass in a local `webpack.config.js` file via a `localWebpackConfig` property in the `build:js` set of properties. This value _must_ be a function that returns a valid webpack config file. The function is passed all previously defined config options for convenience.

# Manifest

`ideal` creates an `assets.json` file in the output directory (`./dist` by default), that keeps a record of all assets built _so far_. Each subsequent run of `ideal` appends each file name as a property with the hashed or _real_ file name as a value. Each build overides previous asset names or declares new ones that don't yet exist. This file is intended to be ephermeral, e.g when running a production build with `--release`, this file should not exist in the output path. Equally the `assets.json` file should not be commited to your repository. This ensures that the file is an accurate reflection of the built files for the _currently_ provided source.

# Development

Once you've cloned this repo and run `yarn`, then `yarn start`, you can make use of [`npm link`](https://docs.npmjs.com/cli/link.html) to simulate how this package will work when installed globally. From there, you can run the following in a directory of your choice to run a build:

```
$ ideal build:js ./path/to/stuff --watch
```
