"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
function makeChunkToScriptWriter(source, target, id) {
    const transformer = new stream_1.Transform({
        transform(chunk, encoding, callback) {
            callback(null, `<script type="text/plain" data-id=${JSON.stringify(id)}>${chunk
                .toString()
                .replace(/<([!/])/g, '<\\\\$1')}</script>`);
        },
    });
    source.pipe(transformer);
    transformer.pipe(target, { end: false });
    return new Promise((resolve, reject) => {
        transformer.once('end', resolve);
        transformer.once('error', reject);
    });
}
exports.default = makeChunkToScriptWriter;
//# sourceMappingURL=chunkToScriptWriter.js.map