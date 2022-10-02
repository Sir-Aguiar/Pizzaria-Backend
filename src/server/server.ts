import express, { json } from "express";
import cors from "cors";
const express_app = express();
express_app.use(json());
express_app.use(cors({ origin: "*" }));

export { express_app };
