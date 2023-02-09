import React, {useState, useEffect} from 'react'
import axios from 'axios'
import style from '../../styles/Profile.module.css'
import AccountCard from '../../components/AccountCard'
import AddAccountForm from '../../components/AddAccountForm'

function Profile({user, acc}) {
    const [token, setToken]= useState(false)
    const [id, setId]= useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const token =  sessionStorage.getItem('token')
        const id = sessionStorage.getItem('id')
        setToken(token)
        setId(id)
       }, [])
  return (
    <div className={style.container}>
        { id && token?<did className={style.wrapper}>
        <h2 className={style.title}>Welcome back <span className={style.titleName}>{user.firstName + ' ' + user.lastName}</span>, nice to see you again</h2>
        {isOpen? <AddAccountForm userId={id} setIsOpen={setIsOpen}/> : null}
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
        </did> :<div className={style.warning}>Sorry you have no credentials, please, Log in again</div>}
    </div>
  )
}

export const getServerSideProps = async ({params})=>{
    const res = await axios.get(`http://localhost:3000/api/users/${params.id}`)
    const acc = await axios.get(`http://localhost:3000/api/accounts/?userId=` + params.id )
    return {
        props:{
        user: res.data,
        acc: acc.data
      }
    }
  }

export default Profile