import { Request, Response } from "express";
import { getDoc, doc, DocumentSnapshot } from "firebase/firestore";
import { isNumber } from "lodash";
import { Order } from "../../entities/order";
import { DB } from "../../firebase";
import { UpdateOrder } from "../../use-cases/update-order";
import { OrderError } from "../../entities/order_error";
import { FirebaseError } from "firebase/app";
import { decryptMessage, getCredentialsInfos } from "../../utils/crypto";

export const UpdateStatusController = async (req: Request, res: Response) => {
  // Incoming data from request
  const { order_id, status } = req.body;
  const { name } = getCredentialsInfos(req.cookies.user_credential);
  try {
    const order_document = (await getDoc(doc(DB, "Orders", order_id))) as DocumentSnapshot<Order>;

    // Verifying if the data is valid
    if (!order_document.exists() || !isNumber(status) || !name) {
      return res.status(404).json({
        e: "Invalid data has been recieved, or we're missing a few informations, check it, and try agin later",
      });
    }

    // Functional code
    const data = order_document.data()!;
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
    await updater.changeOrderStatus(status);
    return res.status(200).send();
  } catch (e: any) {
    if (e instanceof OrderError) {
      return res.status(400).json({ e: e.message });
    }
    if (e instanceof FirebaseError) {
      // Unknown error
      return res.status(510).json({ e: "An unknown error has been occurred during the execution of a functionality" });
    }
  }
};
