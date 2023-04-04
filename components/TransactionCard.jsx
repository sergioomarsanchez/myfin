import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTransaction, updateAccBalance, updateTotals } from '../store/actions'
import axios from 'axios'
import Swal from 'sweetalert2'
import style from '../styles/TransactionCard.module.css'

function TransactionCard({ transId, currentBalance, transaction, entityName, setBalance}) {
    const dispatch = useDispatch()

    function handleDelete(id, transactionAccount){
           
        Swal.fire({
            title: `Delete Transaction from date ${transaction.date.slice(2,10)}, Are you sure?`,
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

                    if(transaction.type === 'debit'){
                        currentBalance = currentBalance + Number(transaction.amount)
                        setBalance(currentBalance)
                    } else {
                        currentBalance = currentBalance - Number(transaction.amount)
                        setBalance(currentBalance)
                    }
                    await axios.put(`https://myfin-sergioomarsanchez.vercel.app/api/accounts/` + transactionAccount, { balance:currentBalance })
                    dispatch(updateAccBalance({id:transactionAccount, newBalance:currentBalance}))
                    await axios.delete(`https://myfin-sergioomarsanchez.vercel.app/api/transactions/` + id)
                Swal.fire({
                  color:'white',
                  background:'#141c24',
                  title:'Deleted successfully!',
                  text:'Done.',
                  icon:'success'})
                  dispatch(deleteTransaction(transactionAccount, id))
                  dispatch(updateTotals({transactionType:transaction.type, currency: entityName.toLowerCase().includes(' ars')?'ars':'usd', amount:transaction.amount}))
                  
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
    <div key={transId} className={style.container}>
                <table className={style.table}>
                <tbody>
                <tr className={style.trTitle}>
                    <th>{transaction.date.slice(2,10)}</th>
                    <th>{transaction.type}</th>
                    <th>{transaction.category}</th>
                    {transaction.type==='credit'?<th style={{color: '#4ada84'}}>+ ${parseFloat(transaction.amount).toFixed(2)}</th>:<th>- ${parseFloat(transaction.amount).toFixed(2)}</th>}
                </tr>
                </tbody>
        </table>
        <div className={style.delete} onClick={()=>handleDelete(transaction._id, transaction.account)}>X</div>
    </div>
  )
}

export default TransactionCard