import React from 'react'
import style from '../styles/TransactionCard.module.css'

function TransactionCard({transaction}) {

  return (
    <div className={style.container}>
                <table className={style.table}>
                <tbody>
                <tr className={style.trTitle}>
                    <th>{transaction.date.slice(2,10)}</th>
                    <th>{transaction.type}</th>
                    <th>{transaction.method}</th>
                    {transaction.amount>0?<th style={{color: '#4ada84'}}>+ ${transaction.amount}</th>:<th>- ${transaction.amount}</th>
                    }
                </tr>
                </tbody>
        </table>

    </div>
  )
}

export default TransactionCard