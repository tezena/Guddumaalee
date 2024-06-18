"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
function makeNode(data, size, path) {
    return {
        label: data.label,
        weight: size.size,
        weightCompressor: size.compressor,
        groups: [],
        link: data.link,
        path,
    };
}
function handleModule(root, module, getModuleSize) {
    const resource = (0, module_1.moduleResource)(module);
    if (!resource) {
        return;
    }
    const parts = resource.split(/[/\\]/).map((label) => ({ label }));
    let currentPackage = null;
    for (const [i, part] of parts.entries()) {
        if (part.label === 'node_modules') {
            currentPackage = { name: '' };
        }
        else if (currentPackage) {
            if (part.label[0] === '@') {
                currentPackage = { name: part.label };
            }
            else {
                currentPackage.name += (currentPackage.name ? '/' : '') + part.label;
                const instance = (0, module_1.nodeModule)((0, module_1.moduleResource)(module));
                part.link = {
                    page: 'package',
                    id: currentPackage.name,
                    package: instance
                        ? {
                            name: instance === null || instance === void 0 ? void 0 : instance.name,
                            instance: {
                                path: instance === null || instance === void 0 ? void 0 : instance.path,
                            },
                        }
                        : undefined,
                    params: {
                        instance: parts
                            .map((part) => part.label)
                            .slice(0, i + 1)
                            .join('/'),
                    },
                };
                currentPackage = null;
            }
        }
    }
    if (parts.length) {
        const last = parts[parts.length - 1];
        last.link = {
            page: 'module',
            id: String(module.id || module.identifier),
        };
    }
    apply(root, parts, module.modules && module.modules.length ? { size: 0 } : getModuleSize(module));
}
function apply(root, parts, size) {
    const stack = [root];
    let cursor = root;
    function applyToStack(stack, size) {
        for (const item of stack) {
            if (!item.weightCompressor) {
                item.weightCompressor = size.compressor;
            }
            else if (item.weightCompressor !== size.compressor) {
                item.weightCompressor = 'multiple compressors';
            }
            item.weight += size.size;
        }
    }
    for (const part of parts) {
        let node = (cursor === null || cursor === void 0 ? void 0 : cursor.groups.find((node) => node.label === part.label)) || null;
        if (!node) {
            node = makeNode(part, { size: 0 }, [...stack, part]
                .map((item) => item.label)
                .filter(Boolean)
                .join('/'));
            cursor.groups.push(node);
        }
        cursor = node;
        stack.push(cursor);
    }
    applyToStack(stack, size);
}
function modulesToFoamTree(modules, getModuleSize) {
    const root = makeNode({ label: '' }, { size: 0 }, '/');
    for (const module of modules) {
        handleModule(root, module, getModuleSize);
        if (module.modules) {
            for (const innerModule of module.modules) {
                handleModule(root, innerModule, getModuleSize);
            }
        }
    }
    return root;
}
exports.default = modulesToFoamTree;
//# sourceMappingURL=modules-to-foam-tree.js.map