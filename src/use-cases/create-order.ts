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
    try {
      return setDoc(doc(DB, "Orders", this.order.id), Object.assign({}, this.order));
    } catch (e: any) {
      // Error handling
    }
  }
}

/* const testRepo = getDocs(collection(DB, "Orders")) as Promise<QuerySnapshot<Order>>;

testRepo.then((result) => {
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
  const order_to_go = new Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50");
  const new_order = new CreateOrder(
    order_to_go,
    result.docs.map((file) => file.data())
  );
  new_order.execute();
});
 */
