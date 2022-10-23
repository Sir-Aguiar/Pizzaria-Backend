"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrder = void 0;
const order_error_1 = require("../entities/order_error");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
const safe_1 = require("colors/safe");
class UpdateOrder {
    constructor(order, employee) {
        this.order = order;
        this.employee = employee;
    }
    async changeOrderStatus(new_status) {
        // Functional code
        await (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.DB, "Orders", this.order.id), {
            status: new_status,
        });
        const message = `${this.employee} changed the order ${this.order.id} status from ${this.order.status} to ${new_status}`;
        console.log((0, safe_1.bgYellow)((0, safe_1.green)(message)));
    }
    async changeDeliveryPrice(new_delivery) {
        // Checking order avaliability
        if (this.order.status != -1) {
            throw new order_error_1.OrderError("The delivery price can't be changed after the order've been approved", "Unavaliable price change", `${this.employee} tried to change the price of an approved order`, new Error().stack);
        }
        // Functional code
        await (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.DB, "Orders", this.order.id), {
            delivery: new_delivery,
        });
        const message = `${this.employee} changed the order ${this.order.id} delivery price from ${this.order.delivery} to ${new_delivery}`;
        console.log((0, safe_1.bgYellow)((0, safe_1.green)(message)));
    }
}
exports.UpdateOrder = UpdateOrder;
