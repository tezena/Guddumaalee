"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPE_5G = exports.TYPE_LTE_CAT_12 = exports.TYPE_LTE_CAT_9 = exports.TYPE_LTE_CAT_6 = exports.TYPE_LTE_CAT_4 = exports.TYPE_DC_HSPA_PLUS = exports.TYPE_HSPA_PLUS = exports.TYPE_HSPA = exports.TYPE_Basic = exports.TYPE_EDGE = exports.TYPE_GPRS = exports.TYPE_3G_FAST = exports.TYPE_3G_SLOW = exports.bytesInMBit = void 0;
exports.bytesInMBit = 131072;
// from chromium
exports.TYPE_3G_SLOW = {
    type: '3G',
    name: 'Slow',
    typicalSpeed: 0.38 * exports.bytesInMBit,
};
// from chromium
exports.TYPE_3G_FAST = {
    type: '3G',
    name: 'Fast',
    typicalSpeed: 1.37 * exports.bytesInMBit,
};
exports.TYPE_GPRS = {
    type: '2G',
    name: 'GPRS',
    typicalSpeed: 0.06 * exports.bytesInMBit,
};
exports.TYPE_EDGE = {
    type: '2G',
    name: 'EDGE',
    typicalSpeed: 0.1 * exports.bytesInMBit,
};
exports.TYPE_Basic = {
    type: '3G',
    name: 'Basic',
    typicalSpeed: 0.1 * exports.bytesInMBit,
};
exports.TYPE_HSPA = {
    type: '3G',
    name: 'HSPA',
    typicalSpeed: 1.5 * exports.bytesInMBit,
};
exports.TYPE_HSPA_PLUS = {
    type: '3G',
    name: 'HSPA+',
    typicalSpeed: 4 * exports.bytesInMBit,
};
exports.TYPE_DC_HSPA_PLUS = {
    type: '3G',
    name: 'DC-HSPA+',
    typicalSpeed: 8 * exports.bytesInMBit,
};
exports.TYPE_LTE_CAT_4 = {
    type: '4G',
    name: 'LTE cat.4',
    typicalSpeed: 15 * exports.bytesInMBit,
};
exports.TYPE_LTE_CAT_6 = {
    type: '4G',
    name: 'LTE cat.6',
    typicalSpeed: 30 * exports.bytesInMBit,
};
exports.TYPE_LTE_CAT_9 = {
    type: '4G',
    name: 'LTE cat.9',
    typicalSpeed: 45 * exports.bytesInMBit,
};
exports.TYPE_LTE_CAT_12 = {
    type: '4G',
    name: 'LTE cat.12',
    typicalSpeed: 60 * exports.bytesInMBit,
};
exports.TYPE_5G = {
    type: '5G',
    name: '5G',
    typicalSpeed: 200 * exports.bytesInMBit,
};
exports.default = [
    exports.TYPE_3G_SLOW,
    exports.TYPE_3G_FAST,
    exports.TYPE_GPRS,
    exports.TYPE_EDGE,
    exports.TYPE_Basic,
    exports.TYPE_HSPA,
    exports.TYPE_HSPA_PLUS,
    exports.TYPE_DC_HSPA_PLUS,
    exports.TYPE_LTE_CAT_4,
    exports.TYPE_LTE_CAT_6,
    exports.TYPE_LTE_CAT_9,
    exports.TYPE_LTE_CAT_12,
    exports.TYPE_5G,
];
//# sourceMappingURL=network-type-list.js.map