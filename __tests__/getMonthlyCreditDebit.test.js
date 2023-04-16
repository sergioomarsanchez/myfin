import { getMonthlyCreditDebit } from '../graphicFunctions/utils'

describe('Tests that will pass', () => {
    it('if it recieves an empty array it should return the current year property with its credit and debit properties each with an array and a 0 interger for each month of the year', () => {
        const date = new Date();
        const currentYear = date.getFullYear();
        const result = getMonthlyCreditDebit([]);
        expect(result).toEqual([{
            [currentYear.toString()]:{
                "credit":[0,0,0,0,0,0,0,0,0,0,0,0],
                "debit":[0,0,0,0,0,0,0,0,0,0,0,0]
                }}]);
        });
    it('it shuold return the current year even if there are no transactions in it', () => {
        const date = new Date();
        const currentYear = date.getFullYear();
        const transactions  = [{
            '_id':'641e0c468c4fd069f162ff28',
            'account':"641b1083f9349ed76cee221f",
            'amount':20000,
            'type':"credit",
            'method':"credit",
            'category':"Investments",
            'date':'2022-03-24T00:00:00.000+00:00',
            '__v':0,
        }];
        const result = getMonthlyCreditDebit(transactions);
      expect(result).toEqual([
          {
        '2022':{
              "credit":[0,0,20000,0,0,0,0,0,0,0,0,0],
              "debit":[0,0,0,0,0,0,0,0,0,0,0,0]
            }},
          {
        [currentYear.toString()]:{
              "credit":[0,0,0,0,0,0,0,0,0,0,0,0],
              "debit":[0,0,0,0,0,0,0,0,0,0,0,0]
            }}]);
    });
    
    it('if it recieves transanctions only from the current year, it only should have one object in the resulting array', () => {
        const transactions  = [{
            '_id':'641e0c468c4fd069f162ff28',
            'account':"641b1083f9349ed76cee221f",
            'amount':20000,
            'type':"credit",
            'method':"credit",
            'category':"Investments",
            'date':new Date(),
            '__v':0,
        },
        {
            '_id':'641e0c468c4fd069f162ff28',
            'account':"641b1083f9349ed76cee221f",
            'amount':20000,
            'type':"credit",
            'method':"credit",
            'category':"Investments",
            'date':new Date(),
            '__v':0,
        }];
        const result = getMonthlyCreditDebit(transactions);
      expect(result.length).toBe(1);
    });
  })
  