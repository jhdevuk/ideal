#! /usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build.ts":
/*!******************!*\
  !*** ./build.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst tasks_1 = __webpack_require__(/*! @/tasks */ \"./tasks/index.ts\");\r\nconst log = tslib_1.__importStar(__webpack_require__(/*! @/utility/logOutput */ \"./utility/logOutput.ts\"));\r\nconst loadConfig_1 = __webpack_require__(/*! @/utility/loadConfig */ \"./utility/loadConfig.ts\");\r\nconst validOptions_1 = __webpack_require__(/*! @/utility/validOptions */ \"./utility/validOptions.ts\");\r\nconst taskRunner_1 = __webpack_require__(/*! @/utility/taskRunner */ \"./utility/taskRunner.ts\");\r\n/* -----------------------------------\r\n *\r\n * Profiler\r\n *\r\n * -------------------------------- */\r\nprocess.on('warning', (e) => console.warn(e.stack));\r\n/* -----------------------------------\r\n *\r\n * Flags\r\n *\r\n * -------------------------------- */\r\nconst methodKey = process.argv[2] || '';\r\nconst sourcePath = process.argv[3] || '';\r\n/* -----------------------------------\r\n *\r\n * Validate\r\n *\r\n * -------------------------------- */\r\nif (!tasks_1.tasks[methodKey]) {\r\n    log.error('Unknown build task:', `\"${methodKey}\"`);\r\n    process.exit(1);\r\n}\r\n/* -----------------------------------\r\n *\r\n * Setup\r\n *\r\n * -------------------------------- */\r\nconst options = loadConfig_1.loadConfig(methodKey, sourcePath);\r\nconst runner = new taskRunner_1.TaskRunner(methodKey, options);\r\n/* -----------------------------------\r\n *\r\n * Validate\r\n *\r\n * -------------------------------- */\r\ntry {\r\n    validOptions_1.validOptions(options);\r\n}\r\ncatch ({ message }) {\r\n    log.error('Invalid arguments:', message);\r\n    process.exit(1);\r\n}\r\n/* -----------------------------------\r\n *\r\n * Execute\r\n *\r\n * -------------------------------- */\r\nrunner.start();\r\nrunner.watch();\r\n\n\n//# sourceURL=webpack:///./build.ts?");

/***/ }),

/***/ "./tasks/copy/index.ts":
/*!*****************************!*\
  !*** ./tasks/copy/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n/* -----------------------------------\r\n *\r\n * Method\r\n *\r\n * -------------------------------- */\r\nasync function method({ manifestPath }) {\r\n    return async ({ data, name }) => {\r\n        console.log('COPY', name);\r\n        return {};\r\n    };\r\n}\r\nexports.method = method;\r\n\n\n//# sourceURL=webpack:///./tasks/copy/index.ts?");

/***/ }),

/***/ "./tasks/csproj/index.ts":
/*!*******************************!*\
  !*** ./tasks/csproj/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst loadManifest_1 = __webpack_require__(/*! ./tools/loadManifest */ \"./tasks/csproj/tools/loadManifest.ts\");\r\nconst buildResult_1 = __webpack_require__(/*! ./tools/buildResult */ \"./tasks/csproj/tools/buildResult.ts\");\r\n/* -----------------------------------\r\n *\r\n * Method\r\n *\r\n * -------------------------------- */\r\nasync function method({ manifestPath }) {\r\n    const manifest = await loadManifest_1.loadManifest(manifestPath);\r\n    return async ({ data, name }) => {\r\n        const result = await buildResult_1.buildResult(manifestPath, manifest, data);\r\n        return {\r\n            [`${name}.csproj`]: result,\r\n        };\r\n    };\r\n}\r\nexports.method = method;\r\n\n\n//# sourceURL=webpack:///./tasks/csproj/index.ts?");

/***/ }),

/***/ "./tasks/csproj/tools/buildResult.ts":
/*!*******************************************!*\
  !*** ./tasks/csproj/tools/buildResult.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst libxmljs_1 = tslib_1.__importDefault(__webpack_require__(/*! libxmljs */ \"libxmljs\"));\r\nconst streamHelpers_1 = __webpack_require__(/*! @/utility/streamHelpers */ \"./utility/streamHelpers.ts\");\r\nconst parseXMLDoc_1 = __webpack_require__(/*! ./parseXMLDoc */ \"./tasks/csproj/tools/parseXMLDoc.ts\");\r\nconst config_1 = __webpack_require__(/*! ./config */ \"./tasks/csproj/tools/config.ts\");\r\n/* -----------------------------------\r\n *\r\n * Build\r\n *\r\n * -------------------------------- */\r\nasync function buildResult(manifestPath, manifest, data) {\r\n    const xmlDoc = await parseXMLDoc_1.parseXMLDoc(data);\r\n    const fileNames = Object.keys(manifest);\r\n    fileNames.forEach((file) => {\r\n        const element = new libxmljs_1.default.Element(xmlDoc, config_1.config.element);\r\n        element.attr(config_1.config.attribute, path_1.default.join(manifestPath, file));\r\n        xmlDoc.get(config_1.config.xpath, { xmlns: config_1.config.xmlns }).addChild(element);\r\n    });\r\n    return streamHelpers_1.stringToStream(xmlDoc.toString());\r\n}\r\nexports.buildResult = buildResult;\r\n\n\n//# sourceURL=webpack:///./tasks/csproj/tools/buildResult.ts?");

/***/ }),

/***/ "./tasks/csproj/tools/config.ts":
/*!**************************************!*\
  !*** ./tasks/csproj/tools/config.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/* -----------------------------------\r\n *\r\n * Config\r\n *\r\n * -------------------------------- */\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst config = {\r\n    xpath: '/xmlns:Project/xmlns:ItemGroup[xmlns:Content]',\r\n    xmlns: 'http://schemas.microsoft.com/developer/msbuild/2003',\r\n    element: 'Content',\r\n    attribute: 'Include',\r\n};\r\nexports.config = config;\r\n\n\n//# sourceURL=webpack:///./tasks/csproj/tools/config.ts?");

/***/ }),

/***/ "./tasks/csproj/tools/loadManifest.ts":
/*!********************************************!*\
  !*** ./tasks/csproj/tools/loadManifest.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst fs_1 = tslib_1.__importDefault(__webpack_require__(/*! fs */ \"fs\"));\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\n/* -----------------------------------\r\n *\r\n * Load\r\n *\r\n * -------------------------------- */\r\nfunction loadManifest(manifestPath) {\r\n    const filePath = path_1.default.resolve(manifestPath, 'assets.json');\r\n    return new Promise((resolve, reject) => {\r\n        fs_1.default.readFile(filePath, (error, data) => {\r\n            if (error) {\r\n                reject(error);\r\n                return;\r\n            }\r\n            resolve(JSON.parse(data.toString()));\r\n        });\r\n    });\r\n}\r\nexports.loadManifest = loadManifest;\r\n\n\n//# sourceURL=webpack:///./tasks/csproj/tools/loadManifest.ts?");

/***/ }),

