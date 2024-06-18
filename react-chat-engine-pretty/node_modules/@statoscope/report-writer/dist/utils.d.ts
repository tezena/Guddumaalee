/// <reference types="node" />
import { Readable, Writable } from 'stream';
import { TReplacer } from '@discoveryjs/json-ext';
import { Options } from './';
export declare function waitFinished(stream: Readable | Writable): Promise<void>;
export declare type FromItem = {
    type: 'data';
    filename: string;
    data: unknown;
    replacer?: TReplacer;
} | {
    type: 'filename';
    filename: string;
    replacer?: TReplacer;
};
export declare function transform(options: {
    writer: Options;
}, from: Array<string | FromItem>, to: string): Promise<string>;
export declare function makeReplacer(from?: string, to?: string, ignoreKeys?: string[]): TReplacer | undefined;
