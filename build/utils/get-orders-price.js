"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersPrice = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
const getOrdersPrice = async (items) => {
    const datas = (await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.DB, "Items"))).docs.map((doc) => doc.data());
    const preços = items.map((item) => datas.find((sub_item) => sub_item._id === item)?.price || 0);
    return preços.reduce((prev, current) => {
        return prev + current;
    }, 0);
};
exports.getOrdersPrice = getOrdersPrice;
