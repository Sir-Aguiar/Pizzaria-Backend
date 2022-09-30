import { isEqual } from "lodash";
import { Order } from "../entities/order";

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
      if (orderData.client.phone === order.client.phone) {
        throw new Error("The same client can't make more than one order");
      }
      if (isEqual(repoLocationForCheck, orderLocationForCheck)) {
        throw new Error("Can't have more than two orders to the same address");
      }
    });
  }
  public async execute() {
    // Create the order inside here (No extra verification, only creates it)
  }
}
