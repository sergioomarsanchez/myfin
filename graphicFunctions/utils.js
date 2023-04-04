function getMonthlyCreditDebit(transactions) {
  const creditByYearMonth = {};
  const debitByYearMonth = {};

  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (transaction.type === 'credit') {
      if (!creditByYearMonth[year]) {
        creditByYearMonth[year] = {};
      }
      if (!creditByYearMonth[year][month]) {
        creditByYearMonth[year][month] = 0;
      }
      creditByYearMonth[year][month] += Number(transaction.amount);
    } else if (transaction.type === 'debit') {
      if (!debitByYearMonth[year]) {
        debitByYearMonth[year] = {};
      }
      if (!debitByYearMonth[year][month]) {
        debitByYearMonth[year][month] = 0;
      }
      debitByYearMonth[year][month] += Number(transaction.amount);
    }
  });

  const years = Object.keys(creditByYearMonth).sort();

  const result = years.map(year => {
    const credit = [];
    const debit = [];

    for (let i = 1; i <= 12; i++) {
      credit.push(creditByYearMonth[year]?.[i] || 0);
      debit.push(debitByYearMonth[year]?.[i] || 0);
    }

    return {
      [year]: {
        credit,
        debit
      }
    };
  });

  return result;
};


 function getMonthlyGraphicData(transactions) {
  const categories = {
    credit: ['Other', 'Salary', 'Freelance/Contract Work', 'Investments', 'Rental Income', 'Gifts'],
    debit: ['Other', 'Housing', 'Transportation', 'Food', 'Entertainment', 'Utilities', 'Insurance', 'Healthcare', 'Debt Repayment', 'Savings', 'Investments', 'Taxes']
  };

  const monthlyData = {};
  for (let i = 0; i < 12; i++) {
    const month = i + 1;
    monthlyData[month] = {
      credit: new Array(categories.credit.length).fill(0),
      debit: new Array(categories.debit.length).fill(0),
    };
  }
  transactions.forEach((transaction) => {
    const date = new Date(transaction.date);
    const month = date.getMonth() + 1;
    const categoryIndex = categories[transaction.type].indexOf(transaction.category);
    if (categoryIndex >= 0) {
      monthlyData[month][transaction.type][categoryIndex] += transaction.amount;
    }
  });
  return monthlyData;
}
 export { getMonthlyCreditDebit, getMonthlyGraphicData};