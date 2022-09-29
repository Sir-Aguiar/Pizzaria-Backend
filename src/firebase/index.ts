import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'dotenv/config'
const app = initializeApp({
  apiKey: process.env.APIKEY,
  appId: process.env.APPID,
  authDomain: process.env.AUTHDOMAIN,
  measurementId: process.env.MEASUREMENTID,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
});
const DB = getFirestore(app);
export { app, DB };
