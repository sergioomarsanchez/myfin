import dbConnect from "../../../util/mongo";
import { User, validate } from "../../../models/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(201).json(users);
    } catch (error) {
      res.status(500).json(error.response.data);
    }
  }
  if (method === "POST") {
    try {
      const { error } = validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(409).json({ message: "Please try another Email!" });
      }
      const salt = await bcrypt.genSalt(Number(process.env.SALT));

      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
      res.status(201).json({ message: "User Created Successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
