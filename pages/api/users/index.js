import dbConnect from '../../../util/mongo'
import { User, validate }from '../../../models/User'
import bcrypt from 'bcrypt'


export default async function handler(req, res) {
    const {method} = req

    await dbConnect()
    if(method==='GET'){
      try {
        const users = await User.find()
         res.status(201).json(users)
      } catch (error) {
        res.status(500).json(error.response.data)
      }
    }
    if(method==='POST'){
      try {
        const {error} = validate(req.body)
        if(error){
          return res.status(400).json({message:error.details[0].message})
        }
        const user = await User.find({email:req.body.email})
        if(user){
          return res.status(409).json({message: 'User with given email already exist!'})
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.hashPassword, salt)

        await  User.create({...req.body, password: hashPassword})
        res.status(201).json({message: 'User created successfully'})
      } catch (error) {
        res.status(500).json(error)
      }
    }
}