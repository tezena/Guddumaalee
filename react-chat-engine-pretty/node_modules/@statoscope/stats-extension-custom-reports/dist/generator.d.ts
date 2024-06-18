import { Extension, ExtensionDescriptor } from '@statoscope/stats/spec/extension';
import { Report } from '@statoscope/types/types/custom-report';
export declare type Format = Extension<Payload>;
export declare type Compilation = {
    id: string | null;
    reports: Array<Report<unknown, unknown>>;
};
export declare type Payload = {
    compilations: Array<Compilation>;
};
export default class Generator {
    private adapter?;
    private descriptor;
    private payload;
    private resolveCompilation;
    constructor(adapter?: ExtensionDescriptor | undefined);
    handleReport(report: Report<unknown, unknown>): boolean;
    get(): Format;
}
