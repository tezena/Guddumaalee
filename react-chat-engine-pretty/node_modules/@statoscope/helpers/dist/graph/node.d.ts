import type Graph from './';
import type { PathSolution } from './';
export default class Node<TData> {
    readonly id: string;
    graph: Graph<TData>;
    children: Set<Node<TData>>;
    parents: Set<Node<TData>>;
    data: TData;
    constructor(graph: Graph<TData>, id: string, data: TData);
    addChild(node: Node<TData>): void;
    findPathsTo(node: Node<TData>, max?: number): PathSolution<TData>;
}
