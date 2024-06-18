import { APIFactory } from '@statoscope/extensions';
import { RelationItem } from '@statoscope/types';
import { Report } from '@statoscope/types/types/custom-report';
import { Format } from './generator';
export declare type API = {
    getReports: (compilationId?: string | null, type?: RelationItem['type'] | null, relatedId?: string | number) => Report<unknown, unknown>[];
    getById(id: string): Report<unknown, unknown> | null;
};
declare const makeAPI: APIFactory<Format, API>;
export default makeAPI;
