import express, { json } from "express";
import cors from "cors";
import { RoutesForValidation, ValidateEmployeeMiddleware } from "./middlewares/ValidateEmployeeMiddleware";
const express_app = express();
express_app.use(json());
express_app.use(RoutesForValidation, ValidateEmployeeMiddleware);
express_app.use(cors({ origin: "*" }));

export { express_app };
