import dbConnect from '../../../util/mongo'
import { Transaction, validateTransaction } from '../../../models/Transactions'


export default async function handler(req, res) {
    const {method} = req

    await dbConnect()
    if(method==='GET'){
      try {
        const transaction = await Transaction.find()
         res.status(201).json(transaction)
      } catch (error) {
        res.status(500).json(error.response.data)
      }
    }
    if(method==='POST'){
        const errors = validateTransaction(req.body);
        if (Object.keys(errors).length > 0) {
          return res.status(400).json(errors);
        }
      
        const transaction = new Transaction({
          account: req.body.account,
          amount: req.body.amount,
          type: req.body.type,
          method: req.body.method,
          date: req.body.date
        });
      
        try {
          await transaction.save();
          res.send(transaction);
        } catch (error) {
          res.status(500).json(error.message);
        }
    }
}