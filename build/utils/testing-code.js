"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase/firestore");
const firebase_1 = require("../firebase");
const uniqid_1 = __importDefault(require("uniqid"));
const insert = async (item) => {
    const inserted = Object.assign({}, item);
    await (0, firestore_1.setDoc)((0, firestore_1.doc)(firebase_1.DB, "Items", item._id), inserted);
    return inserted;
};
const items = [
    {
        _id: (0, uniqid_1.default)("burger-"),
        image: "https://freepngimg.com/save/77390-king-whopper-hamburger-grill-big-cheeseburger-burger/500x540",
        name: "Bacon-Cheese BBQ",
        price: 22.9,
    },
    {
        _id: (0, uniqid_1.default)("burger-"),
        image: "https://freepngimg.com/save/10722-burger-free-download-png/2126x1535",
        name: "Baguncinha",
        price: 8.9,
    },
    {
        _id: (0, uniqid_1.default)("burger-"),
        image: "https://wawburger.nl/wp-content/uploads/2020/02/Classic-Chicken-800-540x540.png",
        name: "Chicken Burger",
        price: 11.9,
    },
    {
        _id: (0, uniqid_1.default)("burger-"),
        image: "https://images.vectorhq.com/images/previews/487/big-burger-psd-439986.png",
        name: "Big Burger",
        price: 16.9,
    },
    {
        _id: (0, uniqid_1.default)("burger-"),
        image: "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG4135.png",
        name: "Mega Burger BBQ",
        price: 18.9,
    },
];
items.forEach((item) => {
    insert(item).then((res) => {
        console.log(res);
    });
});
