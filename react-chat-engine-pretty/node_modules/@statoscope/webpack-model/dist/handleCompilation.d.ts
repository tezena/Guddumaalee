import { HandledCompilation, HandledFileContext } from '../types';
import { NormalizedFile, RawStatsFileDescriptor } from '../types';
export default function handleCompilations(rawStatsFileDescriptor: RawStatsFileDescriptor, file: NormalizedFile, fileContext: HandledFileContext): HandledCompilation[];
