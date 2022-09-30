import { test, expect } from "vitest";
import { Order } from "../entities/order";
import { CreateOrder } from "./create-order";
test("A client shoudn't be able to create more than one order", () => {
  const client = {
    location: {
      address: "Rua Frei Emiliano Monteiro",
      bairro: "Carumbé",
      casa: "30",
      cep: "78050-690",
      reference: "Atrás dos prédios MRV, casa de portões vermelhos",
    },
    name: "Felipe Aguiar",
    phone: "(65) 99239-1561",
  };
  const order_to_error = new Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50");
  const create_order = new CreateOrder(order_to_error);
  expect(create_order.execute()).resolves.toThrowError("The same client can't make more than one order");
});

test("An address shoudn't be able to receive more than one order", () => {
  const client = {
    location: {
      address: "Rua Frei Emiliano Monteiro",
      bairro: "Carumbé",
      casa: "30",
      cep: "78050-690",
      reference: "Any reference",
    },
    name: "Felipe Ferreira",
    phone: "(65) 99239-1562",
  };
  const order_to_error = new Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50");
  const create_order = new CreateOrder(order_to_error);
  expect(create_order.execute()).resolves.toThrowError("Can't have more than two orders to the same address");
});
