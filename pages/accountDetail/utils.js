export default function getCreditDebitByMonth(transactions) {
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
        creditByYearMonth[year][month] += transaction.amount;
      } else if (transaction.type === 'debit') {
        if (!debitByYearMonth[year]) {
          debitByYearMonth[year] = {};
        }
        if (!debitByYearMonth[year][month]) {
          debitByYearMonth[year][month] = 0;
        }
        debitByYearMonth[year][month] += transaction.amount;
      }
    });
  
    const years = Object.keys(creditByYearMonth).sort();
  
    const result = years.map(year => {
      const credit = [];
      const debit = [];
  
      for (let i = 1; i <= 12; i++) {
        credit.push(creditByYearMonth[year][i] || 0);
        debit.push(debitByYearMonth[year][i] || 0);
      }
  
      return {
        [year]: {
          credit,
          debit
        }
      };
    });
  
    return result;
  }