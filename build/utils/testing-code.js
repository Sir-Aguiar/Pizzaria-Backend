"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
const insert = async (item) => {
    const inserted = Object.assign({}, item);
    await (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.DB, "Items", item._id), inserted);
    return inserted;
};
const items = [];
items.forEach((item) => {
    insert(item).then((res) => {
        console.log(res);
    });
});
