"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeReplacer = exports.transform = exports.waitFinished = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const json_ext_1 = require("@discoveryjs/json-ext");
const _1 = __importDefault(require("./"));
function waitFinished(stream) {
    return new Promise((resolve, reject) => {
        stream.once('end', resolve);
        stream.once('finish', resolve);
        stream.once('error', reject);
    });
}
exports.waitFinished = waitFinished;
async function transform(options, from, to) {
    const normalizedFrom = from.map((item) => typeof item === 'string' ? { type: 'filename', filename: item } : item);
    const toDir = path_1.default.dirname(to);
    if (!fs_1.default.existsSync(toDir)) {
        fs_1.default.mkdirSync(toDir, { recursive: true });
    }
    const outputStream = fs_1.default.createWriteStream(to);
    const htmlWriter = new _1.default(options.writer);
    for (const fromItem of normalizedFrom) {
        const id = path_1.default.basename(fromItem.filename);
        let stream;
        if (fromItem.type === 'filename') {
            stream = fs_1.default.createReadStream(fromItem.filename);
        }
        else {
            stream = (0, json_ext_1.stringifyStream)(fromItem.data, fromItem.replacer);
        }
        htmlWriter.addChunkWriter(stream, id);
    }
    htmlWriter.getStream().pipe(outputStream);
    htmlWriter.write();
    await waitFinished(outputStream);
    return to;
}
exports.transform = transform;
function makeReplacer(from, to = '', ignoreKeys = []) {
    if (!from) {
        return;
    }
    return (key, value) => {
        if (typeof value === 'string' && !ignoreKeys.includes(key)) {
            if (value.includes(from))
                return value.split(from).join(to);
        }
        return value;
    };
}
exports.makeReplacer = makeReplacer;
//# sourceMappingURL=utils.js.map