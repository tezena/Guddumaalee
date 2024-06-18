import { Webpack } from '../webpack';
import { NormalizedModule, NormalizedReason } from '../types';
import RawModule = Webpack.RawModule;
import RawReason = Webpack.RawReason;
export declare const extractFileRx: RegExp;
export declare const concatenatedIdRx: RegExp;
export declare function matchRxValue(rx: RegExp, string: string): string | null;
export declare function moduleNameResource(name: string | null): string | null;
export declare function moduleResource(module: RawModule | NormalizedModule | null): string | null;
export declare function moduleReasonResource(reason: RawReason | NormalizedReason | null): string | null;
export declare type NodeModule = {
    path: string;
    name: string;
    isRoot: boolean;
};
export declare function nodeModule(path: string | null): NodeModule | null;
