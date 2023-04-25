import dbConnect from "../../../util/mongo";
import { User } from "../../../models/User";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  }
  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated");
    }

    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  }
  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json("Not authenticated");
    }

    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("The product has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
