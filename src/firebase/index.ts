import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebase_app = initializeApp({
  apiKey: process.env.APIKEY,
  appId: process.env.APPID,
  authDomain: process.env.AUTHDOMAIN,
  measurementId: process.env.MEASUREMENTID,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
});
const DB = getFirestore(firebase_app);
export { firebase_app, DB };
