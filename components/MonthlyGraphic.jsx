import { useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getMonthlyGraphicData } from '../graphicFunctions/utils';
import { setTransactionsPerYear } from '../store/actions';
import style from '../styles/MonthlyGraphic.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function MonthlyGraphic({year, month, type, yearTransactions}) {
    const dispatch = useDispatch()
    const graphicData = useSelector(state=>state.transactionsPerYear)
    const [totalCredit, setTotalCredit] = useState(0)
    const [totalDebit, setTotalDebit] = useState(0)
    const categories = {
        'credit':[ 'Other', 'Salary', 'Freelance/Contract Work', 'Investments', 'Rental Income', 'Gifts'],
        'debit':['Other', 'Housing', 'Transportation', 'Food', 'Entertainment', 'Utilities', 'Insurance', 'Healthcare', 'Debt Repayment', 'Savings', 'Investments', 'Taxes']
    }


    useEffect(() => {
        if(!graphicData)dispatch(setTransactionsPerYear(getMonthlyGraphicData(yearTransactions)))
    }, [year])
    useEffect(() => {
        if(!graphicData)return
        setTotalCredit(graphicData[Number(month)+1]['credit'].reduce((total,transactions)=>total+transactions))
        setTotalDebit(graphicData[Number(month)+1]['debit'].reduce((total,transactions)=>total+transactions))
    }, [month])
    
    const data = {
        labels: categories[type],
        datasets: [
          {
            label: `Total amount of ${type==='credit'?'Income':'Outcome'}`,
            data: Object.keys(graphicData).length?graphicData[Number(month)+1][type]:[],
            backgroundColor: type==='credit'?[
              "rgba(253, 242, 97, 0.3)",
              "rgba(232, 74, 95, 0.3)",
              "rgba(85, 239, 196, 0.3)",
              "rgba(243, 104, 224, 0.3)",
              "rgba(114, 124, 245, 0.3)",
              "rgba(54, 209, 220, 0.3)",
          ]:
          [
              "rgba(253, 242, 97, 0.3)",
              "rgba(232, 74, 95, 0.3)",
              "rgba(85, 239, 196, 0.3)",
              "rgba(243, 104, 224, 0.3)",
              "rgba(114, 124, 245, 0.3)",
              "rgba(54, 209, 220, 0.3)",
              "rgba(219, 219, 219, 0.3)",
              "rgba(255, 107, 107, 0.3)",
              "rgba(114, 114, 114, 0.3)",
              "rgba(0, 230, 64, 0.3)",
              "rgba(255, 159, 67, 0.3)",
              "rgba(107, 185, 240, 0.3)"
            ],
            borderColor: type==='credit'?[
              "rgba(253, 242, 97)",
              "rgba(232, 74, 95)",
              "rgba(85, 239, 196)",
              "rgba(243, 104, 224)",
              "rgba(114, 124, 245,)",
              "rgba(54, 209, 220)",
          ]:
            [
              "rgb(253, 242, 97)",
              "rgb(232, 74, 95)",
              "rgb(85, 239, 196)",
              "rgb(243, 104, 224)",
              "rgb(114, 124, 245)",
              "rgb(54, 209, 220)",
              "rgb(219, 219, 219)",
              "rgb(255, 107, 107)",
              "rgb(114, 114, 114)",
              "rgb(0, 230, 64)",
              "rgb(255, 159, 67)",
              "rgb(107, 185, 240)"
            ],
            borderWidth: 1,
          },
        ],
      };
      

  return (
    <div className={style.container}>
        
      {
       type==='credit' && totalCredit===0?<div>No Credit transactions made this month</div>:
       type==='debit' && totalDebit===0?<div>No Debit transactions made this month</div>:
       Object.keys(graphicData).length?<Doughnut data={data} />:<div>Loading...</div>
      }  
    </div>
  )
}

export default MonthlyGraphic