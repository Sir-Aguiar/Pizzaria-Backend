import { uniqueId } from "lodash";
import { test, expect } from "vitest";
import { Order } from "../entities/order";
import { CreateOrder } from "./create-order";
import { OrderError } from "../entities/order_error";
test("A client shoudn't be able to create more than one order", () => {
  const first_client = {
    location: {
      address: "Avenida Jurumirim",
      bairro: "Bela Vista",
      casa: "30",
      cep: "78050-194",
      reference: "Any reference",
    },
    name: "Felipe Ferreira",
    phone: "(65) 99239-1561",
  };
  const first_order = new Order(28, 8, -1, first_client, ["AA"], "Dinheiro, troco para R$200");
  const inMemoryRepository = [first_order];
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
  const order_for_error = new Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50");
  expect(() => new CreateOrder(order_for_error, inMemoryRepository)).toThrowError(OrderError);
});
test("The same location can't receive more than one order", () => {
  const first_client = {
    location: {
      address: "Rua Frei Emiliano Monteiro",
      bairro: "Carumbé",
      casa: "30",
      cep: "78050-690",
      reference: "Any reference",
    },
    name: "Felipe Ferreira",
    phone: "(65) 99239-1561",
  };
  const first_order = new Order(28, 8, -1, first_client, ["AA"], "Dinheiro, troco para R$75");
  const inMemoryRepository = [first_order];
  const client = {
    location: {
      address: "Rua Frei Emiliano Monteiro",
      bairro: "Carumbé",
      casa: "30",
      cep: "78050-690",
      reference: "Atrás dos prédios MRV, casa de portões vermelhos",
    },
    name: "Felipe Aguiar",
    phone: "(65) 99239-1562",
  };
  const order_for_error = new Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50");
  expect(() => new CreateOrder(order_for_error, inMemoryRepository)).toThrowError(OrderError);
});
test("Shoud be able to instanciate it", () => {
  const first_client = {
    location: {
      address: "Rua Frei Emiliano Monteiro",
      bairro: "Carumbé",
      casa: "30",
      cep: "78050-690",
      reference: "Any reference",
    },
    name: "Felipe Ferreira",
    phone: "(65) 99239-1561",
  };
  const first_order = new Order(28, 8, -1, first_client, ["AA"], "Dinheiro, troco para R$75");
  const inMemoryRepository = [first_order];
  const client = {
    location: {
      address: "Avenida Jurumirim",
      bairro: "Bela Vista",
      casa: "30",
      cep: "78050-194",
      reference: "Any reference",
    },
    name: "Felipe Aguiar",
    phone: "(65) 99239-1562",
  };
  const order_to_go = new Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50");
  expect(new CreateOrder(order_to_go, inMemoryRepository)).toBeInstanceOf(CreateOrder);
});