/***/ "./tasks/csproj/tools/parseXMLDoc.ts":
/*!*******************************************!*\
  !*** ./tasks/csproj/tools/parseXMLDoc.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst libxmljs_1 = tslib_1.__importDefault(__webpack_require__(/*! libxmljs */ \"libxmljs\"));\r\nconst streamHelpers_1 = __webpack_require__(/*! @/utility/streamHelpers */ \"./utility/streamHelpers.ts\");\r\n/* -----------------------------------\r\n *\r\n * Parse\r\n *\r\n * -------------------------------- */\r\nasync function parseXMLDoc(data) {\r\n    const xmlContents = await streamHelpers_1.streamToString(data);\r\n    return libxmljs_1.default.parseXml(xmlContents);\r\n}\r\nexports.parseXMLDoc = parseXMLDoc;\r\n\n\n//# sourceURL=webpack:///./tasks/csproj/tools/parseXMLDoc.ts?");

/***/ }),

/***/ "./tasks/index.ts":
/*!************************!*\
  !*** ./tasks/index.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst sass_1 = __webpack_require__(/*! ./sass */ \"./tasks/sass/index.ts\");\r\nconst webpack_1 = __webpack_require__(/*! ./webpack */ \"./tasks/webpack/index.ts\");\r\nconst csproj_1 = __webpack_require__(/*! ./csproj */ \"./tasks/csproj/index.ts\");\r\nconst copy_1 = __webpack_require__(/*! ./copy */ \"./tasks/copy/index.ts\");\r\n/* -----------------------------------\r\n *\r\n * Tasks\r\n *\r\n * -------------------------------- */\r\nconst tasks = {\r\n    css: sass_1.method,\r\n    js: webpack_1.method,\r\n    csproj: csproj_1.method,\r\n    copy: copy_1.method,\r\n};\r\nexports.tasks = tasks;\r\n\n\n//# sourceURL=webpack:///./tasks/index.ts?");

/***/ }),

/***/ "./tasks/sass/index.ts":
/*!*****************************!*\
  !*** ./tasks/sass/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst bundleCompiler_1 = __webpack_require__(/*! ./tools/bundleCompiler */ \"./tasks/sass/tools/bundleCompiler.ts\");\r\n/* -----------------------------------\r\n *\r\n * Method\r\n *\r\n * -------------------------------- */\r\nasync function method(options) {\r\n    const compiler = bundleCompiler_1.bundleCompiler(options);\r\n    return async ({ data, name, path }) => {\r\n        let fileName = `${name}.css`;\r\n        const { cssValue, cssModule } = await compiler(data, path);\r\n        if (typeof options.renameFile === 'function') {\r\n            fileName = options.renameFile(fileName, path);\r\n        }\r\n        return {\r\n            [fileName]: cssValue,\r\n            [`${fileName}.json`]: cssModule,\r\n        };\r\n    };\r\n}\r\nexports.method = method;\r\n\n\n//# sourceURL=webpack:///./tasks/sass/index.ts?");

/***/ }),

/***/ "./tasks/sass/tools/bundleCompiler.ts":
/*!********************************************!*\
  !*** ./tasks/sass/tools/bundleCompiler.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst sassCompiler_1 = __webpack_require__(/*! ./sassCompiler */ \"./tasks/sass/tools/sassCompiler.ts\");\r\nconst cssProcessor_1 = __webpack_require__(/*! ./cssProcessor */ \"./tasks/sass/tools/cssProcessor.ts\");\r\nconst emitFile_1 = __webpack_require__(/*! ./emitFile */ \"./tasks/sass/tools/emitFile.ts\");\r\n/* -----------------------------------\r\n *\r\n * Bundle\r\n *\r\n * -------------------------------- */\r\nfunction bundleCompiler(options) {\r\n    const compiler = sassCompiler_1.sassCompiler(options);\r\n    const processor = cssProcessor_1.cssProcessor(options);\r\n    return async (data, path) => new Promise((resolve, reject) => data\r\n        .pipe(compiler(path, reject))\r\n        .pipe(processor(path, reject))\r\n        .pipe(emitFile_1.emitFile(resolve))\r\n        .on('error', reject));\r\n}\r\nexports.bundleCompiler = bundleCompiler;\r\n\n\n//# sourceURL=webpack:///./tasks/sass/tools/bundleCompiler.ts?");

/***/ }),

/***/ "./tasks/sass/tools/cssProcessor.ts":
/*!******************************************!*\
  !*** ./tasks/sass/tools/cssProcessor.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst postcss_1 = tslib_1.__importDefault(__webpack_require__(/*! postcss */ \"postcss\"));\r\nconst autoprefixer_1 = tslib_1.__importDefault(__webpack_require__(/*! autoprefixer */ \"autoprefixer\"));\r\nconst postcss_modules_1 = tslib_1.__importDefault(__webpack_require__(/*! postcss-modules */ \"postcss-modules\"));\r\nconst cssnano_1 = tslib_1.__importDefault(__webpack_require__(/*! cssnano */ \"cssnano\"));\r\nconst stream_1 = __webpack_require__(/*! stream */ \"stream\");\r\n/* -----------------------------------\r\n *\r\n * Processor\r\n *\r\n * -------------------------------- */\r\nfunction cssProcessor({ release, cssModules, sourceMap }) {\r\n    const plugins = [\r\n        autoprefixer_1.default({\r\n            cascade: false,\r\n            overrideBrowserslist: ['last 2 versions', '> 1%'],\r\n        }),\r\n    ];\r\n    if (cssModules) {\r\n        plugins.unshift(postcss_modules_1.default({\r\n            generateScopedName: release\r\n                ? '[hash:base64:8]'\r\n                : '[name]-[local]',\r\n        }));\r\n    }\r\n    if (release) {\r\n        plugins.push(cssnano_1.default());\r\n    }\r\n    const instance = postcss_1.default(plugins);\r\n    return (path, reject) => new stream_1.Transform({\r\n        objectMode: true,\r\n        transform: transformSource(instance, path, sourceMap),\r\n    }).on('error', reject);\r\n}\r\nexports.cssProcessor = cssProcessor;\r\n/* -----------------------------------\r\n *\r\n * Transfrom\r\n *\r\n * -------------------------------- */\r\nfunction transformSource(instance, path, sourceMap) {\r\n    return async function run(file) {\r\n        try {\r\n            const result = await instance.process(file.css, {\r\n                from: path,\r\n                map: sourceMap,\r\n            });\r\n            this.push(result);\r\n        }\r\n        catch (error) {\r\n            this.emit('error', error);\r\n        }\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./tasks/sass/tools/cssProcessor.ts?");

/***/ }),

