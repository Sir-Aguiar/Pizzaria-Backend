"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrder = void 0;
const safe_1 = require("colors/safe");
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
class DeleteOrder {
    constructor(employee, order_id) {
        this.employee = employee;
        this.order_id = order_id;
    }
    async execute() {
        await (0, firestore_1.deleteDoc)((0, firestore_1.doc)(firebase_1.DB, "Orders", this.order_id));
        console.log((0, safe_1.bgYellow)((0, safe_1.green)(`${this.employee} deleted the order ${this.order_id}`)));
    }
}
exports.DeleteOrder = DeleteOrder;
