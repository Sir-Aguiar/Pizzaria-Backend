import { NextFunction, Request, Response } from "express";
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase_app } from "../../firebase";
import { getCredentialsInfos } from "../../utils/credentials-utils";
import { encryptMessage } from "../../utils/crypto";

const RoutesForValidation = ["/update-status", "/update-delivery"];

const ValidateEmployeeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Getting the employee data
    const { user_credential } = req.cookies;
    const { name, email, password } = getCredentialsInfos(user_credential);

    // Verifying  the employee
    await signInWithEmailAndPassword(getAuth(firebase_app), email, password);

    // Reseting the credential cookie
    res.clearCookie("user_credential");
    res.cookie("user_credential", encryptMessage(`${name}^/^${email}^/^${password}`).toString());

    console.log(`${name} entry authorized at ${new Date().toLocaleString()}`);

    next();
  } catch (e: any) {
    // Firebase error handling
    if (e instanceof FirebaseError) {
      const error_infos = e.code.split("/");

      // Errors on function release
      if (error_infos[0] == "invalid-argument") {
        return res.status(500).json({ e });
      }

      // Errors on auth
      if (error_infos[0] === "auth") {
        switch (error_infos[1]) {
          // Missing params
          case "internal-error":
            return res.status(400).json({ e: "A few information are missing" });

          // Missing email
          case "invalid-email":
            return res.status(400).json({ e: "Missing email" });
          // Invalid user
          default:
            return res.status(401).json({ e: "This user is not allowed to consume our services" });
        }
      }

      // Unknown error
      return res.status(510).json({ e: "An unknown error has been occurred during the execution of a functionality" });
    }

    // Unexpected type
    if (e instanceof TypeError) {
      return res.status(400).json({ e: { message: "Invalid cookies has been received" } });
    }
    return res.status(400).json({ e: { message: "An unknown error has occurred" } });
  }
};
export { RoutesForValidation, ValidateEmployeeMiddleware };
