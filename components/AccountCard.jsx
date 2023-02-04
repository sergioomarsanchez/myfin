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

    let accTransactions = transactions[acc._id]

    console.log('soy transactions[id] en account',transactions[acc._id])
  return (
    <div className={style.container}>
        <h2>Account: {acc.accountType}</h2>
        <h2>Balance: ${acc.balance}</h2>
    {
        accTransactions?.map(t=>{
            return(
                <TransactionCard key={t._id} transaction={t}/>
            )
        })
    }
    </div>
  )
}



export default AccountCard