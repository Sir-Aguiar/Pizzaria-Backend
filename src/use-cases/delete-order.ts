import { bgYellow, green } from "colors/safe";
import { deleteDoc, doc } from "firebase/firestore";
import { DB } from "../firebase";

export class DeleteOrder {
  constructor(private readonly employee: string, private readonly order_id: string) {}
  public async execute() {
    await deleteDoc(doc(DB, "Orders", this.order_id));
    console.log(bgYellow(green(`${this.employee} deleted the order ${this.order_id}`)));
  }
}
