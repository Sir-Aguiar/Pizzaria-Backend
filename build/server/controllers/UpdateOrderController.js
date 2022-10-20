"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderController = void 0;
const firestore_1 = require("firebase/firestore");
const order_1 = require("../../entities/order");
const firebase_1 = require("../../firebase");
const update_order_1 = require("../../use-cases/update-order");
const UpdateOrderController = async (req, res) => {
    const { order_id, delivery, status } = req.body;
    const name = req.header("employee") || "";
    const searched_doc = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.DB, "Orders", order_id)));
    const data = searched_doc.data();
    const order = new order_1.Order(data.items_price, data.delivery, data.status, data.client, data.items, data.payment_method, data.id);
    const updater = new update_order_1.UpdateOrder(order, { name });
    if (status) {
        return;
    }
    if (delivery) {
        await updater.changeDeliveryPrice(delivery);
        return res.status(200).send("DONE");
    }
};
exports.UpdateOrderController = UpdateOrderController;
