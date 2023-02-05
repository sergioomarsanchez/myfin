import React, {useState, useEffect} from 'react'
import axios from 'axios'
import style from '../../styles/Profile.module.css'
import AccountCard from '../../components/AccountCard'

function Profile({user, acc}) {
    const [token, setToken]= useState(false)
    const [id, setId]= useState(false)

    useEffect(() => {
        const token =  sessionStorage.getItem('token')
        const id = sessionStorage.getItem('id')
        setToken(token)
        setId(id)
       }, [])
console.log('id', id)
console.log('token', token)
  return (
    <div className={style.container}>
        { id && token?<did className={style.wrapper}>
        <h2>User: {user.firstName + ' ' + user.lastName}</h2>
        <h2>Email: {user.email}</h2>

        {
            acc?.map(a=>{
                return(
                    <AccountCard key={a._id} acc={a}/>
                )
            })
        }
        </did> :<div>Not permission to be here, Log in again</div>}
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