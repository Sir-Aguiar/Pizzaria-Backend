import { Order } from "../entities/order";
import { isEqual } from "lodash";
import { OrderError } from "../entities/order_error";
import { doc, updateDoc } from "firebase/firestore";
import { DB } from "../firebase";

export class UpdateOrder {
  constructor(private readonly order: Order, private readonly employee: EmployeeCredential) {}
  public async changeOrderStatus(new_status: number) {
    // Implements the code in here
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
    await updateDoc(doc(DB, "Orders", this.order.id), {
      delivery: new_delivery,
    });
  }
}
const client = {
  location: {
    address: "Avenida Jurumirim",
    bairro: "Bela Vista",
    casa: "30",
    cep: "78050-194",
    reference: "Any reference",
  },
  name: "Felipe Aguiar",
  phone: "(65) 99239-1563",
};
const order_to_update = new Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50", "1buyci51ol8t623t7");
const updateOrder = new UpdateOrder(order_to_update, { name: "Felipe Aguiar" });
updateOrder.changeDeliveryPrice(6);
