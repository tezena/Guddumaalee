"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexer_1 = __importDefault(require("@statoscope/helpers/dist/indexer"));
const makeAPI = (source) => {
    const sizeIndexes = new Map();
    for (const compilation of source.payload.compilations) {
        sizeIndexes.set(compilation.id, (0, indexer_1.default)((r) => r.id, compilation.resources));
    }
    return (compilationId, resourceId) => {
        var _a, _b, _c;
        return (_c = (_b = (_a = sizeIndexes.get(compilationId)) === null || _a === void 0 ? void 0 : _a.get(resourceId)) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : null;
    };
};
exports.default = makeAPI;
//# sourceMappingURL=api.js.map