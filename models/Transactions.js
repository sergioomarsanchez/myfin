import mongoose from "mongoose";

const TrasactionSchema = new mongoose.Schema({
    account: {
      type: String,
      ref: "Account",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ["debit", "credit"]
    },
    method: {
      type: String,
      enum: ['cash', 'debit', 'credit'],
      default: 'cash',
      required: true
    },
    category: {
      type: String,
      enum: ['Housing', 'Transportation', 'Food', 'Entertainment', 'Utilities', 'Insurance', 'Healthcare', 'Debt Repayment', 'Savings', 'Investments', 'Taxes', 'Salary', 'Freelance/Contract Work', 'Investments', 'Rental Income', 'Gifts', 'Other'],
      default: 'Other',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  });
const Transaction = mongoose.models.Transaction|| mongoose.model('Transaction', TrasactionSchema)

function validateTransaction(transaction) {
    const errors = {};

  if (!transaction.account) {
    errors.account = "Account is required.";
  }

  if (!transaction.amount) {
    errors.amount = "Amount is required.";
  } else if (isNaN(transaction.amount)) {
    errors.amount = "Amount must be a number.";
  }

  if (!transaction.type) {
    errors.type = "Transaction type is required.";
  } else if (!["debit", "credit"].includes(transaction.type)) {
    errors.type = "Invalid transaction type.";
  }

  if (!transaction.category) {
    errors.type = "Transaction category is required.";
  } else if (!['Housing', 'Transportation', 'Food', 'Entertainment', 'Utilities', 'Insurance', 'Healthcare', 'Debt Repayment', 'Savings', 'Investments', 'Taxes', 'Salary', 'Freelance/Contract Work', 'Investments', 'Rental Income', 'Gifts', 'Other'].includes(transaction.category)) {
    errors.type = "Invalid transaction category.";
  }

    return errors;
  }


export { Transaction, validateTransaction }