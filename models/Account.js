import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    accountType: {
      type: String,
      enum: ["checking", "savings", "credit card"],
      required: true
    },
    balance: { type: Number, default: 0 },
    userId: { type: String, ref: "User",  required: true},
    entityName: { type: String, ref: "Bank or company",  required: true}
  });

  const Account = mongoose.models.Account|| mongoose.model('Account', AccountSchema)


  function validateAccount(account) {
    const errors = {};
  
    if (!account.accountType) {
      errors.accountType = "Account type is required.";
    } else if (!["checking", "savings", "credit card"].includes(account.accountType)) {
      errors.accountType = "Invalid account type.";
    }
  
    if (!account.balance) {
      errors.balance = "Balance is required.";
    } else if (isNaN(account.balance)) {
      errors.balance = "Balance must be a number.";
    }
    if (!account.userId) {
      errors.userId = "User ID is required.";
    } 
    if (!account.entityName) {
      errors.entityName = "Entity name is required.";
    } 
  
    return errors;
  }

export { Account, validateAccount }