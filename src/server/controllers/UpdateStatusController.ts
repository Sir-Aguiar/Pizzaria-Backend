import { Request, Response } from "express";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc, DocumentSnapshot } from "firebase/firestore";
import { isNumber } from "lodash";
import { Order } from "../../entities/order";
import { DB, firebase_app } from "../../firebase";
import { UpdateOrder } from "../../use-cases/update-order";
import { OrderError } from "../../entities/order_error";
import { FirebaseError } from "firebase/app";

export const UpdateStatusController = async (req: Request, res: Response) => {
  // Incoming data from request
  const { order_id, status } = req.body;
  const employee_name = req.header("employee") || "";
  const employee_email = req.header("email") || "";
  const employee_password = req.header("password") || "";

  try {
    // Verifying employee credentials
    await signInWithEmailAndPassword(getAuth(firebase_app), employee_email, employee_password);
    const order_document = (await getDoc(doc(DB, "Orders", order_id))) as DocumentSnapshot<Order>;
    // Verifying if the data is valid
    if (order_document.exists() && isNumber(status) && employee_name) {
      const data = order_document.data();
      const order = new Order(
        data.items_price,
        data.delivery,
        data.status,
        data.client,
        data.items,
        data.payment_method,
        data._id
      );
      const updater = new UpdateOrder(order, { name: employee_name });
      await updater.changeOrderStatus(status);
      return res.status(200).send();
    }

    return res
      .status(404)
      .json({ e: "Invalid data has been recieved, or we're missing a few informations, check it, and try agin later" });
  } catch (e: any) {
    // Errors on object instantiation
    if (e instanceof OrderError) {
      return res.status(400).json({ e });
    }

    if (e instanceof FirebaseError) {
      const error_infos = e.code.split("/");
      if (error_infos[0] === "auth") {
        // Missing params
        if (error_infos[1] == "internal-error") {
          return res.status(400).json({ e: "A few information are missing" });
        }

        // Missing email
        if (error_infos[1] == "invalid-email") {
          return res.status(400).json({ e: "Email is missing" });
        }

        // Invalid user
        return res.status(401).json({ e: "This user is not allowed to consume our services" });
      }

      // Errors on function release
      if (error_infos[0] == "invalid-argument") {
        return res.status(500).json({ e });
      }

      // Unknown error
      return res.status(510).json({ e: "An unknown error has been occurred during the execution of a functionality" });
    }
  }
};
