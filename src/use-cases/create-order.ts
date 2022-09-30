import { collection, getDocs, QuerySnapshot, where } from "firebase/firestore";
import { isEqual } from "lodash";
import { Order } from "../entities/order";
import { DB } from "../firebase";

export class CreateOrder {
  private readonly orders = getDocs(collection(DB, "Orders")) as Promise<QuerySnapshot<Order>>;
  constructor(private order: Order) {}
  private async checkValidity() {
    const docs = (await this.orders).docs;
    docs.forEach((doc) => {
      const docData = doc.data();
      const docLocation = {
        address: docData.client.location.address,
        bairro: docData.client.location.bairro,
        casa: docData.client.location.casa,
      };
      const clientLocation = {
        address: this.order.client.location.address,
        bairro: this.order.client.location.bairro,
        casa: this.order.client.location.casa,
      };
      if (docData.client.phone === this.order.client.phone) {
        throw new Error("The same client can't make more than one order");
      }
      if (isEqual(docLocation, clientLocation)) {
        throw new Error("Can't have more than two orders to the same address");
      }
    });
    return true;
  }
  public async execute() {
    if (await this.checkValidity()) {
      // Implementation code
    }
  }
}
