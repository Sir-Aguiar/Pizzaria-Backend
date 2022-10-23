import { addDoc, collection } from "firebase/firestore";
import { DB } from "../firebase";
export class OrderError {
  constructor(
    public readonly message: string,
    public readonly error_name: string,
    public readonly cause: string,
    public readonly stack?: string
  ) {}
  public async register() {
    const errors_collection = collection(DB, "ReigsteredOrders");
    const addedDoc = await addDoc(errors_collection, Object.assign({}, this.props));
    console.log(`${this.error_name} has been saved as ${addedDoc.id}`);
  }
  public logIt() {
    console.log({
      message: this.message,
      name: this.error_name,
      cause: this.cause,
      stack: this.stack,
    });
  }
  get props() {
    return {
      message: this.message,
      name: this.error_name,
      cause: this.cause,
      stack: this.stack,
    };
  }
}
