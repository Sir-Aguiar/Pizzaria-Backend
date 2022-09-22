import { Order } from "../entities/order";

export class CreateOrder {
  public execute(order: Order) {
    if (order.items.length <= 0) {
      throw new Error("Cannot create an order without items to order");
    }
  }
}
