import { Request, Response } from "express";
import { getDocs, collection, QuerySnapshot } from "firebase/firestore";
import { Order } from "../../entities/order";
import { DB } from "../../firebase";
import { CreateOrder } from "../../use-cases/create-order";
import uniqid from "uniqid";

export const CreateOrderController = async (req: Request, res: Response) => {
  const { items_price, delivery, status, client, items, payment_method } = req.body;
  const orders_repo = (await getDocs(collection(DB, "Orders"))).docs.map((ord) => ord.data()) as Order[];

  try {
    const new_order = new Order(items_price, delivery, status, client, items, payment_method, uniqid());
    const creation = new CreateOrder(new_order, orders_repo);

    try {
      const inserted_order = await creation.execute();
      return res.status(201).json({ inserted_order });
    } catch (e) {
      // Errors in new CreateOrder().execute()
      return res.status(500).json(e);
    }
  } catch (e: any) {
    // Errors in new Order() e new CreateOrder()
    e.logIt();
    return res.status(400).json({
      error: e.props,
    });
  }
};
