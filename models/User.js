import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import passwordComplexity from "joi-password-complexity";

const UserSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
},
{ timestamps: true }
);

UserSchema.methods.generateAuthToken = function(){
const token = jwt.sign({_id: this._id}, process.env.JWTPRIVATEKEY, {expiresIn: '1d'});
return token
}

const User = mongoose.models.User|| mongoose.model('User', UserSchema)

 const validate=(data)=>{
    const schema = Joi.object({
        firstName: Joi.string().required().label('First Name'),
        lastName: Joi.string().required().label('Last Name'),
        email: Joi.string().email().required().label('Email'),
        password: passwordComplexity().required().label('Password')
    })
    return schema.validate(data)
}

export { User , validate}

