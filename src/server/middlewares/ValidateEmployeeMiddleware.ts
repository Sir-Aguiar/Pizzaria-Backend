import { NextFunction, Request, Response } from "express";
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase_app } from "../../firebase";
import { decryptMessage, encryptMessage } from "../../utils/crypto";

const RoutesForValidation = ["/update-status", "/update-delivery"];

const ValidateEmployeeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const header_name = req.header("employee") || "";
  const header_email = req.header("email") || "";
  const header_password = req.header("password") || "";
  try {
    // Verifying employee credentials
    const employee_email = decryptMessage(header_email);
    const employee_password = decryptMessage(header_password);
    const employee_name = decryptMessage(header_name);
    await signInWithEmailAndPassword(getAuth(firebase_app), employee_email, employee_password);
    console.log(`${employee_name} entry authorized at ${new Date().toLocaleString()}`);
    console.log(req.cookies);
    next();
  } catch (error: any) {
    const e = error as FirebaseError;
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
};
export { RoutesForValidation, ValidateEmployeeMiddleware };
