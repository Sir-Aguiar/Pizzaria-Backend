import { Request, Response } from "express";
import { collection, getDocs } from "firebase/firestore";
import { DB } from "../../firebase";

export const GetItemsController = async (req: Request, res: Response) => {
  try {
    const items = (await getDocs(collection(DB, "Items"))).docs.map((doc) => doc.data()) as Item[];
    return res.status(200).json({ items });
  } catch (e) {
    return res.status(500).json({ e });
  }
};