/***/ "./tasks/sass/tools/emitFile.ts":
/*!**************************************!*\
  !*** ./tasks/sass/tools/emitFile.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst stream_1 = __webpack_require__(/*! stream */ \"stream\");\r\nconst streamHelpers_1 = __webpack_require__(/*! @/utility/streamHelpers */ \"./utility/streamHelpers.ts\");\r\n/* -----------------------------------\r\n *\r\n * Emit\r\n *\r\n * -------------------------------- */\r\nfunction emitFile(resolve) {\r\n    return new stream_1.Transform({\r\n        objectMode: true,\r\n        transform: ({ css, messages }) => resolve({\r\n            cssValue: streamHelpers_1.stringToStream(css),\r\n            cssModule: cssModule(messages),\r\n        }),\r\n    });\r\n}\r\nexports.emitFile = emitFile;\r\n/* -----------------------------------\r\n *\r\n * Modules\r\n *\r\n * -------------------------------- */\r\nfunction cssModule(messages) {\r\n    const pluginResult = messages.find((item) => item.plugin === 'postcss-modules');\r\n    const jsonResult = pluginResult === null || pluginResult === void 0 ? void 0 : pluginResult.exportTokens;\r\n    if (!jsonResult) {\r\n        return undefined;\r\n    }\r\n    return streamHelpers_1.stringToStream(JSON.stringify(jsonResult));\r\n}\r\n\n\n//# sourceURL=webpack:///./tasks/sass/tools/emitFile.ts?");

/***/ }),

/***/ "./tasks/sass/tools/sassCompiler.ts":
/*!******************************************!*\
  !*** ./tasks/sass/tools/sassCompiler.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst node_sass_1 = __webpack_require__(/*! node-sass */ \"node-sass\");\r\nconst stream_1 = __webpack_require__(/*! stream */ \"stream\");\r\n/* -----------------------------------\r\n *\r\n * Compiler\r\n *\r\n * -------------------------------- */\r\nfunction sassCompiler(options) {\r\n    return (path, reject) => new stream_1.Transform({\r\n        objectMode: true,\r\n        transform: transformSource(path, options),\r\n    }).on('error', reject);\r\n}\r\nexports.sassCompiler = sassCompiler;\r\n/* -----------------------------------\r\n *\r\n * Transform\r\n *\r\n * -------------------------------- */\r\nfunction transformSource(path, { sourceMap, includePath }) {\r\n    return function run(file) {\r\n        try {\r\n            const result = node_sass_1.renderSync({\r\n                data: file.toString(),\r\n                file: path,\r\n                includePaths: includePath ? includePath.split(',') : [],\r\n                sourceMap,\r\n                sourceMapEmbed: sourceMap,\r\n            });\r\n            this.push(result);\r\n        }\r\n        catch (error) {\r\n            this.emit('error', error);\r\n        }\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./tasks/sass/tools/sassCompiler.ts?");

/***/ }),

/***/ "./tasks/webpack/index.ts":
/*!********************************!*\
  !*** ./tasks/webpack/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst bundleCompiler_1 = __webpack_require__(/*! ./tools/bundleCompiler */ \"./tasks/webpack/tools/bundleCompiler.ts\");\r\n/* -----------------------------------\r\n *\r\n * Method\r\n *\r\n * -------------------------------- */\r\nasync function method(options) {\r\n    const compiler = bundleCompiler_1.bundleCompiler(options);\r\n    return async ({ data, path }) => {\r\n        const output = await compiler(data, path);\r\n        const result = output.reduce((prev, item) => {\r\n            prev[item.name] = item.data;\r\n            return prev;\r\n        }, {});\r\n        return result;\r\n    };\r\n}\r\nexports.method = method;\r\n\n\n//# sourceURL=webpack:///./tasks/webpack/index.ts?");

/***/ }),

/***/ "./tasks/webpack/tools/bundleCompiler.ts":
/*!***********************************************!*\
  !*** ./tasks/webpack/tools/bundleCompiler.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst vinyl_source_stream_1 = tslib_1.__importDefault(__webpack_require__(/*! vinyl-source-stream */ \"vinyl-source-stream\"));\r\nconst vinyl_named_1 = tslib_1.__importDefault(__webpack_require__(/*! vinyl-named */ \"vinyl-named\"));\r\nconst webpackCompiler_1 = __webpack_require__(/*! ./webpackCompiler */ \"./tasks/webpack/tools/webpackCompiler.ts\");\r\nconst streamHelpers_1 = __webpack_require__(/*! @/utility/streamHelpers */ \"./utility/streamHelpers.ts\");\r\n/* -----------------------------------\r\n *\r\n * Bundle\r\n *\r\n * -------------------------------- */\r\nfunction bundleCompiler(options) {\r\n    const compiler = webpackCompiler_1.webpackCompiler(options);\r\n    return (data, path) => new Promise((resolve, reject) => {\r\n        const result = [];\r\n        data\r\n            .pipe(vinyl_source_stream_1.default(path))\r\n            .pipe(vinyl_named_1.default())\r\n            .pipe(compiler())\r\n            .on('data', ({ basename, contents }) => {\r\n            result.push({\r\n                name: basename,\r\n                data: streamHelpers_1.stringToStream(contents),\r\n            });\r\n        })\r\n            .on('error', reject)\r\n            .on('close', () => resolve(result));\r\n    });\r\n}\r\nexports.bundleCompiler = bundleCompiler;\r\n\n\n//# sourceURL=webpack:///./tasks/webpack/tools/bundleCompiler.ts?");

/***/ }),

/***/ "./tasks/webpack/tools/resolveLoader.ts":
/*!**********************************************!*\
  !*** ./tasks/webpack/tools/resolveLoader.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst fs_1 = tslib_1.__importDefault(__webpack_require__(/*! fs */ \"fs\"));\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\n/* -----------------------------------\r\n *\r\n * Variables\r\n *\r\n * -------------------------------- */\r\nconst deepPath = 'node_modules/ideal-tools/node_modules';\r\n/* -----------------------------------\r\n *\r\n * Resolve\r\n *\r\n * -------------------------------- */\r\nfunction resolveLoader(name) {\r\n    if (fs_1.default.existsSync(`node_modules/${name}`)) {\r\n        return name;\r\n    }\r\n    return path_1.default.resolve(deepPath, name);\r\n}\r\nexports.resolveLoader = resolveLoader;\r\n\n\n//# sourceURL=webpack:///./tasks/webpack/tools/resolveLoader.ts?");

/***/ }),

