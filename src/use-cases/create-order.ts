import { collection, doc, getDocs, QuerySnapshot, setDoc } from "firebase/firestore";
import { isEqual, uniqueId } from "lodash";
import { Order } from "../entities/order";
import { OrderError } from "../entities/order_error";
import { DB } from "../firebase";

export class CreateOrder {
  constructor(private readonly order: Order, orderRepository: Order[]) {
    const orderLocationForCheck = {
      address: order.client.location.address,
      bairro: order.client.location.bairro,
      casa: order.client.location.casa,
    };
    orderRepository.forEach((orderData) => {
      const repoLocationForCheck = {
        address: orderData.client.location.address,
        bairro: orderData.client.location.bairro,
        casa: orderData.client.location.casa,
      };
      if (orderData.id == order.id) {
        throw new OrderError(
          "You can't create and order with this ID",
          "Unavaliable ID",
          "The order you tried to create has it's id already taken",
          new Error().stack
        );
      }
      if (orderData.client.phone === order.client.phone) {
        throw new OrderError(
          "This client is not avaible to make another order",
          "Unavaliable client",
          "The same client can't make more than one order",
          new Error().stack
        );
      }
      if (isEqual(repoLocationForCheck, orderLocationForCheck)) {
        throw new OrderError(
          "This location has already an order attached",
          "Unavaliable location",
          "Can't have more than two orders to the same address",
          new Error().stack
        );
      }
    });
  }
  public async execute() {
    const insertedOrder = Object.assign({}, this.order);
    await setDoc(doc(DB, "Orders", this.order.id), insertedOrder);
    return insertedOrder;
  }
}
