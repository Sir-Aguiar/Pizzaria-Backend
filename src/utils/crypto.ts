import CryptoJS from "crypto-js";
import "dotenv/config";
const secretKey = process.env.SECRETKEY!;

const encryptMessage = (text: string) => CryptoJS.AES.encrypt(text, secretKey);

const decryptMessage = (text: CryptoJS.lib.CipherParams | string) => {
  const bytes = CryptoJS.AES.decrypt(text, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const getCredentialsInfos = (user_credential: string) => {
  const decrypted_info = decryptMessage(user_credential).split("^/^");
  return {
    name: decrypted_info[0],
    email: decrypted_info[1],
    password: decrypted_info[2],
  };
};

export { encryptMessage, decryptMessage, getCredentialsInfos };
