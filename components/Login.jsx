import React, {useState} from 'react'
import style from '../styles/Login.module.css'
import axios from 'axios'
import { useRouter} from 'next/router'
import Swal from 'sweetalert2'

function Login({setIsOpenLogin, setIsOpen, setUser}) {
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
            sessionStorage.setItem('token', res.data)
            sessionStorage.setItem('id', res.id)
            sessionStorage.setItem('name', res.name)
            setUser(res.data)
            router.push('/')
            Swal.fire({
                text:`Welcome back ${res.name}, ` + res.message,
                icon: 'success',
                iconColor: '#497aa6',
                timer:'1500',
                color:'white',
                background:'#141c24',
                showConfirmButton:false,
                
            })
           setInput({
                email:'',
                password:''
            })
            setIsOpenLogin(false)
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                Swal.fire({
                    text:error.response.data.message,
                    icon: 'error',
                    iconColor: 'red',
                    showCloseButton: true,
                    showDenyButton: false,
                    confirmButtonText: 'Ok',
                    allowEnterKey: false,
                    color:'white',
                    background:'#141c24',
                    footer: '<b>Be sure that you are singed up and that you are introducing the correct email and password</b>',
                    customClass: {
                        popup: 'Alert',
                        closeButton: 'closeButton',
                        confirmButton: 'confirmButton',
                        denyButton: 'denyButton',
                    }
                })
                setError(error.response.data.message)
            }
        }
    }
    function handleClick(){
        setIsOpenLogin(false),
         setIsOpen(true)
    }
  return (
    <div className={style.container}>
        <form className={style.wrapper} onSubmit={handleSubmit}>
        <div className={style.close} onClick={()=>setIsOpenLogin(false)}>X</div>
        <h2 className={style.title}>Welcome Back, Log In!</h2>
        <div className={style.input}>Email Address: <br/><input value={input.email} name='email' type="text" placeholder='e.g jondoe@example.com' required onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Password: <br/><input value={input.password} name='password' type="password" placeholder='e.g Amias12!' required onChange={(e)=>handleInput(e)}/></div>

        {error && <div className={style.error}>* {error}</div>}

        <h5 className={style.title2}>New Here?</h5>
        <span onClick={handleClick} className={style.signup}>Click here to Sign up</span>

        <div className={style.buttonContainer}>
            <button className={style.loginButton} type='submit'>Log In</button>
            <button className={style.cancelButton} onClick={()=>setIsOpenLogin(false)}>Cancel</button>
        </div>
        </form>
    </div>
  )
}

export default Login