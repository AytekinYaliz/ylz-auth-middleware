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
const fs = require("fs");
const jwt = require("jsonwebtoken");
const publicKey = fs.readFileSync("./public.pem", "utf8");
function decodeToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const decodedToken = yield jwt.decode(token, { complete: true });
        return decodedToken["payload"];
    });
}
exports.decodeToken = decodeToken;
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield jwt.verify(token, publicKey);
        }
        catch (err) {
            console.error("Invalid token!!!", err["name"], err["message"]);
            return false;
        }
        return true;
    });
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=encryption.js.map