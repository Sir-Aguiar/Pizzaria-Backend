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
        console.log((0, safe_1.bgYellow)((0, safe_1.green)(`${this.employee.name} changed the order ${this.order.id} status from ${this.order.status} to ${new_status}`)));
    }
    async changeDeliveryPrice(new_delivery) {
        if (this.order.status != -1) {
            throw new order_error_1.OrderError("The delivery price can't be changed after the order've been approved", "Unavaliable price change", `${this.employee.name} tried to change the price of an approved order`, new Error().stack);
        }
        // Functional code
        await (0, firestore_1.updateDoc)((0, firestore_1.doc)(firebase_1.DB, "Orders", this.order.id), {
            delivery: new_delivery,
        });
        console.log((0, safe_1.bgYellow)((0, safe_1.green)(`${this.employee.name} changed the order ${this.order.id} delivery price from ${this.order.delivery} to ${new_delivery}`)));
    }
}
exports.UpdateOrder = UpdateOrder;
