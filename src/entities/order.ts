export class Order {
  private readonly _id = Math.random() * 9999;
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
      throw new Error("Cannot create an order without items to order");
    }
    Object.values(client.location).forEach((value) => {
      if (!value) {
        throw new Error("Invalid location");
      }
    });
    Object.values(client).forEach((value) => {
      if (!value) {
        throw new Error("Invalid user");
      }
    });
    if (!payment_method) {
      throw new Error("Insert a payment method");
    }
  }
  get id() {
    return this._id;
  }
  get created() {
    return this.created_at;
  }
}
