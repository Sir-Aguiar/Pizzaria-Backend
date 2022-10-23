"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.firebase_app = void 0;
require("dotenv/config");
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const firebase_app = (0, app_1.initializeApp)({
    apiKey: process.env.APIKEY,
    appId: process.env.APPID,
    authDomain: process.env.AUTHDOMAIN,
    measurementId: process.env.MEASUREMENTID,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
});
exports.firebase_app = firebase_app;
const DB = (0, firestore_1.getFirestore)(firebase_app);
exports.DB = DB;
