"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() {
        this.extensions = new Map();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register(name, version, apiFactory) {
        this.extensions.set(name, { version, apiFactory });
    }
    resolve(name) {
        const item = this.extensions.get(name);
        if (!item) {
            return null;
        }
        return item;
    }
}
exports.default = Container;
//# sourceMappingURL=index.js.map