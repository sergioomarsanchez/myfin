import React, {useState} from 'react'
import style from '../styles/Login.module.css'

function Login({setIsOpen}) {

    const [input, setInput] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })

    function  handleInput(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div className={style.container}>
        <div className={style.wrapper} >
        <div className={style.close} onClick={()=>setIsOpen(false)}>X</div>
        <div className={style.input}>First Name: <br/><input name='firstName' type="text" placeholder='e.g Jon' onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Last Name: <br/><input name='lastName' type="text" placeholder='e.g Doe'onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Email Address: <br/><input name='email' type="text" placeholder='e.g jondoe@example.com'onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Password: <br/><input name='password' type="text" placeholder='e.g Amias12!'onChange={(e)=>handleInput(e)}/></div>
        </div>
    </div>
  )
}

export default Login