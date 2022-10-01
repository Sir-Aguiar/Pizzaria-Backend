import uniqid from "uniqid";
import { OrderError } from "./order_error";
export class Order {
  private readonly _id = uniqid();
  private readonly created_at = new Date();

  constructor(
    public price: number,
    public delivery: number,
    public status: 0 | 1 | -1,
    public client: Client,
    public items: any[],
    public payment_method: string
  ) {
    if (items.length <= 0) {
      throw new OrderError(
        "Cannot create an order without items to order",
        "No items",
        "Error on instantiating an Order object without items",
        new Error().stack
      );
    }
    Object.values(client).forEach((value) => {
      if (!value) {
        throw new OrderError(
          "Your client is not valid, check your data",
          "Invalid user",
          "Tried to instantiate an Order object with an invalid client",
          new Error().stack
        );
      }
    });
    Object.values(client.location).forEach((value) => {
      if (!value) {
        throw new OrderError(
          "This location is not valid, check your data",
          "Invalid location",
          "Tried to instantiate an Order object with invalid location",
          new Error().stack
        );
      }
    });
    if (!payment_method) {
      throw new OrderError(
        "Insert a payment method",
        "Invalid payment",
        "Tried to instantiate and Order object with invalid payment_method",
        new Error().stack
      );
    }
  }
  get id() {
    return this._id;
  }
  get created() {
    return this.created_at;
  }
}
