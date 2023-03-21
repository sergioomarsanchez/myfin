import dbConnect from '../../../util/mongo'
import { Transaction, validateTransaction } from '../../../models/Transactions'


export default async function handler(req, res) {
    const {method, query : {accountId}} = req
    await dbConnect()
    if(method==='GET'&& accountId){
      try {
        const transactions = await Transaction.find({ account : accountId })
         res.status(201).json(transactions)
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
          category: req.body.category,
          date: req.body.date
        });
      
        try {
          await transaction.save();
          res.send(transaction);
        } catch (error) {
          res.status(500).json(error.message);
        }
    }

    if (method==='DELETE'&& accountId) {

      try {
          await Transaction.deleteMany({account:accountId})
          res.status(200).json('The product has been deleted')
      } catch (error) {
          res.status(500).json(error)
      }
  }
}