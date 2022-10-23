"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCredentialsInfos = void 0;
const crypto_1 = require("./crypto");
const getCredentialsInfos = (user_credential) => {
    const [name, email, password] = (0, crypto_1.decryptMessage)(user_credential).split("^/^");
    return {
        name,
        email,
        password,
    };
};
exports.getCredentialsInfos = getCredentialsInfos;