/***/ "./tasks/webpack/tools/webpack.default.ts":
/*!************************************************!*\
  !*** ./tasks/webpack/tools/webpack.default.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst resolveLoader_1 = __webpack_require__(/*! ./resolveLoader */ \"./tasks/webpack/tools/resolveLoader.ts\");\r\n/* -----------------------------------\r\n *\r\n * Config\r\n *\r\n * -------------------------------- */\r\nfunction defaultWebpackConfig({ release, pathAlias, includePath, outputPath, }) {\r\n    return {\r\n        target: 'web',\r\n        mode: release ? 'production' : 'development',\r\n        cache: !release,\r\n        output: {\r\n            filename: '[name].js',\r\n            chunkFilename: '[name].js',\r\n            jsonpFunction: '__IDL__',\r\n            crossOriginLoading: 'anonymous',\r\n            publicPath: path_1.default.join(outputPath, '/'),\r\n        },\r\n        resolve: {\r\n            modules: [\r\n                'node_modules',\r\n                ...(includePath\r\n                    ? includePath.split(',').map((item) => path_1.default.resolve(item))\r\n                    : []),\r\n            ],\r\n            extensions: [\r\n                '.ts',\r\n                '.tsx',\r\n                '.js',\r\n                '.jsx',\r\n                '.json',\r\n                '.scss',\r\n                '.css',\r\n            ],\r\n            alias: {\r\n                ...(pathAlias ? { '@': path_1.default.resolve(pathAlias) } : {}),\r\n            },\r\n        },\r\n        module: {\r\n            rules: [\r\n                {\r\n                    test: /\\.tsx?$/,\r\n                    use: [\r\n                        {\r\n                            loader: resolveLoader_1.resolveLoader('ts-loader'),\r\n                        },\r\n                    ],\r\n                },\r\n            ],\r\n        },\r\n        optimization: {\r\n            mergeDuplicateChunks: true,\r\n            runtimeChunk: false,\r\n            splitChunks: {\r\n                name: true,\r\n                chunks: 'async',\r\n                cacheGroups: {\r\n                    default: false,\r\n                    vendor: {\r\n                        test: /[\\\\/]node_modules[\\\\/]/,\r\n                        name: 'vendor',\r\n                        enforce: true,\r\n                        chunks: 'all',\r\n                    },\r\n                },\r\n            },\r\n        },\r\n    };\r\n}\r\nexports.defaultWebpackConfig = defaultWebpackConfig;\r\n\n\n//# sourceURL=webpack:///./tasks/webpack/tools/webpack.default.ts?");

/***/ }),

/***/ "./tasks/webpack/tools/webpackCompiler.ts":
/*!************************************************!*\
  !*** ./tasks/webpack/tools/webpackCompiler.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst through_1 = tslib_1.__importDefault(__webpack_require__(/*! through */ \"through\"));\r\nconst webpackInstance_1 = __webpack_require__(/*! ./webpackInstance */ \"./tasks/webpack/tools/webpackInstance.ts\");\r\n/* -----------------------------------\r\n *\r\n * Compiler\r\n *\r\n * -------------------------------- */\r\nfunction webpackCompiler(options) {\r\n    const instance = new webpackInstance_1.WebpackInstance(options);\r\n    let handle = null;\r\n    return () => {\r\n        if (!handle) {\r\n            handle = createStream(instance);\r\n        }\r\n        handle.on('end', () => {\r\n            handle = null;\r\n        });\r\n        return handle;\r\n    };\r\n}\r\nexports.webpackCompiler = webpackCompiler;\r\n/* -----------------------------------\r\n *\r\n * Create\r\n *\r\n * -------------------------------- */\r\nfunction createStream(instance) {\r\n    const result = through_1.default(instance.onStreamWrite, function end() {\r\n        instance.onStreamEnd(this);\r\n    });\r\n    return result;\r\n}\r\n\n\n//# sourceURL=webpack:///./tasks/webpack/tools/webpackCompiler.ts?");

/***/ }),

/***/ "./tasks/webpack/tools/webpackInstance.ts":
/*!************************************************!*\
  !*** ./tasks/webpack/tools/webpackInstance.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst webpack_1 = tslib_1.__importDefault(__webpack_require__(/*! webpack */ \"webpack\"));\r\nconst fancy_log_1 = tslib_1.__importDefault(__webpack_require__(/*! fancy-log */ \"fancy-log\"));\r\nconst memory_fs_1 = tslib_1.__importDefault(__webpack_require__(/*! memory-fs */ \"memory-fs\"));\r\nconst vinyl_1 = tslib_1.__importDefault(__webpack_require__(/*! vinyl */ \"vinyl\"));\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst runtimeRequire_1 = __webpack_require__(/*! @/utility/runtimeRequire */ \"./utility/runtimeRequire.ts\");\r\nconst webpack_default_1 = __webpack_require__(/*! ./webpack.default */ \"./tasks/webpack/tools/webpack.default.ts\");\r\n/* -----------------------------------\r\n *\r\n * Instance\r\n *\r\n * -------------------------------- */\r\nclass WebpackInstance {\r\n    constructor(options) {\r\n        this.options = options;\r\n        this.fileSystem = new memory_fs_1.default();\r\n        this.entry = {};\r\n        this.onStreamWrite = ({ named: name, path: filePath, }) => {\r\n            if (!this.entry[name]) {\r\n                this.entry[name] = [];\r\n            }\r\n            this.entry[name].push(filePath);\r\n        };\r\n        this.onStreamEnd = (stream) => {\r\n            const config = this.getWebpackConfig();\r\n            if (!this.instance) {\r\n                this.instance = webpack_1.default(config);\r\n            }\r\n            this.instance.run(this.onComplete(stream));\r\n            this.onAfterEmit(stream);\r\n        };\r\n        this.onComplete = (stream) => (error, stats) => {\r\n            if (error) {\r\n                stream.emit('error', error);\r\n                return;\r\n            }\r\n            fancy_log_1.default.info(stats.toString({\r\n                colors: true,\r\n            }));\r\n            stream.emit('end');\r\n        };\r\n        this.onTapAsync = (stream, { assets }, callback) => {\r\n            const fileNames = Object.keys(assets);\r\n            for (const name of fileNames) {\r\n                if (!assets[name].emitted) {\r\n                    continue;\r\n                }\r\n                const file = this.prepareFile(name);\r\n                stream.queue(file);\r\n            }\r\n            callback();\r\n        };\r\n    }\r\n    onAfterEmit(stream) {\r\n        const { instance, fileSystem } = this;\r\n        instance.outputFileSystem = fileSystem;\r\n        // Webpack 4 API\r\n        instance.hooks.afterEmit.tapAsync('WebpackStream', (compilation, callback) => this.onTapAsync(stream, compilation, callback));\r\n    }\r\n    getWebpackConfig() {\r\n        const { options, entry, config } = this;\r\n        if (config) {\r\n            return config;\r\n        }\r\n        let configObject;\r\n        try {\r\n            configObject = runtimeRequire_1.runtimeRequire('./webpack.config.js');\r\n        }\r\n        catch (error) {\r\n            configObject = webpack_default_1.defaultWebpackConfig(options);\r\n        }\r\n        return (this.config = { ...configObject, entry });\r\n    }\r\n    prepareFile(name) {\r\n        const { instance, fileSystem } = this;\r\n        let filePath = fileSystem.join(instance.outputPath, name);\r\n        if (filePath.indexOf('?') !== -1) {\r\n            filePath = filePath.split('?')[0];\r\n        }\r\n        const contents = fileSystem.readFileSync(filePath);\r\n        const file = new vinyl_1.default({\r\n            base: instance.outputPath,\r\n            path: path_1.default.join(instance.outputPath, name),\r\n            contents,\r\n        });\r\n        return file;\r\n    }\r\n}\r\nexports.WebpackInstance = WebpackInstance;\r\n\n\n//# sourceURL=webpack:///./tasks/webpack/tools/webpackInstance.ts?");

/***/ }),

/***/ "./utility/flattenArray.ts":
/*!*********************************!*\
  !*** ./utility/flattenArray.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/* -----------------------------------\r\n *\r\n * Flatten\r\n *\r\n * -------------------------------- */\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nfunction flattenArray(arrays) {\r\n    return [].concat.apply([], arrays);\r\n}\r\nexports.flattenArray = flattenArray;\r\n\n\n//# sourceURL=webpack:///./utility/flattenArray.ts?");

