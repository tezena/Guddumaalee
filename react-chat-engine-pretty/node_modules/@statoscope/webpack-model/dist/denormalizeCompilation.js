"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleModule(module, compilationData) {
    const resolvedModule = compilationData.data.modules.get(module);
    if (!resolvedModule) {
        throw new Error(`Can't resolve module ${module}`);
    }
    return resolvedModule;
}
function handleChunk(chunk, compilationData) {
    for (const [id, module] of (chunk.modules || []).entries()) {
        if (typeof module === 'number') {
            chunk.modules[id] = handleModule(module, compilationData);
        }
    }
}
function handleCompilation(compilation, denormalizationData) {
    const compilationData = denormalizationData.data.compilations.find((c) => c.id === (compilation.hash || compilation.name));
    if (!compilationData) {
        return;
    }
    for (const [id, module] of (compilation.modules || []).entries()) {
        if (typeof module === 'number') {
            compilation.modules[id] = handleModule(module, compilationData);
        }
    }
    for (const chunk of compilation.chunks || []) {
        handleChunk(chunk, compilationData);
    }
}
function denormalizeCompilation(json) {
    var _a, _b;
    if (!((_a = json.__statoscope) === null || _a === void 0 ? void 0 : _a.normalization)) {
        return json;
    }
    const denormalizationData = {
        links: json.__statoscope.normalization.links,
        data: {
            compilations: json.__statoscope.normalization.data.compilations.map((compilation) => {
                return {
                    id: compilation.id,
                    data: {
                        modules: new Map(compilation.data.modules),
                    },
                };
            }),
        },
    };
    const compilations = [json];
    let cursor;
    while ((cursor = compilations.pop())) {
        handleCompilation(cursor, denormalizationData);
        for (const child of cursor.children || []) {
            compilations.push(child);
        }
    }
    // @ts-ignore
    (_b = json.__statoscope) === null || _b === void 0 ? true : delete _b.normalization;
    return json;
}
exports.default = denormalizeCompilation;
//# sourceMappingURL=denormalizeCompilation.js.map