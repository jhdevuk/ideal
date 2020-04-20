`ideal` is a collection of tools used to generate client side assets, wrapped up in an easy to use CLI. It currently supports both `TypeScript` and `SASS`.

# Getting Started

To install `ideal`, run the following in the root of your project:

`yarn add {tbd}` or `npm install {tbd}`

This package can also be installed globally.

# Basic Usage

`ideal` comes preconfigured to generate assets via a [glob](https://www.npmjs.com/package/glob) path, and outputs in the relative directory `./dist`. This can be configured however with a contextual config file, outlined below.

Try it out:

```
$ ideal build:js ./src/*.ts
$ ideal build:css ./src/*.scss
```

# Configuration

You can configure each build task either via CLI arguments, or with an `ideal.config.js` file, located relative to where `ideal` is being run from.

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

## CLI Arguments

Arguments are passed to `ideal` via the following pattern: `--{key}={value}`. Where arguments are `boolean`, no value is required and their presence consistutes `true`.

See below for full list of configurable options:

TBD