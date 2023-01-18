import dbConnect from '../../../util/mongo'
import  {User} from '../../../models/User'
import Joi from 'joi'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    const {method} = req

    await dbConnect()
    if(method==='POST'){
        try {
            const {error} = validate(req.body)
            if (error){
                return res.status(400).json({ message: error.details[0].message})
                }

            const user = await User.findOne({ email: req.body.email})
            if(!user){
                    return res.status(401).json({message: 'Invalid Email or Password'})
                }

            const validPassword = await bcrypt.compare(
                req.body.password, user.password
            )
            if(!validPassword){
                return res.status(401).json({message: 'Invalid Email or Password'})
            }

            const token = user.generateAuthToken()
            res.status(200).json({
                data: token,
                message: 'Logged in successfully'
            })

          } catch (error) {
            res.status(500).json(error)
          }
        }
    
    const validate = (data)=>{
        const schema = Joi.object({
            email: Joi.string().email().required().label("Email"),
            password: Joi.string().required().label("Password")
        });
        return schema.validate(data)
    }

    }