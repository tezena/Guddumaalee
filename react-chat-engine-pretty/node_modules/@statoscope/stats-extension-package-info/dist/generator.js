"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_resolver_1 = __importDefault(require("@statoscope/helpers/dist/entity-resolver"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, version, author, homepage, description } = require('../package.json');
class Generator {
    constructor(adapter) {
        this.adapter = adapter;
        this.packageResolvers = new Map();
        this.instanceResolvers = new Map();
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
    handleInstance(compilationId, packageName, instance, info) {
        let compilation = this.resolveCompilation(compilationId);
        let packageResolver;
        if (compilation) {
            packageResolver = this.packageResolvers.get(compilation);
        }
        else {
            compilation = {
                id: compilationId,
                packages: [],
            };
            packageResolver = (0, entity_resolver_1.default)(compilation.packages, (item) => item.name, null, false);
            this.packageResolvers.set(compilation, packageResolver);
            this.payload.compilations.push(compilation);
        }
        let resolvedPackage = packageResolver(packageName);
        if (!resolvedPackage) {
            const instances = [];
            resolvedPackage = { name: packageName, instances };
            compilation.packages.push(resolvedPackage);
            this.instanceResolvers.set(resolvedPackage, (0, entity_resolver_1.default)(instances, (item) => item.path, null, false));
        }
        const instanceResolver = this.instanceResolvers.get(resolvedPackage);
        let resolvedInstance = instanceResolver(instance);
        if (!resolvedInstance) {
            resolvedInstance = { path: instance, info: { version: info.version } };
            resolvedPackage.instances.push(resolvedInstance);
        }
        else {
            if (resolvedInstance.info.version !== info.version) {
                throw new Error(`[Instnce version conflict] ${instance} old ${resolvedInstance.info.version} new ${info.version}`);
            }
        }
    }
    get() {
        return { descriptor: this.descriptor, payload: this.payload };
    }
}
exports.default = Generator;
//# sourceMappingURL=generator.js.map