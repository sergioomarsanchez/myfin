import mongoose from "mongoose";

const TrasactionSchema = new mongoose.Schema({
    type:{type:String, required:true},
    userId:{type:String, required:true},
    image:{type:String, required:true},
    name:{type:String, required:true},
    amount:{type:Number, required:true},
    date:{ type: Date, default: Date.now }
},
{ timestamps: true }
);

const Transaction = mongoose.models.Transaction|| mongoose.model('Transaction', Transactionchema)

 const validate=(data)=>{
    const error = {}
    if(!data.type||!userId||!image||!name||!amount){error  = {...error, message:'Missinga some data'}}
    
    return error
}

export { Transaction, validate}