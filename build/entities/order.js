"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const order_error_1 = require("./order_error");
class Order {
    constructor(items_price, delivery, status, client, items, payment_method, _id) {
        this.items_price = items_price;
        this.delivery = delivery;
        this.status = status;
        this.client = client;
        this.items = items;
        this.payment_method = payment_method;
        this._id = _id;
        this.created_at = new Date();
        if (items.length <= 0) {
            throw new order_error_1.OrderError("Cannot create an order without items to order", "No items", "Error on instantiating an Order object without items", new Error().stack);
        }
        Object.values(client).forEach((value) => {
            if (!value) {
                throw new order_error_1.OrderError("Your client is not valid, check your data", "Invalid user", "Tried to instantiate an Order object with an invalid client", new Error().stack);
            }
        });
        Object.values(client.location).forEach((value) => {
            if (!value) {
                throw new order_error_1.OrderError("This location is not valid, check your data", "Invalid location", "Tried to instantiate an Order object with invalid location", new Error().stack);
            }
        });
        if (!payment_method) {
            throw new order_error_1.OrderError("Insert a payment method", "Invalid payment", "Tried to instantiate and Order object with invalid payment_method", new Error().stack);
        }
        if (items_price === 0 || typeof items_price != "number") {
            throw new order_error_1.OrderError("Insert valid items, so it can be correctly priced", "Invalid items price", "Tried to get items wich are no registered", new Error().stack);
        }
    }
    get id() {
        return this._id;
    }
    get created() {
        return this.created_at;
    }
}
exports.Order = Order;
