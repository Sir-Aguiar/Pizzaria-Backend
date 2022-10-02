import { Order } from "../entities/order";
import { isEqual } from "lodash";
import { OrderError } from "../entities/order_error";

export class UpdateOrder {
  constructor(private readonly order: Order, private readonly employee: EmployeeCredential) {}
  public changeOrderStatus(new_status: number) {
    // Implements the code in here
  }
  public changeDeliveryPrice(new_delivery: number) {
    if (this.order.status != -1) {
      throw new OrderError(
        "The delivery price can't be changed after the order've been approved",
        "Unavaliable price change",
        `${this.employee.name} tried to change the price of an approved order`,
        new Error().stack
      );
    }
    // Implements the code in here
  }
}
