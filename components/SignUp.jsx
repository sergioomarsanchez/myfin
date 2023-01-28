import React, {useState} from 'react'
import style from '../styles/SignUp.module.css'
import axios from 'axios'
import { useRouter} from 'next/router'

function SignUp({setIsOpen}) {
    const router = useRouter()
    const [input, setInput] = useState({
        firstName:'',
        lastName:'',
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
            const url='http://localhost:3000/api/users'
            const { data: res } = await axios.post(url, input)
            router.push('/')
            alert(res.message)
           setInput({
                firstName:'',
                lastName:'',
                email:'',
                password:''
            })
            setIsOpen(false)
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                setError(error.response.data.message)
            }
        }
    }

  return (
    <div className={style.container}>
        <form className={style.wrapper} onSubmit={handleSubmit}>
        <div className={style.close} onClick={()=>setIsOpen(false)}>X</div>
        <h2 className={style.title}>Welcome to My Fin, Sign Up!</h2>
        <div className={style.input}>First Name: <br/><input value={input.firstName} name='firstName' type="text" placeholder='e.g Jon' required onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Last Name: <br/><input value={input.lastName} name='lastName' type="text" placeholder='e.g Doe' required onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Email Address: <br/><input value={input.email} name='email' type="text" placeholder='e.g jondoe@example.com' required onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Password: <br/><input value={input.password} name='password' type="password" placeholder='e.g Amias12!' required onChange={(e)=>handleInput(e)}/></div>

        {error && <div className={style.error}>* {error}</div>}

        <div className={style.buttonContainer}>
            <button className={style.signupButton} type='submit'>Sign Up</button>
            <button className={style.cancelButton} onClick={()=>setIsOpen(false)}>Cancel</button>
        </div>
        </form>
    </div>
  )
}

export default SignUp