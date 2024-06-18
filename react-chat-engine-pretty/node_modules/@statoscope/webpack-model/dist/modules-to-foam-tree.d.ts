import { Compressor, Size } from '@statoscope/stats-extension-compressed/dist/generator';
import { NormalizedModule } from '../types';
export declare type NodeLink = {
    page: string;
    id: string;
    package?: {
        name: string;
        instance: {
            path: string;
        };
    };
    params?: Record<string, unknown>;
};
export declare type NodeData = {
    label: string;
    link?: string | NodeLink;
};
export declare type Node = {
    label: string;
    weight: number;
    weightCompressor?: Compressor;
    groups: Node[];
    link?: string | NodeLink;
    path: string;
};
export declare type GetModuleSizeFN = (module: NormalizedModule) => Size;
export default function modulesToFoamTree(modules: NormalizedModule[], getModuleSize: GetModuleSizeFN): Node;
