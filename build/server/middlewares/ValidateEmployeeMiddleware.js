"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateEmployeeMiddleware = exports.RoutesForValidation = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
const firebase_1 = require("../../firebase");
const crypto_1 = require("../../utils/crypto");
const RoutesForValidation = ["/update-status", "/update-delivery"];
exports.RoutesForValidation = RoutesForValidation;
const ValidateEmployeeMiddleware = async (req, res, next) => {
    try {
        // Verifying employee credentials
        const { user_credential } = req.cookies;
        const { name, email, password } = (0, crypto_1.getCredentialsInfos)(user_credential);
        await (0, auth_1.signInWithEmailAndPassword)((0, auth_1.getAuth)(firebase_1.firebase_app), email, password);
        console.log(`${name} entry authorized at ${new Date().toLocaleString()}`);
        res.clearCookie("user_credential");
        res.cookie("user_credential", (0, crypto_1.encryptMessage)(`${name}^/^${email}^/^${password}`).toString());
        next();
    }
    catch (e) {
        if (e instanceof app_1.FirebaseError) {
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
        if (e instanceof TypeError) {
            return res.status(400).json({ e: { message: "Invalid cookies has been received" } });
        }
        return res.status(400).json({ e: { message: "An unknown error has occurred" } });
    }
};
exports.ValidateEmployeeMiddleware = ValidateEmployeeMiddleware;
