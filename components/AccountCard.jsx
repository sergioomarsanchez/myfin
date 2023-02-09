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
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const { data: res } = await axios.delete(`http://localhost:3000/api/transactions/?accountId=${acc._id}`)
                    const { data: deleted } = await axios.delete(`http://localhost:3000/api/accounts/${acc._id}`)
                Swal.fire({
                  color:'white',
                  background:'#141c24',
                  title:'Deleted successfully!',
                  text:'Done.',
                  icon:'success'})
                  window.location.reload()
                } catch (error) {
                    if(error.response && error.response.status >=400 && error.response.status <= 500){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            footer: error.response.data.message
                          })
                }
                }
            }})
      }


  return (
    <div className={style.container}>
        <h3>{acc.entityName} <span className={style.type}>{acc.accountType}</span>account</h3>
        <h3>Balance: ${acc.balance}</h3>
        <div className={style.actions}>
        <span onClick={handleDelete} className={style.deleteAcc}>- Delete Account</span>
        <span className={style.addTransaction} onClick={()=>setIsOpen(true)}>+ Add transaction</span>
        {isOpen? <AddTransactionForm currentBalance={acc.balance} account={acc._id} setIsOpen={setIsOpen}/> : null }
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