/***/ }),

/***/ "./utility/getResultFileName.ts":
/*!**************************************!*\
  !*** ./utility/getResultFileName.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n/* -----------------------------------\r\n *\r\n * getResultFileName\r\n *\r\n * -------------------------------- */\r\nfunction getResultFileName({ name, type, hash, prefix }) {\r\n    const hashPart = hash ? `.${hash}` : '';\r\n    let result = name + hashPart + type;\r\n    if (prefix) {\r\n        result = `${prefix}-${result}`;\r\n    }\r\n    return result;\r\n}\r\nexports.getResultFileName = getResultFileName;\r\n\n\n//# sourceURL=webpack:///./utility/getResultFileName.ts?");

/***/ }),

/***/ "./utility/getStreamFileNames.ts":
/*!***************************************!*\
  !*** ./utility/getStreamFileNames.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\n/* -----------------------------------\r\n *\r\n * Names\r\n *\r\n * -------------------------------- */\r\nfunction getStreamFileNames(files) {\r\n    return files.map(getStreamFileName);\r\n}\r\nexports.getStreamFileNames = getStreamFileNames;\r\n/* -----------------------------------\r\n *\r\n * Name\r\n *\r\n * -------------------------------- */\r\nfunction getStreamFileName({ path: filePath }) {\r\n    const { name } = path_1.default.parse(filePath);\r\n    return name;\r\n}\r\nexports.getStreamFileName = getStreamFileName;\r\n\n\n//# sourceURL=webpack:///./utility/getStreamFileNames.ts?");

/***/ }),

/***/ "./utility/hashFileNames.ts":
/*!**********************************!*\
  !*** ./utility/hashFileNames.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst streamHelpers_1 = __webpack_require__(/*! @/utility/streamHelpers */ \"./utility/streamHelpers.ts\");\r\nconst hasha_1 = tslib_1.__importDefault(__webpack_require__(/*! hasha */ \"hasha\"));\r\n/* -----------------------------------\r\n *\r\n * Hash\r\n *\r\n * -------------------------------- */\r\nasync function hashFileNames(resultData, applyHash) {\r\n    if (!applyHash) {\r\n        return resultData;\r\n    }\r\n    const { contents, streams } = await convertStreams(resultData.map(({ stream: data }) => data));\r\n    const hashData = contents.map((item) => hasha_1.default(item, { algorithm: 'md5' }).substr(0, 8));\r\n    const result = resultData.map((item, index) => ({\r\n        ...item,\r\n        stream: streams[index],\r\n        hash: hashData[index],\r\n    }));\r\n    return result;\r\n}\r\nexports.hashFileNames = hashFileNames;\r\n/* -----------------------------------\r\n *\r\n * Cache\r\n *\r\n * -------------------------------- */\r\nasync function convertStreams(data) {\r\n    const contents = await Promise.all(data.map((item) => streamHelpers_1.streamToString(item)));\r\n    const streams = contents.map((item) => streamHelpers_1.stringToStream(item));\r\n    return { contents, streams };\r\n}\r\n\n\n//# sourceURL=webpack:///./utility/hashFileNames.ts?");

/***/ }),

/***/ "./utility/loadConfig.ts":
/*!*******************************!*\
  !*** ./utility/loadConfig.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst yargs_1 = __webpack_require__(/*! yargs */ \"yargs\");\r\nconst runtimeRequire_1 = __webpack_require__(/*! @/utility/runtimeRequire */ \"./utility/runtimeRequire.ts\");\r\n/* -----------------------------------\r\n *\r\n * Default\r\n *\r\n * -------------------------------- */\r\nconst argumentOptions = {\r\n    sourceDirectory: yargs_1.argv.sourceDir || undefined,\r\n    release: !!yargs_1.argv.release,\r\n    outputPath: yargs_1.argv.outputPath || undefined,\r\n    sourceMap: !!yargs_1.argv.sourceMap,\r\n    cssModules: !!yargs_1.argv.cssModules,\r\n    watch: !!yargs_1.argv.watch,\r\n    watchPath: yargs_1.argv.watchPath || undefined,\r\n    verbose: !!yargs_1.argv.verbose,\r\n    pathAlias: yargs_1.argv.pathAlias,\r\n    filePrefix: yargs_1.argv.filePrefix || undefined,\r\n    includePath: yargs_1.argv.includePath || undefined,\r\n    skipManifest: !!yargs_1.argv.skipManifest,\r\n    manifestPath: (yargs_1.argv.manifestPath || yargs_1.argv.outputPath) || undefined,\r\n};\r\n/* -----------------------------------\r\n *\r\n * Load\r\n *\r\n * -------------------------------- */\r\nfunction loadConfig(methodKey, sourcePath) {\r\n    if (sourcePath.startsWith('--')) {\r\n        sourcePath = undefined;\r\n    }\r\n    try {\r\n        const { [methodKey]: localOptions = {} } = runtimeRequire_1.runtimeRequire(path_1.default.resolve('./ideal.config'));\r\n        const result = buildConfig(sourcePath, localOptions);\r\n        return result;\r\n    }\r\n    catch (error) {\r\n        return { ...argumentOptions, sourcePath };\r\n    }\r\n}\r\nexports.loadConfig = loadConfig;\r\n/* -----------------------------------\r\n *\r\n * Build\r\n *\r\n * -------------------------------- */\r\nfunction buildConfig(sourcePath, localOptions) {\r\n    const nonPrimary = ['skipManifest'];\r\n    const argKeys = Object.keys(argumentOptions).filter((key) => nonPrimary.indexOf(key));\r\n    const result = {\r\n        ...localOptions,\r\n        ...(sourcePath ? { sourcePath } : {}),\r\n    };\r\n    argKeys.forEach((key) => {\r\n        const value = argumentOptions[key];\r\n        if (value !== undefined) {\r\n            result[key] = value;\r\n        }\r\n    });\r\n    if (!result.manifestPath) {\r\n        result.manifestPath = result.outputPath;\r\n    }\r\n    return result;\r\n}\r\n\n\n//# sourceURL=webpack:///./utility/loadConfig.ts?");

/***/ }),

/***/ "./utility/logOutput.ts":
/*!******************************!*\
  !*** ./utility/logOutput.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst fancy_log_1 = tslib_1.__importDefault(__webpack_require__(/*! fancy-log */ \"fancy-log\"));\r\nconst chalk_1 = tslib_1.__importDefault(__webpack_require__(/*! chalk */ \"chalk\"));\r\n/* -----------------------------------\r\n *\r\n * Error\r\n *\r\n * -------------------------------- */\r\nfunction error(subject, details = '', line = '') {\r\n    fancy_log_1.default.error(`${chalk_1.default.red('Error')}: ${subject} ${chalk_1.default.yellow(details)} ${line && chalk_1.default.red(`on line ${line}`)}`);\r\n}\r\nexports.error = error;\r\n/* -----------------------------------\r\n *\r\n * Info\r\n *\r\n * -------------------------------- */\r\nfunction info(prefix, value, suffix = '') {\r\n    const output = [prefix, chalk_1.default.cyan(value), suffix];\r\n    fancy_log_1.default.info(output.join(' '));\r\n}\r\nexports.info = info;\r\n/* -----------------------------------\r\n *\r\n * Result\r\n *\r\n * -------------------------------- */\r\nfunction result({ name, size, type }) {\r\n    const output = [\r\n        chalk_1.default.grey(' ->'),\r\n        chalk_1.default.yellow(name + type),\r\n        chalk_1.default.grey(size),\r\n    ];\r\n    fancy_log_1.default.info(output.join(' '));\r\n}\r\nexports.result = result;\r\n\n\n//# sourceURL=webpack:///./utility/logOutput.ts?");

