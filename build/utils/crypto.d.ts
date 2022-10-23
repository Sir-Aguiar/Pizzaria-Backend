import CryptoJS from "crypto-js";
import "dotenv/config";
declare const encryptMessage: (text: string) => CryptoJS.lib.CipherParams;
declare const decryptMessage: (text: CryptoJS.lib.CipherParams | string) => string;
export { encryptMessage, decryptMessage };
