import React, { useEffect } from 'react'
import style from '../styles/AccountCard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from '../store/actions'
import TransactionCard from './TransactionCard'


function AccountCard({acc}) {
    const dispatch = useDispatch()
    const transactions = useSelector(state=>state.transactions)

    useEffect(() => {
       if(!Object.keys(transactions).length) {

           dispatch(fetchTransactions(acc._id))
        }
    }, [])
    console.log(acc)

    let accTransactions = transactions[acc._id]

  return (
    <div className={style.container}>
        <h3>{acc.entityName} <span className={style.type}>{acc.accountType}</span>account</h3>
        <h3>Balance: ${acc.balance}</h3>
        <div className={style.wrapper}>
        <h5 className={style.movements}>Last movements:</h5>
        <table className={style.table}>
                <tbody>
                <tr className={style.trTitle}>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Method</th>
                    <th>Amount</th>
                </tr>
                </tbody>
        </table>
        <div className={style.transactionsContainer}>
    {
        accTransactions?.map(t=>{
            return(
                <TransactionCard key={t._id} transaction={t}/>
                )
            })
        }
        </div>
        </div>
    </div>
  )
}



export default AccountCard