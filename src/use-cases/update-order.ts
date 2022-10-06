import { Order } from "../entities/order";
import { OrderError } from "../entities/order_error";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../firebase";
import { bgYellow, green } from "colors/safe";

export class UpdateOrder {
  constructor(private readonly order: Order, private readonly employee: EmployeeCredential) {}
  public async changeOrderStatus(new_status: number) {
    // Functional code
    await updateDoc(doc(DB, "Orders", this.order.id), {
      status: new_status,
    });

    console.log(
      bgYellow(
        green(
          `${this.employee.name} changed the order ${this.order.id} status from ${this.order.status} to ${new_status}`
        )
      )
    );
  }
  public async changeDeliveryPrice(new_delivery: number) {
    if (this.order.status != -1) {
      throw new OrderError(
        "The delivery price can't be changed after the order've been approved",
        "Unavaliable price change",
        `${this.employee.name} tried to change the price of an approved order`,
        new Error().stack
      );
    }

    // Functional code
    await updateDoc(doc(DB, "Orders", this.order.id), {
      delivery: new_delivery,
    });

    console.log(
      bgYellow(
        green(
          `${this.employee.name} changed the order ${this.order.id} delivery price from ${this.order.delivery} to ${new_delivery}`
        )
      )
    );
  }
}
