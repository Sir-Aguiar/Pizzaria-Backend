import CryptoJS from "crypto-js";
import "dotenv/config";
const secretKey = process.env.SECRETKEY!;
const message = "Hello, Felipe!";

const encryptMessage = (text: string) => CryptoJS.AES.encrypt(text, secretKey);

const decryptMessage = (text: CryptoJS.lib.CipherParams | string) => {
  const bytes = CryptoJS.AES.decrypt(text, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
export { encryptMessage, decryptMessage };

