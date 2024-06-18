"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorMap = exports.createColorsFromString = exports.fileTypeMap = exports.getHSLValue = exports.colorFromH = exports.generateColor = void 0;
function generateColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return colorFromH(h);
}
exports.generateColor = generateColor;
function colorFromH(h) {
    return getHSLValue(h, 50, 85);
}
exports.colorFromH = colorFromH;
function getHSLValue(h, s, l) {
    return `hsl(${h}, ${s}%, ${l}%)`;
}
exports.getHSLValue = getHSLValue;
exports.fileTypeMap = {
    '.wasm': 'wasm',
    '.json': 'json',
    '.html': 'html',
    '.js': 'script',
    '.jsx': 'script',
    '.es6': 'script',
    '.ts': 'script',
    '.tsx': 'script',
    '.flow': 'script',
    '.coffee': 'script',
    '.mjs': 'script',
    '.css': 'style',
    '.styl': 'style',
    '.scss': 'style',
    '.sass': 'style',
    '.less': 'style',
    '.png': 'image',
    '.jpg': 'image',
    '.jpeg': 'image',
    '.svg': 'image',
    '.eot': 'font',
    '.ttf': 'font',
    '.woff': 'font',
    '.woff2': 'font',
};
function createColorsFromString(strings) {
    const step = Math.round(360 / (strings instanceof Set ? strings.size : strings.length));
    let currentStep = 0;
    const all = {};
    for (const value of strings) {
        all[value] = { color: colorFromH(currentStep) };
        currentStep += step;
    }
    return all;
}
exports.createColorsFromString = createColorsFromString;
exports.colorMap = {
    ...createColorsFromString(new Set(Object.values(exports.fileTypeMap))),
};
//# sourceMappingURL=colors.js.map