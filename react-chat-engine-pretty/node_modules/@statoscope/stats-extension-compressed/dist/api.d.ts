import { APIFactory } from '@statoscope/extensions';
import { Format, Size } from './generator';
export declare type API = (compilationId: string, resourceId: string) => Size | null;
declare const makeAPI: APIFactory<Format, API>;
export default makeAPI;
