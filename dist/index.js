"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@ylz/logger");
function default_1(req, res, next) {
    logger_1.default.debug("ylz-auth-middleware");
    next();
}
exports.default = default_1;
//# sourceMappingURL=index.js.map