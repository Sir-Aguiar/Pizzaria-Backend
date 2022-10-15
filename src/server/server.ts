import express, { json } from "express";
import cors from "cors";
import { RoutesForValidation, ValidateEmployeeMiddleware } from "./middlewares/ValidateEmployeeMiddleware";
import cookieParser from "cookie-parser";
const express_app = express();

express_app.use(json());
express_app.use(cors({ origin: "*" }));
express_app.use(cookieParser());
express_app.use(RoutesForValidation, ValidateEmployeeMiddleware);

export { express_app };
