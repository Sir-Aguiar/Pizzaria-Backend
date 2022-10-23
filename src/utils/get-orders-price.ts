import { collection, DocumentData, getDocs, QuerySnapshot } from "firebase/firestore";
import { DB } from "../firebase";

export const getOrdersPrice = async (items_ids: string[]) => {
  // Query process
  const query_res = (await getDocs(collection(DB, "Items"))) as QuerySnapshot<Item>;
  const products = query_res.docs.map((product) => product.data());

  // Filtering
  const reducerFn = (prev: number, current: number) => Number((prev + current).toFixed(2));

  const preços = items_ids.map((item_id) => products.find((db_item) => db_item._id === item_id)?.price || 0);
  return preços.reduce(reducerFn, 0);
};

