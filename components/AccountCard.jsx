import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import style from '../styles/AccountCard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions, setTotals } from '../store/actions'
import TransactionCard from './TransactionCard'
import Image from 'next/image'
import Swal from 'sweetalert2'
import axios from 'axios'
import AddTransactionForm from './AddTransactionForm'


function AccountCard({acc}) {
    const dispatch = useDispatch()
    const transactions = useSelector(state=>state.transactions)
    const [balance, setBalance] = useState(acc.balance)
    const [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        dispatch(setTotals(acc))
        if(!Object.keys(transactions).length) {
            
            dispatch(fetchTransactions(acc._id))
        }
    }, [])
    
    

    
    let accTransactions = transactions[acc._id]?.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      })


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
    <div key={acc._id} className={style.container}>
        <Image className={style.entityLogo} alt='' src={acc.logo} width={25} height={25}/>
        <h3>{acc.entityName} <span className={style.type}>{acc.accountType}</span>account</h3>
        <h3>Balance: ${parseFloat(balance).toFixed(2)}</h3>
        <div className={style.actions}>
        <span onClick={handleDelete} className={style.deleteAcc}>- Delete Account</span>
        <span className={style.addTransaction} onClick={()=>setIsOpen(true)}>+ Add transaction</span>
        {isOpen? <AddTransactionForm setBalance={setBalance} balance={balance} account={acc._id} setIsOpen={setIsOpen} entityName={acc.entityName}/> : null }
        </div>
        <div className={style.wrapper}>
        <h5 className={style.movements}>Last movements:</h5>
        <table className={style.table}>
                <tbody>
                <tr className={style.trTitle}>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Amount</th>
                </tr>
                </tbody>
        </table>
        <div className={style.transactionsContainer}>
    {
        accTransactions?.map(t=>{
            return(
                <TransactionCard setBalance={setBalance} currentBalance={acc.balance} key={t._id} transaction={t} entityName={acc.entityName}/>
                )
            })
        }
        </div>
        <Link href={`/accountDetail/${acc._id}`}>
        <button className={style.detailButton}>Details</button>
        </Link>
        </div>
    </div>
  )
}



export default AccountCard