import dbConnect from '../../../util/mongo'
import {Account} from '../../../models/Account'

export default async function handler(req, res){
    const { method, query:{id}} = req

  
   await dbConnect()

    if(method==='GET'){
        try {
            const accounts = await Account.find()
            
            res.status(200).json(accounts)
        }
        catch (error) {
            res.status(500).json(error) 
        }
     }
    if (method==='PUT') {
        try {
            const account = await Account.findByIdAndUpdate(id, req.body, {
              new: true,
              })
            res.status(200).json(account)
          } catch (error) {
             res.status(500).json(error.response.data)
          }
    }
    if (method==='DELETE') {

        try {
            await Account.findByIdAndDelete(id)
            res.status(200).json('The product has been deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    }
  }