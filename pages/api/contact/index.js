import { validateInput } from "../../../emailHandeler/validationFunction";

export default async function handler(req, res) {
    const {method} = req

    if(method==='POST'){
        const errors = validateInput(req.body.name, req.body.email, req.body.message);
        if (Object.keys(errors).length > 0) {
          return res.status(400).json(errors);
        }
        
        console.log(req.body)
        // try {
        //   await account.save();
        //   res.status(201).json(account);
        // } catch (error) {
        //   res.status(500).json(error.message);
        // }
    }
}