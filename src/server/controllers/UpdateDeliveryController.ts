import { Request, Response } from "express";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { DB } from "../../firebase";
import { Order } from "../../entities/order";
import { isNumber } from "lodash";
import { UpdateOrder } from "../../use-cases/update-order";
import { OrderError } from "../../entities/order_error";

export const UpdateDeliveryController = async (req: Request, res: Response) => {
  // Incoming data from request
  const { order_id, delivery } = req.body;
  const employee_name = req.header("employee") || "";
  try {
    const order_document = (await getDoc(doc(DB, "Orders", order_id))) as DocumentSnapshot<Order>;
    if (order_document.exists() && isNumber(delivery) && employee_name) {
      const data = order_document.data();
      const order = new Order(
        data.items_price,
        data.delivery,
        data.status,
        data.client,
        data.items,
        data.payment_method,
        data._id
      );
      const updater = new UpdateOrder(order, { name: employee_name });
      await updater.changeDeliveryPrice(delivery);
      return res.status(200).send();
    }
  } catch (e) {
    if (e instanceof OrderError) {
      return res.status(401).json({ e: e.message });
    }
  }
};
