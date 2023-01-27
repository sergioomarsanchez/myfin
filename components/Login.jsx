import React, {useState} from 'react'
import style from '../styles/Login.module.css'
import axios from 'axios'
import { useRouter} from 'next/router'

function Login({setIsOpenLogin}) {
    const router = useRouter()
    const [input, setInput] = useState({
        email:'',
        password:''
    })
    const [error, setError] = useState('')

    function  handleInput(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
       
    }

    async function handleSubmit(e){
        e.preventDefault()

        try {
            const url='http://localhost:3000/api/auth'
            const { data: res } = await axios.post(url, input)
            localStorage.setItem('token', res.data)
            router.push('/')
            alert(res.message)
           setInput({
                email:'',
                password:''
            })
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                setError(error.response.data.message)
            }
        }
    }
    
  return (
    <div className={style.container}>
        <form className={style.wrapper} onSubmit={handleSubmit}>
        <div className={style.close} onClick={()=>setIsOpenLogin(false)}>X</div>
        <h2 className={style.title}>Welcome Back, Log In!</h2>
        <div className={style.input}>Email Address: <br/><input value={input.email} name='email' type="text" placeholder='e.g jondoe@example.com' required onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Password: <br/><input value={input.password} name='password' type="password" placeholder='e.g Amias12!' required onChange={(e)=>handleInput(e)}/></div>

        {error && <div className={style.error}>* {error}</div>}

        <div className={style.buttonContainer}>
            <button className={style.loginButton} type='submit'>Log In</button>
            <button className={style.cancelButton} onClick={()=>setIsOpenLogin(false)}>Cancel</button>
        </div>
        </form>
    </div>
  )
}

export default Login