/***/ }),

/***/ "./utility/processStreams.ts":
/*!***********************************!*\
  !*** ./utility/processStreams.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst filesize_1 = tslib_1.__importDefault(__webpack_require__(/*! filesize */ \"filesize\"));\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst flattenArray_1 = __webpack_require__(/*! @/utility/flattenArray */ \"./utility/flattenArray.ts\");\r\n/* -----------------------------------\r\n *\r\n * Process\r\n *\r\n * -------------------------------- */\r\nasync function processStreams(tasks, filePrefix) {\r\n    const streams = await Promise.all(tasks);\r\n    const result = simplifyStreams(streams, filePrefix);\r\n    return result;\r\n}\r\nexports.processStreams = processStreams;\r\n/* -----------------------------------\r\n *\r\n * Simplify\r\n *\r\n * -------------------------------- */\r\nfunction simplifyStreams(streams, filePrefix) {\r\n    const formatItems = streams\r\n        .map((item) => Object.keys(item))\r\n        .map((item, index) => item.map((name) => formatResult(streams[index], name, filePrefix)));\r\n    const result = flattenArray_1.flattenArray(formatItems)\r\n        .filter((file, index, array) => array.findIndex(({ name, type }) => name === file.name && type === file.type) === index)\r\n        .filter(({ stream }) => !!stream);\r\n    return result;\r\n}\r\n/* -----------------------------------\r\n *\r\n * Format\r\n *\r\n * -------------------------------- */\r\nfunction formatResult(stream, name, filePrefix) {\r\n    const file = path_1.default.parse(name);\r\n    const data = stream[name];\r\n    return {\r\n        name: file.name,\r\n        type: file.ext,\r\n        hash: '',\r\n        prefix: filePrefix,\r\n        size: data && filesize_1.default(data.readableLength),\r\n        stream: data,\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./utility/processStreams.ts?");

/***/ }),

/***/ "./utility/readFile.ts":
/*!*****************************!*\
  !*** ./utility/readFile.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst fs_1 = __webpack_require__(/*! fs */ \"fs\");\r\n/* -----------------------------------\r\n *\r\n * Read\r\n *\r\n * -------------------------------- */\r\nfunction readFile(file, encoding = null) {\r\n    return fs_1.createReadStream(file, encoding);\r\n}\r\nexports.readFile = readFile;\r\n\n\n//# sourceURL=webpack:///./utility/readFile.ts?");

/***/ }),

/***/ "./utility/readGlobFiles.ts":
/*!**********************************!*\
  !*** ./utility/readGlobFiles.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst glob_1 = tslib_1.__importDefault(__webpack_require__(/*! glob */ \"glob\"));\r\n/* -----------------------------------\r\n *\r\n * Files\r\n *\r\n * -------------------------------- */\r\nconst readGlobFiles = (path) => new Promise((resolve, reject) => glob_1.default(path, async (error, files) => {\r\n    if (error) {\r\n        reject(error);\r\n        return;\r\n    }\r\n    resolve(files);\r\n}));\r\nexports.readGlobFiles = readGlobFiles;\r\n\n\n//# sourceURL=webpack:///./utility/readGlobFiles.ts?");

/***/ }),

/***/ "./utility/runtimeRequire.ts":
/*!***********************************!*\
  !*** ./utility/runtimeRequire.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/* -----------------------------------\r\n *\r\n * Webpack\r\n *\r\n * -------------------------------- */\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n/* -----------------------------------\r\n *\r\n * Runtime\r\n *\r\n * -------------------------------- */\r\nfunction runtimeRequire(path) {\r\n    const requireFunction =  true\r\n        ? require\r\n        : undefined;\r\n    return requireFunction(path);\r\n}\r\nexports.runtimeRequire = runtimeRequire;\r\n\n\n//# sourceURL=webpack:///./utility/runtimeRequire.ts?");

/***/ }),

/***/ "./utility/streamHelpers.ts":
/*!**********************************!*\
  !*** ./utility/streamHelpers.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst stream_1 = __webpack_require__(/*! stream */ \"stream\");\r\n/* -----------------------------------\r\n *\r\n * String\r\n *\r\n * -------------------------------- */\r\nfunction streamToString(readStream, encoding = 'utf8') {\r\n    const chunks = [];\r\n    return new Promise((resolve, reject) => {\r\n        readStream\r\n            .on('error', reject)\r\n            .on('data', (chunk) => chunks.push(chunk))\r\n            .on('end', () => resolve(Buffer.concat(chunks).toString(encoding)));\r\n    });\r\n}\r\nexports.streamToString = streamToString;\r\n/* -----------------------------------\r\n *\r\n * Stream\r\n *\r\n * -------------------------------- */\r\nfunction stringToStream(value, encoding = null) {\r\n    const readStream = new stream_1.Readable();\r\n    readStream.push(value, encoding);\r\n    readStream.push(null, encoding);\r\n    return readStream;\r\n}\r\nexports.stringToStream = stringToStream;\r\n/* -----------------------------------\r\n *\r\n * Buffer\r\n *\r\n * -------------------------------- */\r\nfunction bufferToStream(binary) {\r\n    const readStream = new stream_1.Readable({\r\n        read() {\r\n            this.push(binary);\r\n            this.push(null);\r\n        },\r\n    });\r\n    return readStream;\r\n}\r\nexports.bufferToStream = bufferToStream;\r\n\n\n//# sourceURL=webpack:///./utility/streamHelpers.ts?");

/***/ }),

