import Node from './node';
export { Node };
export declare type PathSolution<TData> = {
    node: Node<TData>;
    children: PathSolution<TData>[];
    parents: PathSolution<TData>[];
};
export default class Graph<TData> {
    nodes: Map<string, Node<TData>>;
    makeNode(id: string, data: TData): Node<TData>;
    hasNode(id: string): boolean;
    getNode(id: string): Node<TData> | null;
    addChild(child: Node<TData>, to: Node<TData>): void;
    findPaths(from: Node<TData>, to: Node<TData>, max?: number): PathSolution<TData>;
}
