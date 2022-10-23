"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusController = void 0;
const firestore_1 = require("firebase/firestore");
const lodash_1 = require("lodash");
const order_1 = require("../../entities/order");
const firebase_1 = require("../../firebase");
const update_order_1 = require("../../use-cases/update-order");
const order_error_1 = require("../../entities/order_error");
const app_1 = require("firebase/app");
const credentials_utils_1 = require("../../utils/credentials-utils");
const UpdateStatusController = async (req, res) => {
    try {
        // Incoming data from request
        const { order_id, status } = req.body;
        const { name } = (0, credentials_utils_1.getCredentialsInfos)(req.cookies.user_credential);
        const order_document = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(firebase_1.DB, "Orders", order_id)));
        // Verifying if the data is valid
        if (!order_document.exists() || !(0, lodash_1.isNumber)(status) || !name) {
            return res.status(400).json({
                e: "Invalid data has been recieved, or we're missing a few informations, check it, and try agin later",
            });
        }
        const data = order_document.data();
        const order = new order_1.Order(data.items_price, data.delivery, data.status, data.client, data.items, data.payment_method, data._id);
        // Functional code
        const updater = new update_order_1.UpdateOrder(order, name);
        await updater.changeOrderStatus(status);
        return res.status(200).send();
    }
    catch (e) {
        // Error on Order instantiation
        if (e instanceof order_error_1.OrderError) {
            return res.status(400).json({ e: e.message });
        }
        // Unexepected type
        if (e instanceof TypeError) {
            return res.status(400).json({
                e: "Invalid data has been recieved, or we're missing a few informations, check it, and try agin later",
            });
        }
        // Firebase error
        if (e instanceof app_1.FirebaseError) {
            // Unknown error
            return res.status(510).json({ e: "An unknown error has been occurred during the execution of a functionality" });
        }
    }
};
exports.UpdateStatusController = UpdateStatusController;
