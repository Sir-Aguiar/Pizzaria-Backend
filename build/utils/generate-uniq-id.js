"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
require("dotenv/config");
const secretKey = process.env.SECRETKEY;
const message = "Hello, Felipe!";
const encryptMessage = (text) => crypto_js_1.default.AES.encrypt(text, secretKey);
const decryptMessage = (text) => {
    const bytes = crypto_js_1.default.AES.decrypt(text, secretKey);
    return bytes.toString(crypto_js_1.default.enc.Utf8);
};
