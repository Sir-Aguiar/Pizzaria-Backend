import CryptoJS from "crypto-js";
import "dotenv/config";
declare const encryptMessage: (text: string) => CryptoJS.lib.CipherParams;
declare const decryptMessage: (text: CryptoJS.lib.CipherParams | string) => string;
declare const getCredentialsInfos: (user_credential: string) => {
    name: string;
    email: string;
    password: string;
};
export { encryptMessage, decryptMessage, getCredentialsInfos };
