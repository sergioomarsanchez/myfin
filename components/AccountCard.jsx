import React, { useState, useEffect } from 'react'
import style from '../styles/AccountCard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions } from '../store/actions'
import TransactionCard from './TransactionCard'
import Swal from 'sweetalert2'
import axios from 'axios'
import AddTransactionForm from './AddTransactionForm'


function AccountCard({acc}) {
    const dispatch = useDispatch()
    const transactions = useSelector(state=>state.transactions)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
       if(!Object.keys(transactions).length) {

           dispatch(fetchTransactions(acc._id))
        }
    }, [])

    let accTransactions = transactions[acc._id]


    function handleDelete() {

        Swal.fire({
          title: `Delete ${acc.entityName} ${acc.accountType} account, Are you sure?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#4adac4',
          cancelButtonColor: '#9603c4',
          confirmButtonText: 'Yes, Delete it!',
          color:'white',
          background:'#141c24',
        }).then((result) => {
          if (result.isConfirmed) {

            Swal.fire({
              color:'white',
              background:'#141c24',
              title:'Deleted successfully!',
              text:'Comeback Soon.',
              icon:'success'})
            }
        })
      }


  return (
    <div className={style.container}>
        <h3>{acc.entityName} <span className={style.type}>{acc.accountType}</span>account</h3>
        <h3>Balance: ${acc.balance}</h3>
        <div className={style.actions}>
        <span onClick={handleDelete} className={style.deleteAcc}>- Delete Account</span>
        <span className={style.addTransaction} onClick={()=>setIsOpen(true)}>+ Add transaction</span>
        {isOpen? <AddTransactionForm setIsOpen={setIsOpen}/> : null }
        </div>
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