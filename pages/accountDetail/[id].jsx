import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTransactionsPerYear, fetchTransactions } from '../../store/actions'
import {getMonthlyCreditDebit, getMonthlyGraphicData} from '../../graphicFunctions/utils'
import axios from 'axios'
import style from '../../styles/AccountDetail.module.css'
import Image from 'next/image'
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import MonthlyGraphic from '../../components/MonthlyGraphic'
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend );


function AccountDetail({acc}) {
    const [token, setToken]= useState(false)
    const [id, setId]= useState(false)
    const [account, setAccount]= useState({})
    const [graphicFormat, setGraphicFormat] = useState('Bar')
    const transactions = useSelector(state=>state.transactions)
    const [accTransactions, setAccTransactions] = useState([])
    const today = new Date();
    const thisYear = today.getFullYear();   
    const [year, setYear] = useState(thisYear.toString())
    const [month, setMonth] = useState(0)
    const [graphicData, setGraphicData] = useState([{'2023':{"credit":[], "debit":[]}}])
    const [yearTransactions, setYearTransactions] = useState([])
    
    const dispatch = useDispatch()
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [])
    useEffect(() => {
      const token = sessionStorage.getItem('token')
      const id = sessionStorage.getItem('id')
      setToken(token)
      setId(id)
      setAccount(acc)
      if(!Object.keys(transactions).length)dispatch(fetchTransactions(acc._id))
      return () => {
      }
    }, [acc._id])
    
    useEffect(() => {
      if(transactions[acc._id]){setAccTransactions(transactions[acc._id]?.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      }))
     }
    }, [transactions])
    useEffect(() => {
      if(accTransactions.length)setGraphicData(getMonthlyCreditDebit(accTransactions))
    }, [accTransactions])

    function filterTransactionsByYear(accTransactions, year) {
      return accTransactions.filter(transaction => {
        const date = new Date(transaction.date)
        return date.getFullYear() === Number(year)
      })
    }
    
    useEffect(() => {
      if (accTransactions.length) {
        const yearTransactions = filterTransactionsByYear(accTransactions, year)
        setYearTransactions(yearTransactions)
        dispatch(setTransactionsPerYear(getMonthlyGraphicData(yearTransactions)))
      }
    }, [accTransactions,year])
       

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

      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Debit',
            data: graphicData?.find(obj => Object.keys(obj)[0] === year)[year]['debit'],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 1,
            borderColor: 'rgb(255, 99, 132)',
          },
          {
            label: 'Credit',
            data: graphicData?.find(obj => Object.keys(obj)[0] === year)[year]['credit'],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderWidth: 1,
            borderColor: 'rgb(53, 162, 235)',
          },
        ],
      };
      
      
  return (
    <div className={style.container}>
        { id && token?<div className={style.wrapper}>
          <div className={style.header}>
            <div className={style.account}>
            <Image src={account.logo} alt='' width={50} height={50}/>
            <h2 className={style.title}>{account.entityName} {account.type}</h2>
            </div>
            <div className={style.balanceYear}>
            <h4 className={style.totals}>Balance is: <span style={{color: account.balance>0?'#4ada84':'red'}} className={style.totalammount}>${parseFloat(account.balance).toFixed(2)}</span></h4>
              <div className={style.yearSelectorContainer}>
                Select a Year:  
                <select className={style.yearSelector} name="year" value={year} onChange={e=>setYear(e.target.value)} id="">
                    {
                      graphicData?.map((year)=>{
                        return<option key={year}>
                        { Object.keys(year)[0]}
                      </option>})
                      }
                      
                </select>
              </div>
            </div>
          </div>
        <div className={style.graphicContainer}>
          {
            yearTransactions.length?
            <div className={style.yearGraphicContainer}>
              <div className={style.formatSelectorContainer}>
                Select a Graphic Format:  
                <select className={style.formatSelector} name="format" value={graphicFormat} onChange={e=>setGraphicFormat(e.target.value)} id="">
                    <option value='Bar'>Bar</option>
                    <option value='Line'>Line</option>
                </select>
              </div>
           { graphicFormat === 'Bar'?
          <div className={style.yearGraphic}>
            <Bar options={options} data={data} />
          </div>
          :
          <div className={style.yearGraphic}>
            <Line options={options} data={data} />
          </div>}
          </div>
          :<div className={style.message}>Sorry No Transactions found in the year slected, try other</div>
          }
          <div className={style.monthGraphicsContainer}>
          <div className={style.monthSelectorContainer}>
            Select a Month:  
            <select className={style.monthSelector} name="month" value={month} onChange={e=>setMonth(e.target.value)} id="">
                {
                  labels?.map((month, i)=>{
                    return<option value={i} key={month}>
                    {month}
                  </option>})
                  }
            </select>
          </div>
            { yearTransactions.length?
            <div className={style.graphicWrapper}>
              <div className={style.graphicMonth}>
                <h3>Credit transactions</h3>
                <MonthlyGraphic year={year} month={month} type='credit' yearTransactions={yearTransactions} />
              </div>
              <div className={style.graphicMonth}>
                <h3>Debit transactions</h3>
                <MonthlyGraphic year={year} month={month} type='debit' yearTransactions={yearTransactions} />
              </div>
            </div>
            :<div className={style.message}>No Transactions found in the year slected</div>}
          </div>
        </div>
        </div> :<div className={style.warning}>Sorry you have no credentials, please, Log in again</div>}
    </div>
  )
}

export const getServerSideProps = async ({params})=>{
    const acc = await axios.get(`https://myfin-sergioomarsanchez.vercel.app/api/accounts/` + params.id )
    return {
        props:{
        acc: acc.data
      }
    }
  }

export default AccountDetail