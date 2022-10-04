import { Request, Response } from "express";
import { getDoc, doc, DocumentSnapshot } from "firebase/firestore";
import { Order } from "../../entities/order";
import { DB } from "../../firebase";
import { UpdateOrder } from "../../use-cases/update-order";

export const UpdateDeliveryController = async (req: Request, res: Response) => {
  const { order_id, delivery, status } = req.body;
  const name = req.header("employee") || "";
  const searched_doc = (await getDoc(doc(DB, "Orders", order_id))) as DocumentSnapshot<Order>;
  if (searched_doc.exists()) {
    const data = searched_doc.data();
    // COde in here
  }
  // Error
};
