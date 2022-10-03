import { Router } from "express";
import { CreateOrderController } from "./controllers/CreateOrderController";

const routes = Router();

routes.post("/create-order", CreateOrderController);

export { routes };
