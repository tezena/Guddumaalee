"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const stats_json_1 = __importDefault(require("./schema/stats.json"));
function validateStats(stats) {
    const ajv = new ajv_1.default();
    const validate = ajv.compile(stats_json_1.default);
    const valid = validate(stats);
    if (!valid) {
        return { result: false, errors: validate.errors };
    }
    return { result: true };
}
exports.default = validateStats;
//# sourceMappingURL=validate.js.map