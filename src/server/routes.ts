import { Router } from "express";
import { CreateOrderController } from "./controllers/CreateOrderController";
import { UpdateDeliveryController } from "./controllers/UpdateDeliveryController";
import { UpdateStatusController } from "./controllers/UpdateStatusController";

const routes = Router();

routes.post("/create-order", CreateOrderController);
routes.put("/update-delivery", UpdateDeliveryController);
routes.put("/update-status", UpdateStatusController);
export { routes };
