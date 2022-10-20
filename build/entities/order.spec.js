"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const vitest_1 = require("vitest");
const order_1 = require("./order");
const order_error_1 = require("./order_error");
(0, vitest_1.test)("Shoudn't be able to create with empty items", () => {
    (0, vitest_1.expect)(() => new order_1.Order(25.9, 7.9, -1, {
        location: {
            address: "Rua Frei Emiliano Monteiro",
            bairro: "Carumbé",
            casa: "30",
            cep: "78050-690",
            reference: "Atrás dos prédios MRV, casa de portões vermelhos",
        },
        name: "Felipe Aguiar",
        phone: "(65) 99239-1561",
    }, [], "Dinheiro, troco pra R$ 50", (0, lodash_1.uniqueId)())).toThrowError(order_error_1.OrderError);
});
(0, vitest_1.test)("Shoudn't create without proper user", () => {
    (0, vitest_1.expect)(() => new order_1.Order(25.9, 7.9, -1, {
        location: {
            address: "Rua Frei Emiliano Monteiro",
            bairro: "Carumbé",
            casa: "30",
            cep: "78050-690",
            reference: "",
        },
        name: "Felipe Aguiar",
        phone: "(65) 99239-1561",
    }, ["a", "a"], "Dinheiro, troco pra R$ 50", (0, lodash_1.uniqueId)())).toThrowError(order_error_1.OrderError);
});
(0, vitest_1.test)("Shoudn't create without proper user", () => {
    (0, vitest_1.expect)(() => new order_1.Order(25.9, 7.9, -1, {
        location: {
            address: "Rua Frei Emiliano Monteiro",
            bairro: "Carumbé",
            casa: "30",
            cep: "78050-690",
            reference: "Any reference",
        },
        name: "Felipe Aguiar",
        phone: "",
    }, ["a", "a"], "Dinheiro, troco pra R$ 50", (0, lodash_1.uniqueId)())).toThrowError(order_error_1.OrderError);
});
(0, vitest_1.test)("Shoudn't create without proper user", () => {
    (0, vitest_1.expect)(() => new order_1.Order(25.9, 7.9, -1, {
        location: {
            address: "Rua Frei Emiliano Monteiro",
            bairro: "Carumbé",
            casa: "30",
            cep: "78050-690",
            reference: "Any reference",
        },
        name: "Felipe Aguiar",
        phone: "(65) 99239-1561",
    }, ["a", "a"], "", (0, lodash_1.uniqueId)())).toThrowError(order_error_1.OrderError);
});
(0, vitest_1.test)("Shoud be able to instanciate an Order", () => {
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
    const order = new order_1.Order(25.9, 7.9, -1, client, ["a", "a"], "Dinheiro, troco pra R$ 50", (0, lodash_1.uniqueId)());
    (0, vitest_1.expect)(order).toBeInstanceOf(order_1.Order);
});
