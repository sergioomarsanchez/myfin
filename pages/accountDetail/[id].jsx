import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTransactions } from '../../store/actions'
import axios from 'axios'
import style from '../../styles/Profile.module.css'
import Image from 'next/image'

function Profile({acc}) {
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
  return (
    <div className={style.container}>
        { id && token?<div className={style.wrapper}>
        <Image src={account.logo} alt='' width={50} height={50}/>
        <h2 className={style.title}>{account.entityName} {account.type}</h2>
        <h4 className={style.totals}>Balance is: <span style={{color: account.balance>0?'#4ada84':'red'}} className={style.totalammount}>${account.balance}</span></h4>
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

export default Profile