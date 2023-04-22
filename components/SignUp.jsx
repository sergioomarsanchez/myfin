import {useState} from 'react'
import style from '../styles/SignUp.module.css'
import axios from 'axios'
import { useRouter} from 'next/router'
import Swal from 'sweetalert2'
import Loader from './Loader'

function SignUp({setIsOpen}) {
    const router = useRouter()
    const [input, setInput] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function  handleInput(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
       
    }

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        try {
            const url='https://myfin-sergioomarsanchez.vercel.app/api/users'
            const { data: res } = await axios.post(url, input)
            router.push('/')
            setLoading(false)
            Swal.fire({
                text:res.message,
                icon: 'sucess',
                iconColor: '#497aa6',
                showCloseButton: true,
                showDenyButton: false,
                confirmButtonText: 'Ok',
                allowEnterKey: false,
                color:'white',
                background:'#141c24',
                customClass: {
                    popup: 'Alert',
                    closeButton: 'closeButton',
                    confirmButton: 'confirmButton',
                    denyButton: 'denyButton',
                }
            })
           setInput({
                firstName:'',
                lastName:'',
                email:'',
                password:''
            })
            setIsOpen(false)
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                setLoading(false)
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
                    footer: '<b>Be sure that you are not already singed up and that you are introducing a correct email and password</b>',
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

  return (
    <div className={style.container}>
        {loading && <div className={style.loader}><Loader/></div>}
        <form className={loading? style.wrapperLoading :style.wrapper} onSubmit={handleSubmit}>
        <div className={style.close} onClick={()=>setIsOpen(false)}>X</div>
        <h2 className={style.title}>Welcome to My Fin, Sign Up!</h2>
        <div className={style.input}>First Name: <br/><input value={input.firstName} name='firstName' type="text" placeholder='e.g Jon' required onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Last Name: <br/><input value={input.lastName} name='lastName' type="text" placeholder='e.g Doe' required onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Email Address: <br/><input value={input.email} name='email' type="text" placeholder='e.g jondoe@example.com' required onChange={(e)=>handleInput(e)}/></div>
        <div className={style.input}>Password: <br/><input value={input.password} name='password' type="password" placeholder='e.g Amias12!' required onChange={(e)=>handleInput(e)}/></div>
        <span className={style.passwordRequirements}>Password must contain at least one capital letter, one number, and one special character (e.g. !, @, #, $, %, ^, *, _, -, +, =, |, ?, :, ;)</span>

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