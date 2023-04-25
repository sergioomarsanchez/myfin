import dbConnect from "../../../util/mongo";
import { Transaction } from "../../../models/Transactions";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const transaction = await Transaction.find();

      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "PUT") {
    try {
      const account = await Transaction.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  }
  if (method === "DELETE") {
    try {
      await Transaction.findByIdAndDelete(id);
      res.status(200).json("The transaction has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
