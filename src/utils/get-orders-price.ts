import { collection, getDocs } from "firebase/firestore";
import { DB } from "../firebase";

export const getOrdersPrice = async (items: string[]) => {
  const datas = (await getDocs(collection(DB, "Items"))).docs.map((doc) => doc.data()) as Item[];
  const preços = items.map((item) => datas.find((sub_item) => sub_item._id === item)?.price || 0);
  return preços.reduce((prev, current) => {
    return prev + current;
  }, 0);
};
