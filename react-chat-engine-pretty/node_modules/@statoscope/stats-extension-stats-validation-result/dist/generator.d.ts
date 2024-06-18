import { Extension, ExtensionDescriptor } from '@statoscope/stats/spec/extension';
import { DetailsDescriptor, TestEntry } from '@statoscope/types/types/validation/test-entry';
import { RuleDescriptor } from '@statoscope/types/types/validation/api';
import { NormalizedExecParams } from '@statoscope/types/types/validation/rule';
import { RelationItem } from '@statoscope/types';
export declare type Format = Extension<Payload>;
export declare type Item = {
    id: number;
    type: NormalizedExecParams['mode'];
    rule: string;
    message: string;
    details: DetailsDescriptor[];
    related: RelationItem[];
};
export declare type Compilation = {
    id: string | null;
    items: Item[];
};
export declare type Payload = {
    rules: Array<{
        name: string;
        descriptor: RuleDescriptor;
    }>;
    compilations: Array<Compilation>;
};
export default class Generator {
    private adapter?;
    private lastId;
    private descriptor;
    private payload;
    private resolveCompilation;
    constructor(adapter?: ExtensionDescriptor | undefined);
    handleRule(name: string, descriptor: RuleDescriptor): void;
    handleEntry(ruleName: string, entry: TestEntry, type?: NormalizedExecParams['mode']): void;
    get(): Format;
}
