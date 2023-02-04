import React from 'react'
import axios from 'axios'
import style from '../../styles/Profile.module.css'
import AccountCard from '../../components/AccountCard'

function Profile({user, acc}) {

  return (
    <div className={style.container}>
        <h2>User: {user.firstName + ' ' + user.lastName}</h2>
        <h2>Email: {user.email}</h2>

        {
            acc?.map(a=>{
                return(
                    <AccountCard key={a._id} acc={a}/>
                )
            })
        }
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