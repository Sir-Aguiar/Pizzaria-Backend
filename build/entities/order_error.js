"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderError = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
class OrderError {
    constructor(message, error_name, cause, stack) {
        this.message = message;
        this.error_name = error_name;
        this.cause = cause;
        this.stack = stack;
    }
    async register() {
        const errors_collection = (0, firestore_1.collection)(firebase_1.DB, "ReigsteredOrders");
        const addedDoc = await (0, firestore_1.addDoc)(errors_collection, Object.assign({}, this.props));
        console.log(`${this.error_name} has been saved as ${addedDoc.id}`);
    }
    logIt() {
        console.log({
            message: this.message,
            name: this.error_name,
            cause: this.cause,
            stack: this.stack,
        });
    }
    get props() {
        return {
            message: this.message,
            name: this.error_name,
            cause: this.cause,
            stack: this.stack,
        };
    }
}
exports.OrderError = OrderError;
