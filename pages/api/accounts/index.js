import dbConnect from '../../../util/mongo'
import { Account, validateAccount } from '../../../models/Account'


export default async function handler(req, res) {
    const {method} = req

    await dbConnect()
    if(method==='GET'){
      try {
        const users = await Account.find()
         res.status(201).json(users)
      } catch (error) {
        res.status(500).json(error.response.data)
      }
    }
    if(method==='POST'){
        const errors = validateAccount(req.body);
        if (Object.keys(errors).length > 0) {
          return res.status(400).json(errors);
        }
      
        const account = new Account({
          accountType: req.body.accountType,
          balance: req.body.balance,
          userId: req.body.userId
        });
      
        try {
          await account.save();
          res.status(201).json(account);
        } catch (error) {
          res.status(500).json(error.message);
        }
    }
}