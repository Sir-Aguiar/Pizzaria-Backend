import { expect, test } from "vitest";
import { Order } from "../entities/order";
import { CreateOrder } from "./create-order";

test("Shoudn't be able to create with empty items", () => {
  const order = new Order(
    25.9,
    7.9,
    -1,
    {
      location: {
        address: "Rua Frei Emiliano Monteiro",
        bairro: "Carumbé",
        casa: "30",
        cep: "78050-690",
        reference: "Atrás dos prédios MRV, casa de portões vermelhos",
      },
      name: "Felipe Aguiar",
      phone: "(65) 99239-1561",
    },
    [],
    "Dinheiro, troco pra R$ 50"
  );
  expect(() => new CreateOrder().execute(order)).toThrow();
});
