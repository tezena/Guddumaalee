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
        };
        this.resolveCompilation = (0, entity_resolver_1.default)(this.payload.compilations, (item) => item.id, null, false);
    }
    handleReport(report) {
        var _a, _b;
        let compilation = this.resolveCompilation((_a = report.compilation) !== null && _a !== void 0 ? _a : null);
        if (!compilation) {
            compilation = {
                id: (_b = report.compilation) !== null && _b !== void 0 ? _b : null,
                reports: [],
            };
            this.payload.compilations.push(compilation);
        }
        if (compilation.reports.find((r) => r.id === report.id)) {
            return false;
        }
        compilation.reports.push(report);
        return true;
    }
    get() {
        return { descriptor: this.descriptor, payload: this.payload };
    }
}
exports.default = Generator;
//# sourceMappingURL=generator.js.map