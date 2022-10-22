"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentialsInfos = exports.decryptMessage = exports.encryptMessage = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
require("dotenv/config");
const secretKey = process.env.SECRETKEY;
const encryptMessage = (text) => crypto_js_1.default.AES.encrypt(text, secretKey);
exports.encryptMessage = encryptMessage;
const decryptMessage = (text) => {
    const bytes = crypto_js_1.default.AES.decrypt(text, secretKey);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
};
exports.decryptMessage = decryptMessage;
const getCredentialsInfos = (user_credential) => {
    const [name, email, password] = decryptMessage(user_credential).split("^/^");
    return {
        name,
        email,
        password,
    };
};
exports.getCredentialsInfos = getCredentialsInfos;
