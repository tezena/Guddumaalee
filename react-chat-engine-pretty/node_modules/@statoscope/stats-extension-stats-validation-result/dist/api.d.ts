import { APIFactory } from '@statoscope/extensions';
import { RelationItem } from '@statoscope/types/types';
import { RuleDescriptor } from '@statoscope/types/types/validation/api';
import { Format, Item } from './generator';
export declare type API = {
    getItems: (compilationId: string | null, type?: RelationItem['type'] | null, relatedId?: string | number) => Item[];
    getItemById(id: number): Item | null;
    getRule(id: string): RuleDescriptor | null;
};
declare const makeAPI: APIFactory<Format, API>;
export default makeAPI;
