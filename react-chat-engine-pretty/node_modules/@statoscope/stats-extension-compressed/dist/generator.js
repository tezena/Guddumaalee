"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_resolver_1 = __importDefault(require("@statoscope/helpers/dist/entity-resolver"));
const gzip_size_1 = __importDefault(require("gzip-size"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version, author, homepage, description } = require('../package.json');
const compressorByType = {
    gzip(source, filename, options) {
        var _a;
        const level = (_a = options === null || options === void 0 ? void 0 : options.level) !== null && _a !== void 0 ? _a : 6;
        return {
            compressor: 'gzip',
            size: gzip_size_1.default.sync(source, { level, ...options }),
            meta: {
                level: 6,
            },
        };
    },
};
class Generator {
    constructor(adapter) {
        this.adapter = adapter;
        this.sizeResolvers = new Map();
        this.descriptor = {
            name,
            version,
            author,
            homepage,
            description,
            adapter: this.adapter,
        };
        this.payload = { compilations: [] };
        this.resolveCompilation = (0, entity_resolver_1.default)(this.payload.compilations, (item) => item.id, null, false);
    }
    handleResource(compilationId, resourceId, source, compressor) {
        let compilation = this.resolveCompilation(compilationId);
        let sizeResolver;
        if (compilation) {
            sizeResolver = this.sizeResolvers.get(compilation);
        }
        else {
            compilation = {
                id: compilationId,
                resources: [],
            };
            sizeResolver = (0, entity_resolver_1.default)(compilation.resources, (item) => item.id, null, false);
            this.sizeResolvers.set(compilation, sizeResolver);
            this.payload.compilations.push(compilation);
        }
        if (!sizeResolver(resourceId)) {
            const resolvedCompressor = this.resolveCompressor(compressor);
            const size = resolvedCompressor.compressor(source, resourceId, resolvedCompressor.params);
            compilation.resources.push({ id: resourceId, size });
        }
    }
    get() {
        return { descriptor: this.descriptor, payload: this.payload };
    }
    resolveCompressor(compressor) {
        if (compressor === 'gzip') {
            compressor = [compressor];
        }
        if (typeof compressor === 'function') {
            return { compressor };
        }
        if (Array.isArray(compressor)) {
            const [name, params] = compressor;
            if (Object.prototype.hasOwnProperty.call(compressorByType, name)) {
                return { compressor: compressorByType[name], params };
            }
        }
        throw new Error(`Unknown compress ${compressor}`);
    }
}
exports.default = Generator;
//# sourceMappingURL=generator.js.map