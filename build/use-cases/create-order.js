"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrder = void 0;
const firestore_1 = require("firebase/firestore");
const lodash_1 = require("lodash");
const order_error_1 = require("../entities/order_error");
const firebase_1 = require("../firebase");
class CreateOrder {
    constructor(order, orderRepository) {
        this.order = order;
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
            // Redundant id check
            if (orderData.id == order.id) {
                throw new order_error_1.OrderError("You can't create and order with this ID", "Unavaliable ID", "The order you tried to create has it's id already taken", new Error().stack);
            }
            // Checking if clients are unique
            if (orderData.client.phone === order.client.phone) {
                throw new order_error_1.OrderError("This client is not avaible to make another order", "Unavaliable client", "The same client can't make more than one order", new Error().stack);
            }
            // Checking location valiability
            if ((0, lodash_1.isEqual)(repoLocationForCheck, orderLocationForCheck)) {
                throw new order_error_1.OrderError("This location has already an order attached", "Unavaliable location", "Can't have more than two orders to the same address", new Error().stack);
            }
        });
    }
    async execute() {
        const insertedOrder = Object.assign({}, this.order);
        await (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.DB, "Orders", this.order.id), insertedOrder);
        return insertedOrder;
    }
}
exports.CreateOrder = CreateOrder;
