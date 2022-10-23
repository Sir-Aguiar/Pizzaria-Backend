import { decryptMessage } from "./crypto";

const getCredentialsInfos = (user_credential: string) => {
  const [name, email, password] = decryptMessage(user_credential).split("^/^");
  return {
    name,
    email,
    password,
  };
};
export { getCredentialsInfos };
