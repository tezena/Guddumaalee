"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(graph, id, data) {
        this.children = new Set();
        this.parents = new Set();
        this.id = id;
        this.data = data;
        this.graph = graph;
    }
    addChild(node) {
        this.graph.addChild(node, this);
    }
    findPathsTo(node, max = Infinity) {
        return this.graph.findPaths(this, node, max);
    }
}
exports.default = Node;
//# sourceMappingURL=node.js.map