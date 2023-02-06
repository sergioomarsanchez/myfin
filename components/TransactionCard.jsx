import React from 'react'
import style from '../styles/TransactionCard.module.css'

function TransactionCard({transaction}) {

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