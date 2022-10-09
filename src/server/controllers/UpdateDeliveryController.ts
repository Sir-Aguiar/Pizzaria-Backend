import { Request, Response } from "express";
import { doc, getDoc, DocumentSnapshot } from "firebase/firestore";
import { DB } from "../../firebase";
import { Order } from "../../entities/order";
import { isNumber } from "lodash";
import { UpdateOrder } from "../../use-cases/update-order";
import { OrderError } from "../../entities/order_error";
import { decryptMessage } from "../../utils/crypto";

export const UpdateDeliveryController = async (req: Request, res: Response) => {
  // Incoming data from request
  const { order_id, delivery } = req.body;
  const { user_credential } = req.cookies;
  const credential: string[] = user_credential.split("^/^");
  const name = decryptMessage(credential[0]);
  try {
    const order_document = (await getDoc(doc(DB, "Orders", order_id))) as DocumentSnapshot<Order>;
    if (order_document.exists() && isNumber(delivery) && name) {
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
      const updater = new UpdateOrder(order, { name });
      await updater.changeDeliveryPrice(delivery);
      return res.status(200).send();
    }
  } catch (e) {
    if (e instanceof OrderError) {
      return res.status(401).json({ e: e.message });
    }
  }
};