/***/ "./utility/taskRunner.ts":
/*!*******************************!*\
  !*** ./utility/taskRunner.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst chokidar_1 = tslib_1.__importDefault(__webpack_require__(/*! chokidar */ \"chokidar\"));\r\nconst pretty_ms_1 = tslib_1.__importDefault(__webpack_require__(/*! pretty-ms */ \"pretty-ms\"));\r\nconst mkdirp_1 = tslib_1.__importDefault(__webpack_require__(/*! mkdirp */ \"mkdirp\"));\r\nconst is_glob_1 = tslib_1.__importDefault(__webpack_require__(/*! is-glob */ \"is-glob\"));\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst tasks_1 = __webpack_require__(/*! @/tasks */ \"./tasks/index.ts\");\r\nconst log = tslib_1.__importStar(__webpack_require__(/*! @/utility/logOutput */ \"./utility/logOutput.ts\"));\r\nconst readFile_1 = __webpack_require__(/*! @/utility/readFile */ \"./utility/readFile.ts\");\r\nconst readGlobFiles_1 = __webpack_require__(/*! @/utility/readGlobFiles */ \"./utility/readGlobFiles.ts\");\r\nconst getStreamFileNames_1 = __webpack_require__(/*! @/utility/getStreamFileNames */ \"./utility/getStreamFileNames.ts\");\r\nconst processStreams_1 = __webpack_require__(/*! @/utility/processStreams */ \"./utility/processStreams.ts\");\r\nconst hashFileNames_1 = __webpack_require__(/*! @/utility/hashFileNames */ \"./utility/hashFileNames.ts\");\r\nconst writeStreams_1 = __webpack_require__(/*! @/utility/writeStreams */ \"./utility/writeStreams.ts\");\r\nconst writeManifest_1 = __webpack_require__(/*! @/utility/writeManifest */ \"./utility/writeManifest.ts\");\r\n/* -----------------------------------\r\n *\r\n * Runner\r\n *\r\n * -------------------------------- */\r\nclass TaskRunner {\r\n    constructor(methodKey, options) {\r\n        this.methodKey = methodKey;\r\n        this.options = options;\r\n    }\r\n    async start() {\r\n        const { options } = this;\r\n        const filePaths = await this.readPaths();\r\n        if (!filePaths.length) {\r\n            log.error('No matching files for', options.sourcePath);\r\n            return;\r\n        }\r\n        await mkdirp_1.default(options.outputPath);\r\n        await this.setMethod();\r\n        await this.taskMethod();\r\n    }\r\n    async watch() {\r\n        const { sourcePath, watch, watchPath, outputPath } = this.options;\r\n        if (!watch) {\r\n            return;\r\n        }\r\n        chokidar_1.default\r\n            .watch(watchPath || sourcePath, {\r\n            atomic: false,\r\n            ignored: [outputPath],\r\n        })\r\n            .on('change', () => this.taskMethod());\r\n    }\r\n    async readPaths() {\r\n        const { sourceDirectory, sourcePath } = this.options;\r\n        const fullPath = path_1.default.join(sourceDirectory || '', sourcePath);\r\n        this.filePaths = [fullPath];\r\n        if (is_glob_1.default(sourcePath)) {\r\n            this.filePaths = await readGlobFiles_1.readGlobFiles(fullPath);\r\n        }\r\n        return this.filePaths;\r\n    }\r\n    async setMethod() {\r\n        const { methodKey, options } = this;\r\n        try {\r\n            const method = await tasks_1.tasks[methodKey](options);\r\n            this.taskMethod = () => this.runTask(method);\r\n        }\r\n        catch ({ message, file, line }) {\r\n            log.error(message, file, line);\r\n            process.exit(1);\r\n        }\r\n    }\r\n    async runTask(method) {\r\n        const { options, filePaths, taskRunning } = this;\r\n        if (taskRunning) {\r\n            return;\r\n        }\r\n        this.taskRunning = true;\r\n        this.logRunTime('start');\r\n        const files = filePaths.map((item) => readFile_1.readFile(item));\r\n        const streams = files.map((data, index) => method({\r\n            data,\r\n            path: filePaths[index],\r\n            name: getStreamFileNames_1.getStreamFileName(data),\r\n        }));\r\n        let result = [];\r\n        try {\r\n            result = await this.processTasks(streams);\r\n        }\r\n        catch ({ message, file, line }) {\r\n            log.error(message, file, line);\r\n            process.exit(1);\r\n        }\r\n        if (options.verbose) {\r\n            result.forEach(log.result);\r\n        }\r\n        this.taskRunning = false;\r\n        this.logRunTime('end');\r\n    }\r\n    logRunTime(type) {\r\n        const { methodKey } = this;\r\n        const timeValue = new Date().getTime();\r\n        if (type === 'start') {\r\n            this.startTime = timeValue;\r\n            log.info('Running', methodKey, `task...`);\r\n            return;\r\n        }\r\n        const duration = pretty_ms_1.default(new Date().getTime() - this.startTime);\r\n        log.info('Finished', methodKey, `after ${duration}`);\r\n    }\r\n    async processTasks(streams) {\r\n        const { release, outputPath, filePrefix, skipManifest, manifestPath, } = this.options;\r\n        let result = [];\r\n        result = await processStreams_1.processStreams(streams, filePrefix);\r\n        result = await hashFileNames_1.hashFileNames(result, release);\r\n        result = await writeStreams_1.writeStreams(result, outputPath);\r\n        if (!skipManifest) {\r\n            result = await writeManifest_1.writeManifest(result, manifestPath);\r\n        }\r\n        return result;\r\n    }\r\n}\r\nexports.TaskRunner = TaskRunner;\r\n\n\n//# sourceURL=webpack:///./utility/taskRunner.ts?");

/***/ }),

/***/ "./utility/validOptions.ts":
/*!*********************************!*\
  !*** ./utility/validOptions.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst is_glob_1 = tslib_1.__importDefault(__webpack_require__(/*! is-glob */ \"is-glob\"));\r\nconst fs_1 = tslib_1.__importDefault(__webpack_require__(/*! fs */ \"fs\"));\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\n/* -----------------------------------\r\n *\r\n * Validate\r\n *\r\n * -------------------------------- */\r\nfunction validOptions({ sourceDirectory = '', sourcePath, outputPath, watchPath, }) {\r\n    if (!is_glob_1.default(sourcePath) &&\r\n        !fs_1.default.existsSync(path_1.default.join(sourceDirectory, sourcePath))) {\r\n        throw new Error(`Invalid source path: \"${sourcePath}\"`);\r\n    }\r\n    if (!outputPath || (outputPath && !fs_1.default.existsSync(outputPath))) {\r\n        throw new Error(`Missing output path \"${outputPath}\"`);\r\n    }\r\n    if (watchPath && !is_glob_1.default(watchPath)) {\r\n        throw new Error(`Incorrectly formatted \"${watchPath}\"`);\r\n    }\r\n    return true;\r\n}\r\nexports.validOptions = validOptions;\r\n\n\n//# sourceURL=webpack:///./utility/validOptions.ts?");

/***/ }),

/***/ "./utility/writeFile.ts":
/*!******************************!*\
  !*** ./utility/writeFile.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst fs_1 = tslib_1.__importDefault(__webpack_require__(/*! fs */ \"fs\"));\r\n/* -----------------------------------\r\n *\r\n * Write\r\n *\r\n * -------------------------------- */\r\nasync function writeFile(filePath, readStream, encoding = 'utf8') {\r\n    const writeStream = fs_1.default.createWriteStream(filePath, encoding);\r\n    return new Promise(async (resolve, reject) => {\r\n        readStream.pipe(writeStream).on('finish', resolve);\r\n        writeStream.on('error', reject);\r\n    });\r\n}\r\nexports.writeFile = writeFile;\r\n\n\n//# sourceURL=webpack:///./utility/writeFile.ts?");

/***/ }),

