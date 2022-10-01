import { isEqual } from "lodash";
import { Order } from "../entities/order";
import { OrderError } from "../entities/order_error";

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
    // Create the order inside here (No extra verification, only creates it)
  }
}
