import React, {useState, useEffect, useRef} from 'react';
import style from '../styles/ContactForm.module.css';
import { validateInput } from '../emailHandeler/validationFunction';
import Swal from 'sweetalert2';
import axios from 'axios';


const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [error, setError] = useState({});


    function handleInput(e){
        e.target.name==='name'?setName(e.target.value)
                              :e.target.name==='email'?setEmail(e.target.value)
                              :setMessage(e.target.value)

                              console.log(name, email, message)
    }

    const isInitialMount = useRef(true)

useEffect(()=>{  
    if (isInitialMount.current) {
        isInitialMount.current = false;
     } else {
         const errorValidated = validateInput(name, email, message)
        setErrors(errorValidated)
     }                              
}, [name, email, message] )

    

    async function handleSubmit (event) {
    event.preventDefault();
    try {
        const url='https://myfin-sergioomarsanchez.vercel.app/api/contact'
        const { data: res } = await axios.post(url, {name, email, message})

        Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Thank you very much for your email, Soon we will replying to your email address!',
        showConfirmButton: false,
        timer: 6000,
        color:'white',
        background:'#141c24',
        })
        setName("");
        setEmail("");
        setMessage("");
        isInitialMount.current = true;
    } catch (error) {
        console.log(error)
        if(error.response && error.response.status >=400 && error.response.status <= 500){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: error.response.data.message
                })
            setError(error.response.data.message)
        }
    }
}


  return (
    <div className={style.container}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
          <div className={style.inputContainer}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} required onChange={(e)=>handleInput(e)}/>
        {errors.name?<div className={style.errors}>* {errors.name}</div>:<div className={style.noErrors}></div>}
          </div>
          <div className={style.inputContainer}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} required onChange={(e)=>handleInput(e)}/>
        {errors.email?<div className={style.errors}>* {errors.email}</div>:<div className={style.noErrors}></div>}
          </div>
          <div className={style.inputContainer}>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="5" value={message} required onChange={(e)=>handleInput(e)}/>
        {errors.message?<div className={style.errors}>* {errors.message}</div>:<div className={style.noErrors}></div>}
          </div>
        <button disabled={name===''||email===''||message===''||Object.keys(errors).length > 0} type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactForm;
