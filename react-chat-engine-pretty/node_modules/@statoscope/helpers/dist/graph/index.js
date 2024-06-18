"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const node_1 = __importDefault(require("./node"));
exports.Node = node_1.default;
class Graph {
    constructor() {
        this.nodes = new Map();
    }
    makeNode(id, data) {
        if (this.nodes.has(id)) {
            throw new Error(`Node ${id} already exists`);
        }
        const node = new node_1.default(this, id, data);
        this.nodes.set(node.id, node);
        return node;
    }
    hasNode(id) {
        return this.nodes.has(id);
    }
    getNode(id) {
        var _a;
        return (_a = this.nodes.get(id)) !== null && _a !== void 0 ? _a : null;
    }
    addChild(child, to) {
        to.children.add(child);
        child.parents.add(to);
    }
    findPaths(from, to, max = Infinity) {
        const rootSolution = {
            node: to,
            children: [],
            parents: [],
        };
        const solutionDepsCache = new Map([
            [rootSolution, new Set()],
        ]);
        const solutions = new Map([[to, rootSolution]]);
        let total = 0;
        walk(from, to);
        return rootSolution;
        function walk(module, entry) {
            if (module === entry) {
                total++;
            }
            if (solutions.has(module)) {
                return solutions.get(module);
            }
            const solution = {
                node: module,
                parents: [],
                children: [],
            };
            solutionDepsCache.set(solution, new Set());
            solutions.set(module, solution);
            let find = false;
            for (const parent of module.parents) {
                const parentSolution = walk(parent, entry);
                if (parentSolution) {
                    find = true;
                    solution.parents.push(parentSolution);
                    const parentSolutionDeps = solutionDepsCache.get(parentSolution);
                    if (!parentSolutionDeps.has(solution)) {
                        parentSolution.children.push(solution);
                        parentSolutionDeps.add(solution);
                    }
                    if (total === max) {
                        break;
                    }
                }
            }
            return find ? solution : null;
        }
    }
}
exports.default = Graph;
//# sourceMappingURL=index.js.map