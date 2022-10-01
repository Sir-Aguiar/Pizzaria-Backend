import { it, test, expect } from "vitest";
import { Order } from "./order";
import { OrderError } from "./order_error";
test("Shoudn't be able to create with empty items", () => {
  expect(
    () =>
      new Order(
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
      )
  ).toThrowError(OrderError);
});
test("Shoudn't create without proper user", () => {
  expect(
    () =>
      new Order(
        25.9,
        7.9,
        -1,
        {
          location: {
            address: "Rua Frei Emiliano Monteiro",
            bairro: "Carumbé",
            casa: "30",
            cep: "78050-690",
            reference: "",
          },
          name: "Felipe Aguiar",
          phone: "(65) 99239-1561",
        },
        ["a", "a"],
        "Dinheiro, troco pra R$ 50"
      )
  ).toThrowError(OrderError);
});

test("Shoudn't create without proper user", () => {
  expect(
    () =>
      new Order(
        25.9,
        7.9,
        -1,
        {
          location: {
            address: "Rua Frei Emiliano Monteiro",
            bairro: "Carumbé",
            casa: "30",
            cep: "78050-690",
            reference: "Any reference",
          },
          name: "Felipe Aguiar",
          phone: "",
        },
        ["a", "a"],
        "Dinheiro, troco pra R$ 50"
      )
  ).toThrowError(OrderError);
});

test("Shoudn't create without proper user", () => {
  expect(
    () =>
      new Order(
        25.9,
        7.9,
        -1,
        {
          location: {
            address: "Rua Frei Emiliano Monteiro",
            bairro: "Carumbé",
            casa: "30",
            cep: "78050-690",
            reference: "Any reference",
          },
          name: "Felipe Aguiar",
          phone: "(65) 99239-1561",
        },
        ["a", "a"],
        ""
      )
  ).toThrowError(OrderError);
});

test("Shoud be able to instanciate an Order", () => {
  const client = {
    location: {
      address: "Rua Frei Emiliano Monteiro",
      bairro: "Carumbé",
      casa: "30",
      cep: "78050-690",
      reference: "Any reference",
    },
    name: "Felipe Aguiar",
    phone: "(65) 99239-1561",
  };
  const order = new Order(25.9, 7.9, -1, client, ["a", "a"], "Dinheiro, troco pra R$ 50");
  expect(order).toBeInstanceOf(Order);
});
