import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTransaction, updateAccBalance, updateTotals } from '../store/actions'
import axios from 'axios'
import Swal from 'sweetalert2'
import style from '../styles/TransactionCard.module.css'

function TransactionCard({ transId, balance, transaction, entityName, setBalance}) {
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
                  let newBalance = 0
                    if(transaction.type === 'debit'){
                      newBalance = balance + Number(transaction.amount)
                      setBalance(newBalance)
                    } else {
                      newBalance = balance - Number(transaction.amount)
                      setBalance(newBalance)
                    }
                    await axios.put(`http://localhost:3000/api/accounts/` + transactionAccount, { balance:newBalance })
                      dispatch(updateAccBalance({id:transactionAccount, newBalance:newBalance}))
                    await axios.delete(`http://localhost:3000/api/transactions/` + id)
                Swal.fire({
                  color:'white',
                  background:'#141c24',
                  title:'Deleted successfully!',
                  text:'Done.',
                  icon:'success'})
                  dispatch(deleteTransaction(transactionAccount, id))
                  dispatch(updateTotals({transactionType:transaction.type==='credit'?'debit':'credit', currency: entityName.toLowerCase().includes(' ars')?'ars':'usd', amount:transaction.amount}))
                  
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
                <table className={style.mobileTable}>
                <tbody>
                <tr className={style.trTitle}>
                    <th>
                      <div>{transaction.date.slice(2,10)}</div>
                      <div>{transaction.category}</div>
                    </th>
                    {transaction.type==='credit'?<th style={{color: '#4ada84'}}>+ ${parseFloat(transaction.amount).toFixed(2)}</th>:<th>- ${parseFloat(transaction.amount).toFixed(2)}</th>}
                </tr>
                </tbody>
                </table>
        <div className={style.delete} onClick={()=>handleDelete(transaction._id, transaction.account)}>X</div>
    </div>
  )
}

export default TransactionCard