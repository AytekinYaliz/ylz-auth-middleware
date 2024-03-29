"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@ylz/logger");
const encryption_1 = require("./encryption");
function default_1(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.debug("ylz-auth-middleware", req.headers["authorization"]);
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return res.status(401).send({ message: "Missing authorization." });
        }
        else {
            const token = authorization.replace("Bearer ", "");
            if (!token) {
                return res.status(401).send({ message: "Missing token." });
            }
            const isVerified = yield encryption_1.verifyToken(token);
            if (!isVerified) {
                return res.status(401).send({ message: "Invalid token." });
            }
            const decodedToken = yield encryption_1.decodeToken(token);
            if (!decodedToken) {
                return res.status(401).send({ message: "Invalid token." });
            }
            if (decodedToken.ext < Date.now()) {
                return res.status(401).send({ message: "Token expired." });
            }
            res.locals.userId = decodedToken.uid;
            return next();
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=authentication.js.map