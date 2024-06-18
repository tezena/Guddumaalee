/// <reference types="node" />
import { Stream, Writable } from 'stream';
export default function makeChunkToScriptWriter(source: Stream, target: Writable, id: string): Promise<void>;
