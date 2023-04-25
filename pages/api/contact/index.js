import { mailOptoins, transporter } from "../../../emailHandeler/nodemailer";
import { validateInput } from "../../../emailHandeler/validationFunction";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const errors = validateInput(
      req.body.name,
      req.body.email,
      req.body.message
    );
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ message: "Bad Request" });
    }

    try {
      await transporter.sendMail({
        ...mailOptoins,
        subject: "Mail from My Fin app",
        text: "this is a test string",
        html: `<hi>Mail from ${req.body.name}</h1><h3>From email: ${req.body.email}</h3><p>${req.body.message}</p>`,
      });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  return res.status(400).json({ message: "Bad Request" });
}
