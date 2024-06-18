"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const generator_1 = __importDefault(require("@statoscope/stats-extension-compressed/dist/generator"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { author, homepage, name, version, description } = require('../package.json');
const pluginName = `${name}@${version}`;
class WebpackCompressedExtension {
    constructor(compressor) {
        this.compressor = compressor;
        this.descriptor = { name, version, author, homepage, description };
        this.compressedExtensionGenerator = new generator_1.default(this.descriptor);
    }
    getExtension() {
        return this.compressedExtensionGenerator.get();
    }
    handleCompiler(compiler) {
        compiler.hooks.done.tapAsync(pluginName, async (stats, cb) => {
            const stack = [stats.compilation];
            let cursor;
            while ((cursor = stack.pop())) {
                stack.push(...cursor.children);
                // webpack 4
                let readFile = (0, util_1.promisify)(cursor.compiler.inputFileSystem.readFile.bind(cursor.compiler.inputFileSystem));
                // webpack 5
                if (cursor.compiler.outputFileSystem &&
                    typeof cursor.compiler.outputFileSystem.readFile === 'function') {
                    readFile = (0, util_1.promisify)(cursor.compiler.outputFileSystem.readFile.bind(cursor.compiler.outputFileSystem));
                }
                for (const name of Object.keys(cursor.assets)) {
                    const assetPath = path_1.default.join(cursor.compiler.outputPath, name);
                    let content;
                    try {
                        content = await readFile(assetPath);
                        if (!content) {
                            throw new Error();
                        }
                        this.compressedExtensionGenerator.handleResource(cursor.hash, name, content, this.compressor);
                    }
                    catch (e) {
                        console.warn(`Can't read the asset ${name}`);
                    }
                }
                const modulesStack = [...cursor.modules];
                let modulesCursor;
                while ((modulesCursor = modulesStack.pop())) {
                    // @ts-ignore
                    if (modulesCursor.modules) {
                        // @ts-ignore
                        modulesStack.push(...modulesCursor.modules);
                    }
                    let concatenated = Buffer.from('');
                    if (modulesCursor.constructor.name === 'CssModule' &&
                        // @ts-ignore
                        (typeof modulesCursor.content === 'string' ||
                            // @ts-ignore
                            modulesCursor.content instanceof Buffer)) {
                        this.compressedExtensionGenerator.handleResource(cursor.hash, modulesCursor.identifier(), 
                        // @ts-ignore
                        modulesCursor.content, this.compressor);
                    }
                    else if (cursor.chunkGraph) {
                        // webpack 5
                        for (const type of modulesCursor.getSourceTypes()) {
                            const runtimeChunk = cursor.chunkGraph
                                .getModuleChunks(modulesCursor)
                                .find((chunk) => chunk.runtime);
                            if (runtimeChunk) {
                                const source = cursor.codeGenerationResults.getSource(modulesCursor, runtimeChunk.runtime, type);
                                if (!source) {
                                    continue;
                                }
                                const content = source.source();
                                concatenated = Buffer.concat([
                                    concatenated,
                                    content instanceof Buffer ? content : Buffer.from(content),
                                ]);
                            }
                        }
                    }
                    else {
                        // webpack 4
                        try {
                            // @ts-ignore
                            const source = cursor.moduleTemplates.javascript.render(modulesCursor, cursor.dependencyTemplates, { chunk: modulesCursor.getChunks()[0] });
                            const content = source.source();
                            concatenated = Buffer.concat([
                                concatenated,
                                content instanceof Buffer ? content : Buffer.from(content),
                            ]);
                        }
                        catch (e) {
                            // in webpack 4 we can't generate source for all the modules :(
                        }
                    }
                    if (!concatenated.length) {
                        continue;
                    }
                    this.compressedExtensionGenerator.handleResource(cursor.hash, modulesCursor.identifier(), concatenated, this.compressor);
                }
            }
            cb();
        });
    }
}
exports.default = WebpackCompressedExtension;
//# sourceMappingURL=index.js.map