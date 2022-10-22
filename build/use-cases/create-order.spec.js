"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const vitest_1 = require("vitest");
const order_1 = require("../entities/order");
const create_order_1 = require("./create-order");
const order_error_1 = require("../entities/order_error");
(0, vitest_1.test)("A client shoudn't be able to create more than one order", () => {
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
    const first_order = new order_1.Order(28, 8, -1, first_client, ["AA"], "Dinheiro, troco para R$200", (0, lodash_1.uniqueId)());
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
    const order_for_error = new order_1.Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50", (0, lodash_1.uniqueId)());
    (0, vitest_1.expect)(() => new create_order_1.CreateOrder(order_for_error, inMemoryRepository)).toThrowError(order_error_1.OrderError);
});
(0, vitest_1.test)("The same location can't receive more than one order", () => {
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
    const first_order = new order_1.Order(28, 8, -1, first_client, ["AA"], "Dinheiro, troco para R$75", (0, lodash_1.uniqueId)());
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
    const order_for_error = new order_1.Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50", (0, lodash_1.uniqueId)());
    (0, vitest_1.expect)(() => new create_order_1.CreateOrder(order_for_error, inMemoryRepository)).toThrowError(order_error_1.OrderError);
});
(0, vitest_1.test)("Shoud be able to instanciate it", () => {
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
    const first_order = new order_1.Order(28, 8, -1, first_client, ["AA"], "Dinheiro, troco para R$75", (0, lodash_1.uniqueId)());
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
    const order_to_go = new order_1.Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50", (0, lodash_1.uniqueId)());
    (0, vitest_1.expect)(new create_order_1.CreateOrder(order_to_go, inMemoryRepository)).toBeInstanceOf(create_order_1.CreateOrder);
});
(0, vitest_1.test)("Shoudn't be able to instantiate two orders with the same ID", () => {
    const common_id = (0, lodash_1.uniqueId)();
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
    const first_order = new order_1.Order(28, 8, -1, first_client, ["AA"], "Dinheiro, troco para R$75", common_id);
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
    const order_for_error = new order_1.Order(28, 8, -1, client, ["A"], "Dinheiro, troco para R$50", common_id);
    (0, vitest_1.expect)(() => new create_order_1.CreateOrder(order_for_error, inMemoryRepository)).toThrowError(order_error_1.OrderError);
});
