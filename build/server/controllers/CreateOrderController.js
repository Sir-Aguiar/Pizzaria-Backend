"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderController = void 0;
const firestore_1 = require("firebase/firestore");
const order_1 = require("../../entities/order");
const firebase_1 = require("../../firebase");
const create_order_1 = require("../../use-cases/create-order");
const uniqid_1 = __importDefault(require("uniqid"));
const order_error_1 = require("../../entities/order_error");
const app_1 = require("firebase/app");
const get_orders_price_1 = require("../../utils/get-orders-price");
const CreateOrderController = async (req, res) => {
    const { delivery, status, client, items, payment_method } = req.body;
    try {
        const orders_repo = (await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.DB, "Orders"))).docs.map((ord) => ord.data());
        // Objects instances
        const new_order = new order_1.Order(await (0, get_orders_price_1.getOrdersPrice)(items), delivery, status, client, items, payment_method, (0, uniqid_1.default)());
        const creation = new create_order_1.CreateOrder(new_order, orders_repo);
        const inserted_order = await creation.execute();
        return res.status(201).json({ inserted_order });
    }
    catch (e) {
        if (e instanceof order_error_1.OrderError) {
            e.logIt();
            return res.status(400).json({
                error: e.props,
            });
        }
        if (e instanceof app_1.FirebaseError) {
            return res.status(500).json(e);
        }
        return res.status(504).json({ e });
    }
};
exports.CreateOrderController = CreateOrderController;
