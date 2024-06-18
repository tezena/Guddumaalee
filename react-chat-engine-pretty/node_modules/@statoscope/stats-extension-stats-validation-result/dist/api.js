"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const indexer_1 = __importDefault(require("@statoscope/helpers/dist/indexer"));
const makeAPI = (source) => {
    const idIndex = (0, indexer_1.default)((entity) => entity.id);
    const compilationIndex = (0, indexer_1.default)((entity) => entity.id);
    const ruleIndex = (0, indexer_1.default)((item) => item.name, source.payload.rules);
    for (const compilation of source.payload.compilations) {
        let compilationItem = compilationIndex.get(compilation.id);
        if (!compilationItem) {
            compilationItem = {
                id: compilation.id,
                relationTypeIndex: (0, indexer_1.default)((entity) => entity.type),
                itemIndex: (0, indexer_1.default)((entity) => entity.id),
            };
            compilationIndex.add(compilationItem);
        }
        for (const item of compilation.items) {
            compilationItem.itemIndex.add(item);
            idIndex.add(item);
            for (const related of item.related) {
                let typeItem = compilationItem.relationTypeIndex.get(related.type);
                if (!typeItem) {
                    typeItem = {
                        type: related.type,
                        relationIdIndex: (0, indexer_1.default)((entity) => entity.id),
                        itemIndex: (0, indexer_1.default)((entity) => entity.id),
                    };
                    compilationItem.relationTypeIndex.add(typeItem);
                }
                let idItem = typeItem.relationIdIndex.get(related.id);
                if (!idItem) {
                    idItem = {
                        id: related.id,
                        index: (0, indexer_1.default)((entity) => entity.id),
                    };
                    typeItem.relationIdIndex.add(idItem);
                }
                typeItem.itemIndex.add(item);
                idItem.index.add(item);
            }
        }
    }
    return {
        getItems: (compilationId, type, relatedId) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            if (relatedId) {
                if (!type) {
                    throw new Error('type must be specified');
                }
                return ((_d = (_c = (_b = (_a = compilationIndex
                    .get(compilationId)) === null || _a === void 0 ? void 0 : _a.relationTypeIndex.get(type)) === null || _b === void 0 ? void 0 : _b.relationIdIndex.get(relatedId)) === null || _c === void 0 ? void 0 : _c.index.getAll()) !== null && _d !== void 0 ? _d : []);
            }
            if (type) {
                return ((_g = (_f = (_e = compilationIndex
                    .get(compilationId)) === null || _e === void 0 ? void 0 : _e.relationTypeIndex.get(type)) === null || _f === void 0 ? void 0 : _f.itemIndex.getAll()) !== null && _g !== void 0 ? _g : []);
            }
            return (_j = (_h = compilationIndex.get(compilationId)) === null || _h === void 0 ? void 0 : _h.itemIndex.getAll()) !== null && _j !== void 0 ? _j : [];
        },
        getRule(id) {
            var _a;
            return ((_a = ruleIndex.get(id)) === null || _a === void 0 ? void 0 : _a.descriptor) || null;
        },
        getItemById(id) {
            return idIndex.get(id);
        },
    };
};
exports.default = makeAPI;
//# sourceMappingURL=api.js.map