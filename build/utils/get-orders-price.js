"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersPrice = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
const getOrdersPrice = async (items_ids) => {
    // Query process
    const query_res = (await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.DB, "Items")));
    const products = query_res.docs.map((product) => product.data());
    // Filtering
    const reducerFn = (prev, current) => Number((prev + current).toFixed(2));
    const preços = items_ids.map((item_id) => products.find((db_item) => db_item._id === item_id)?.price || 0);
    return preços.reduce(reducerFn, 0);
};
exports.getOrdersPrice = getOrdersPrice;
