"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectRawEntrypoints = exports.collectRawAssets = exports.collectRawChunks = exports.collectRawReasonsFromArray = exports.collectRawModulesFromArray = exports.collectRawModules = exports.collector = void 0;
function collector(from, isItem, getChildren, getId) {
    const stack = [from];
    let cursor;
    const collected = new Map();
    while ((cursor = stack.pop())) {
        for (let i = 0; i < cursor.length; i++) {
            const item = cursor[i];
            if (isItem(item)) {
                collected.set(getId(item), item);
            }
            else {
                stack.push(getChildren(item));
            }
        }
    }
    return collected;
}
exports.collector = collector;
function collectRawModules(compilation) {
    var _a, _b, _c, _d;
    const collected = collectRawModulesFromArray((_a = compilation.modules) !== null && _a !== void 0 ? _a : []);
    for (const chunk of (_b = compilation.chunks) !== null && _b !== void 0 ? _b : []) {
        const innerCollected = collectRawModulesFromArray((_c = chunk.modules) !== null && _c !== void 0 ? _c : []);
        for (const [innerId, innerItem] of innerCollected) {
            if (!collected.has(innerId)) {
                collected.set(innerId, innerItem);
            }
        }
    }
    for (const [, item] of collected) {
        const innerCollected = collectRawModulesFromArray((_d = item.modules) !== null && _d !== void 0 ? _d : []);
        for (const [innerId, innerItem] of innerCollected) {
            if (!collected.has(innerId)) {
                collected.set(innerId, innerItem);
            }
        }
    }
    return [...collected.values()];
}
exports.collectRawModules = collectRawModules;
function collectRawModulesFromArray(modules) {
    return collector(modules, (module) => module.type === 'module' || typeof module.type === 'undefined', (module) => module.children, (module) => module.identifier);
}
exports.collectRawModulesFromArray = collectRawModulesFromArray;
function collectRawReasonsFromArray(modules) {
    let i = 0;
    return collector(modules, (reason) => reason.moduleIdentifier !== undefined, (reasons) => reasons.children, () => i++);
}
exports.collectRawReasonsFromArray = collectRawReasonsFromArray;
function collectRawChunks(compilation) {
    var _a;
    const chunks = [];
    for (const chunk of (_a = compilation.chunks) !== null && _a !== void 0 ? _a : []) {
        chunks.push(chunk);
    }
    return chunks;
}
exports.collectRawChunks = collectRawChunks;
function collectRawAssets(compilation) {
    var _a;
    const assets = [];
    for (const asset of (_a = compilation.assets) !== null && _a !== void 0 ? _a : []) {
        assets.push(asset);
    }
    return assets;
}
exports.collectRawAssets = collectRawAssets;
function collectRawEntrypoints(compilation) {
    var _a;
    const entrypoints = [];
    for (const [name, data] of Object.entries((_a = compilation.entrypoints) !== null && _a !== void 0 ? _a : {})) {
        entrypoints.push({ name, data });
    }
    return entrypoints;
}
exports.collectRawEntrypoints = collectRawEntrypoints;
//# sourceMappingURL=collector.js.map