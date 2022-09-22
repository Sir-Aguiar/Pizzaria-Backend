export class Order {
  private readonly _id = "123456";
  private readonly created_at = new Date();

  constructor(
    public price: number,
    public delivery: number,
    public status: 0 | 1 | -1,
    public client: Client,
    public items: [],
    public payment_method: string
  ) {}
}
