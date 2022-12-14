import { OrderError } from "./order_error";
export class Order {
  private readonly created_at = new Date();

  constructor(
    public items_price: number,
    public delivery: number,
    public status: -1 | 0 | 1 | 2 | -2,
    public client: Client,
    public items: string[],
    public payment_method: string,
    public readonly _id: string
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
    if (items_price === 0 || typeof items_price != "number") {
      throw new OrderError(
        "Insert valid items, so it can be correctly priced",
        "Invalid items price",
        "Tried to get items wich are no registered",
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
