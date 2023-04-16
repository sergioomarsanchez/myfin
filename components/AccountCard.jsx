import { useState, useEffect } from 'react'
import Link from 'next/link'
import style from '../styles/AccountCard.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactions, setTotals, deleteAccount } from '../store/actions'
import TransactionCard from './TransactionCard'
import Image from 'next/image'
import Swal from 'sweetalert2'
import axios from 'axios'
import AddTransactionForm from './AddTransactionForm'


function AccountCard({acc}) {
    const dispatch = useDispatch()
    const transactions = useSelector(state=>state.transactions)
    const [accTransactions, setAccTransactions] = useState([])
    const [balance, setBalance] = useState(acc.balance)
    const [isOpen, setIsOpen] = useState(false)
    const [amountOfTransactions, setAmountOfTransactions] = useState(0)


    useEffect(() => {
        dispatch(setTotals(acc));
        if (!Object.keys(transactions).length) {
            dispatch(fetchTransactions(acc._id));
        }
        if (transactions[acc._id]) {
            setAccTransactions(transactions[acc._id]?.sort(function(a, b) {
                return new Date(b.date) - new Date(a.date);
            }));
        }
    }, [acc, dispatch, transactions]);
    
    useEffect(() => {
        if (transactions[acc._id]) {
            setAmountOfTransactions(transactions[acc._id]?.length);
        }
    }, [transactions, accTransactions]);
    

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
                    const { data: res } = await axios.delete(`https://myfin-sergioomarsanchez.vercel.app/api/transactions/?accountId=${acc._id}`)
                    const { data: deleted } = await axios.delete(`https://myfin-sergioomarsanchez.vercel.app/api/accounts/${acc._id}`)
                    dispatch(deleteAccount(acc._id, acc.balance, acc.entityName))
                Swal.fire({
                  color:'white',
                  background:'#141c24',
                  title:'Deleted successfully!',
                  text:'Done.',
                  icon:'success'})
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
    <div key={acc._id} className={style.container} >
        <Image className={style.entityLogo} alt='' src={acc.logo} width={25} height={25}/>
        <h3 className={style.entityName}>{acc.entityName} <span className={style.type}>{acc.accountType}</span>account</h3>
        <h3 className={style.entityName}>Balance: ${parseFloat(balance).toFixed(2)}</h3>
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
    {   accTransactions.length!==0?
        accTransactions?.map(t=>{
            return<div key={t._id}>
                <TransactionCard setBalance={setBalance} balance={balance} transId={t._id} transaction={t} entityName={acc.entityName}/>
                </div> 
            })
        :<div className={style.noTransactions}>No Transactions added. <br></br>- <span className={style.addTransaction} onClick={()=>setIsOpen(true)}>+ Add transaction</span></div>
        }
        </div>
        {amountOfTransactions>0?
        <Link href={`/accountDetail/${acc._id}`}>
        <button className={style.detailButton}>Details</button>
        </Link>:null
        }</div>
    </div>
  )
}



export default AccountCard