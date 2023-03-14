import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../store/actions'
import axios from 'axios'
import style from '../../styles/AccountDetail.module.css'
import Image from 'next/image'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function AccountDetail({acc}) {
    const [token, setToken]= useState(false)
    const [id, setId]= useState(false)
    const [account, setAccount]= useState({})
    const transactions = useSelector(state=>state.transactions)
    const dispatch = useDispatch()
    useEffect(() => {
      const token =  sessionStorage.getItem('token')
      const id = sessionStorage.getItem('id')
      setToken(token)
      setId(id)
      setAccount(acc)
      if(!Object.keys(transactions).length) {

        dispatch(fetchTransactions(acc._id))
     }
       }, [])

    let accTransactions = transactions[acc._id]
       console.log(transactions, accTransactions)
        const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${account.entityName} movements`,
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Debit',
            data: [1000, 1203, 1231, 2023, 1023, 3213, 2231],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1,
          },
          {
            label: 'Credit',
            data: [1002, 1233, 1231, 2203, 1423, 2113, 231],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderWidth: 1,
          },
        ],
      };
      
      
  return (
    <div className={style.container}>
        { id && token?<div className={style.wrapper}>
        <Image src={account.logo} alt='' width={50} height={50}/>
        <h2 className={style.title}>{account.entityName} {account.type}</h2>
        <h4 className={style.totals}>Balance is: <span style={{color: account.balance>0?'#4ada84':'red'}} className={style.totalammount}>${account.balance}</span></h4>
        <div className={style.graphic}>
         <Bar options={options} data={data} />

        </div>
        {/* {isOpen? <AddAccountForm userId={id} setIsOpen={setIsOpen}/> : null}
        <div className={style.division}>
        <h3>Your accounts</h3><div className={style.line}/> <div className={style.addAccount} onClick={()=>setIsOpen(true)}>+ Add New Account</div>
        </div>
        <div className={style.accountsContainer}>
        {
            acc?.map(a=>{
                return(
                    <AccountCard key={a._id} acc={a}/>
                    )
                })
          }
            </div>
             */}
        </div> :<div className={style.warning}>Sorry you have no credentials, please, Log in again</div>}
    </div>
  )
}

export const getServerSideProps = async ({params})=>{
    const acc = await axios.get(`http://localhost:3000/api/accounts/` + params.id )
    return {
        props:{
        acc: acc.data
      }
    }
  }

export default AccountDetail