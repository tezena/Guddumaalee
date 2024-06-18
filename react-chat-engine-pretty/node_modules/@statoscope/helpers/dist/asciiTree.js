"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const archy_1 = __importDefault(require("archy"));
function makeTree(node, prefix) {
    return (0, archy_1.default)(node, prefix);
}
exports.default = makeTree;
//# sourceMappingURL=asciiTree.js.map