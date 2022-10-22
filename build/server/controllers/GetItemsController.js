"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetItemsController = void 0;
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../../firebase");
const GetItemsController = async (req, res) => {
    try {
        const items = (await (0, firestore_1.getDocs)((0, firestore_1.collection)(firebase_1.DB, "Items"))).docs.map((doc) => doc.data());
        return res.status(200).json({ items });
    }
    catch (e) {
        return res.status(500).json({ e });
    }
};
exports.GetItemsController = GetItemsController;
