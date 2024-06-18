import { HandledStats, NormalizeResult, RawStatsFileDescriptor } from '../types';
export default function handleFile(rawData: RawStatsFileDescriptor | RawStatsFileDescriptor[]): NormalizeResult;
export declare function handleRawFile(rawStatsFileDescriptor: RawStatsFileDescriptor): HandledStats;
