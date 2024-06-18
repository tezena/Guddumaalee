"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entity_resolver_1 = __importDefault(require("@statoscope/helpers/dist/entity-resolver"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { author, description, homepage, name, version } = require('../package.json');
class Generator {
    constructor(adapter) {
        this.adapter = adapter;
        this.lastId = 0;
        this.descriptor = {
            name,
            version,
            author,
            homepage,
            description,
            adapter: this.adapter,
        };
        this.payload = {
            compilations: [],
            rules: [],
        };
        this.resolveCompilation = (0, entity_resolver_1.default)(this.payload.compilations, (item) => item.id, null, false);
    }
    handleRule(name, descriptor) {
        const existingRule = this.payload.rules.find((rule) => name === rule.name);
        if (!existingRule) {
            this.payload.rules.push({ name, descriptor });
        }
    }
    handleEntry(ruleName, entry, type) {
        var _a, _b, _c;
        let compilation = this.resolveCompilation((_a = entry.compilation) !== null && _a !== void 0 ? _a : null);
        if (!compilation) {
            compilation = {
                id: (_b = entry.compilation) !== null && _b !== void 0 ? _b : null,
                items: [],
            };
            this.payload.compilations.push(compilation);
        }
        compilation.items.push({
            id: this.lastId++,
            rule: ruleName,
            type: type !== null && type !== void 0 ? type : 'error',
            message: entry.message,
            details: (entry.details == null
                ? []
                : Array.isArray(entry.details)
                    ? entry.details
                    : [{ type: 'text', content: entry.details }]).filter((item) => item.type === 'discovery'),
            related: (_c = entry.related) !== null && _c !== void 0 ? _c : [],
        });
    }
    get() {
        return { descriptor: this.descriptor, payload: this.payload };
    }
}
exports.default = Generator;
//# sourceMappingURL=generator.js.map