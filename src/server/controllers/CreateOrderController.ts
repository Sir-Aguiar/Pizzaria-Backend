import { Request, Response } from "express";
import { getDocs, collection } from "firebase/firestore";
import { Order } from "../../entities/order";
import { DB } from "../../firebase";
import { CreateOrder } from "../../use-cases/create-order";
import uniqid from "uniqid";
import { OrderError } from "../../entities/order_error";
import { FirebaseError } from "firebase/app";
import { getOrdersPrice } from "../../utils/get-orders-price";

export const CreateOrderController = async (req: Request, res: Response) => {
  const { delivery, status, client, items, payment_method } = req.body;

  try {
    const orders_repo = (await getDocs(collection(DB, "Orders"))).docs.map((ord) => ord.data()) as Order[];
    // Objects instances
    const new_order = new Order(await getOrdersPrice(items), delivery, status, client, items, payment_method, uniqid());
    const creation = new CreateOrder(new_order, orders_repo);

    const inserted_order = await creation.execute();
    return res.status(201).json({ inserted_order });
  } catch (e: any) {
    if (e instanceof OrderError) {
      e.logIt();
      return res.status(400).json({
        error: e.props,
      });
    }
    if (e instanceof FirebaseError) {
      return res.status(500).json(e);
    }
    return res.status(504).json({ e });
  }
};
