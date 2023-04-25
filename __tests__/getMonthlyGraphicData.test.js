import { getMonthlyGraphicData } from "../graphicFunctions/utils";

describe("getMonthlyGraphicData", () => {
  const categories = {
    credit: [
      "Other",
      "Salary",
      "Freelance/Contract Work",
      "Investments",
      "Rental Income",
      "Gifts",
    ],
    debit: [
      "Other",
      "Housing",
      "Transportation",
      "Food",
      "Entertainment",
      "Utilities",
      "Insurance",
      "Healthcare",
      "Debt Repayment",
      "Savings",
      "Investments",
      "Taxes",
    ],
  };
  it("should return an object with data for all 12 months", () => {
    const data = getMonthlyGraphicData([]);
    expect(Object.keys(data)).toHaveLength(12);
    expect(data[1]).toBeDefined();
    expect(data[12]).toBeDefined();
  });

  it("should correctly categorize transactions by type and month", () => {
    const transactions = [
      {
        date: "2022-01-24T00:00:00.000+00:00",
        type: "credit",
        category: "Salary",
        amount: 1000,
      },
      {
        date: "2022-02-24T00:00:00.000+00:00",
        type: "credit",
        category: "Investments",
        amount: 500,
      },
      {
        date: "2022-01-24T00:00:00.000+00:00",
        type: "debit",
        category: "Housing",
        amount: 800,
      },
      {
        date: "2022-03-24T00:00:00.000+00:00",
        type: "debit",
        category: "Food",
        amount: 200,
      },
    ];
    const data = getMonthlyGraphicData(transactions);
    expect(data[1].credit[categories.credit.indexOf("Salary")]).toBe(1000);
    expect(data[2].credit[categories.credit.indexOf("Investments")]).toBe(500);
    expect(data[1].debit[categories.debit.indexOf("Housing")]).toBe(800);
    expect(data[3].debit[categories.debit.indexOf("Food")]).toBe(200);
  });

  it("should ignore transactions with unknown categories", () => {
    const transactions = [
      { date: "2022-01-01", type: "credit", category: "Unknown", amount: 1000 },
      { date: "2022-02-01", type: "debit", category: "Unknown", amount: 500 },
    ];
    const data = getMonthlyGraphicData(transactions);
    expect(data[1].credit).toEqual(new Array(categories.credit.length).fill(0));
    expect(data[2].debit).toEqual(new Array(categories.debit.length).fill(0));
  });
});
