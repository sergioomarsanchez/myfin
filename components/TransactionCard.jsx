import React from 'react'
import style from '../styles/TransactionCard.module.css'

function TransactionCard({transaction}) {

    const ejemplo =
        {
          _id: '63d9a7449fd53f45728997fb',
          account: '63d9a0209fd53f45728997f9',
          amount: 1000,
          type: 'credit',
          method: 'credit',
          date: '2022-01-01T00:00:00.000Z',
          __v: 0
        }

  return (
    <div className={style.container}>
        <h3>Type: {transaction.type}</h3>
        <h3>Method: {transaction.method}</h3>
        <h3>Amount: ${transaction.amount}</h3>
        <h3>Date: {transaction.date.slice(0,10)}</h3>

    </div>
  )
}

export default TransactionCard