/***/ "./utility/writeManifest.ts":
/*!**********************************!*\
  !*** ./utility/writeManifest.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst fs_1 = tslib_1.__importDefault(__webpack_require__(/*! fs */ \"fs\"));\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst getResultFileName_1 = __webpack_require__(/*! @/utility/getResultFileName */ \"./utility/getResultFileName.ts\");\r\nconst streamHelpers_1 = __webpack_require__(/*! @/utility/streamHelpers */ \"./utility/streamHelpers.ts\");\r\nconst writeFile_1 = __webpack_require__(/*! @/utility/writeFile */ \"./utility/writeFile.ts\");\r\n/* -----------------------------------\r\n *\r\n * Write\r\n *\r\n * -------------------------------- */\r\nasync function writeManifest(streams, manifestPath) {\r\n    const outputPath = path_1.default.join(manifestPath, 'assets.json');\r\n    const currentManifest = await loadManifest(outputPath);\r\n    const buildAssets = streams.reduce((result, item) => {\r\n        result[item.name + item.type] = getResultFileName_1.getResultFileName(item);\r\n        return result;\r\n    }, {});\r\n    const updatedManifest = streamHelpers_1.stringToStream(JSON.stringify({ ...currentManifest, ...buildAssets }));\r\n    await writeFile_1.writeFile(outputPath, updatedManifest);\r\n    return streams;\r\n}\r\nexports.writeManifest = writeManifest;\r\n/* -----------------------------------\r\n *\r\n * loadManifest\r\n *\r\n * -------------------------------- */\r\nconst loadManifest = (manifestPath) => new Promise((resolve, reject) => fs_1.default.readFile(manifestPath, (error, data) => {\r\n    let jsonData = {};\r\n    if (error || !data) {\r\n        resolve({});\r\n        return;\r\n    }\r\n    try {\r\n        jsonData = JSON.parse(data.toString());\r\n    }\r\n    catch (_a) {\r\n        // no-op\r\n    }\r\n    resolve(jsonData);\r\n}));\r\n\n\n//# sourceURL=webpack:///./utility/writeManifest.ts?");

/***/ }),

/***/ "./utility/writeStreams.ts":
/*!*********************************!*\
  !*** ./utility/writeStreams.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = __webpack_require__(/*! tslib */ \"tslib\");\r\nconst path_1 = tslib_1.__importDefault(__webpack_require__(/*! path */ \"path\"));\r\nconst getResultFileName_1 = __webpack_require__(/*! @/utility/getResultFileName */ \"./utility/getResultFileName.ts\");\r\nconst writeFile_1 = __webpack_require__(/*! @/utility/writeFile */ \"./utility/writeFile.ts\");\r\n/* -----------------------------------\r\n *\r\n * Write\r\n *\r\n * -------------------------------- */\r\nasync function writeStreams(streams, outputPath) {\r\n    await Promise.all(streams.map((result) => writeFile_1.writeFile(path_1.default.join(outputPath, getResultFileName_1.getResultFileName(result)), result.stream)));\r\n    return streams;\r\n}\r\nexports.writeStreams = writeStreams;\r\n\n\n//# sourceURL=webpack:///./utility/writeStreams.ts?");

/***/ }),

/***/ "autoprefixer":
/*!*******************************!*\
  !*** external "autoprefixer" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"autoprefixer\");\n\n//# sourceURL=webpack:///external_%22autoprefixer%22?");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chalk\");\n\n//# sourceURL=webpack:///external_%22chalk%22?");

/***/ }),

/***/ "chokidar":
/*!***************************!*\
  !*** external "chokidar" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"chokidar\");\n\n//# sourceURL=webpack:///external_%22chokidar%22?");

/***/ }),

/***/ "cssnano":
/*!**************************!*\
  !*** external "cssnano" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cssnano\");\n\n//# sourceURL=webpack:///external_%22cssnano%22?");

/***/ }),

/***/ "fancy-log":
/*!****************************!*\
  !*** external "fancy-log" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fancy-log\");\n\n//# sourceURL=webpack:///external_%22fancy-log%22?");

/***/ }),

/***/ "filesize":
/*!***************************!*\
  !*** external "filesize" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"filesize\");\n\n//# sourceURL=webpack:///external_%22filesize%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"glob\");\n\n//# sourceURL=webpack:///external_%22glob%22?");

/***/ }),

/***/ "hasha":
/*!************************!*\
  !*** external "hasha" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"hasha\");\n\n//# sourceURL=webpack:///external_%22hasha%22?");

/***/ }),

/***/ "is-glob":
/*!**************************!*\
  !*** external "is-glob" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"is-glob\");\n\n//# sourceURL=webpack:///external_%22is-glob%22?");

/***/ }),

/***/ "libxmljs":
/*!***************************!*\
  !*** external "libxmljs" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"libxmljs\");\n\n//# sourceURL=webpack:///external_%22libxmljs%22?");

/***/ }),

/***/ "memory-fs":
/*!****************************!*\
  !*** external "memory-fs" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"memory-fs\");\n\n//# sourceURL=webpack:///external_%22memory-fs%22?");

/***/ }),

/***/ "mkdirp":
/*!*************************!*\
  !*** external "mkdirp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mkdirp\");\n\n//# sourceURL=webpack:///external_%22mkdirp%22?");

/***/ }),

/***/ "node-sass":
/*!****************************!*\
  !*** external "node-sass" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-sass\");\n\n//# sourceURL=webpack:///external_%22node-sass%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "postcss":
/*!**************************!*\
  !*** external "postcss" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"postcss\");\n\n//# sourceURL=webpack:///external_%22postcss%22?");

/***/ }),

/***/ "postcss-modules":
/*!**********************************!*\
  !*** external "postcss-modules" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"postcss-modules\");\n\n//# sourceURL=webpack:///external_%22postcss-modules%22?");

/***/ }),

/***/ "pretty-ms":
/*!****************************!*\
  !*** external "pretty-ms" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pretty-ms\");\n\n//# sourceURL=webpack:///external_%22pretty-ms%22?");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"stream\");\n\n//# sourceURL=webpack:///external_%22stream%22?");

/***/ }),

/***/ "through":
/*!**************************!*\
  !*** external "through" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"through\");\n\n//# sourceURL=webpack:///external_%22through%22?");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"tslib\");\n\n//# sourceURL=webpack:///external_%22tslib%22?");

/***/ }),

/***/ "vinyl":
/*!************************!*\
  !*** external "vinyl" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"vinyl\");\n\n//# sourceURL=webpack:///external_%22vinyl%22?");

/***/ }),

/***/ "vinyl-named":
/*!******************************!*\
  !*** external "vinyl-named" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"vinyl-named\");\n\n//# sourceURL=webpack:///external_%22vinyl-named%22?");

/***/ }),

/***/ "vinyl-source-stream":
/*!**************************************!*\
  !*** external "vinyl-source-stream" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"vinyl-source-stream\");\n\n//# sourceURL=webpack:///external_%22vinyl-source-stream%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "yargs":
/*!************************!*\
  !*** external "yargs" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"yargs\");\n\n//# sourceURL=webpack:///external_%22yargs%22?");

/***/ })

/******/ });