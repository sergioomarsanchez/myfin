import Swal from 'sweetalert2'
import axios from 'axios'
import React, { useState } from 'react'
import style from '../styles/AddAccountForm.module.css'

function AddAccountForm({ userId, setIsOpen}) {

    const [input, setInput] = useState({
        accountType:"checking",
        balance:'',
        entityName:'',
        currency:'ARS'

    })
    const [error, setError] = useState('')
    const accountTypes = ["checking", "savings", "credit card"]
    const currency = ["USD", "ARS"]
    
    function  handleInput(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
       
    }
    
    
    function handleCancel(e){
        Swal.fire({
            title: `Are you sure you want to ${e.target.name!=='X'?'Close':'Cancel'} Create?`,
            text: "All data inputed will be lost!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${e.target.name==='X'?'Close':'Cancel'} it!`
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Canceled!',
                'Your creation has been canceled.',
                'info'
              )
              setIsOpen(false)
            }
          })
    }

    async function handleSubmit(e){
        e.preventDefault()

        try {

            input.entityName = `${input.entityName} ${input.currency}`
            const url='http://localhost:3000/api/accounts'
            const { data: res } = await axios.post(url, {...input, userId:userId})
            


            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Congratulations, Account Created Successfully!',
            showConfirmButton: false,
            timer: 1500,
            color:'white',
            background:'#141c24',
            })

           setInput({
            accountType:'',
            balance:'',
            entityName:''
            })
            setIsOpen(false)
        setTimeout(() => {
            window.location.reload()
        }, 1300);
        } catch (error) {
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
  <form className={style.wrapper} onSubmit={handleSubmit}>
        <div className={style.close} name='X' onClick={(e)=>handleCancel(e)}>X</div>
        <h2 className={style.title}>Add new Accoung</h2>
        <div className={style.input}>Entity: <br/><input value={input.entityName} name='entityName' type="text" placeholder='e.g Brubank' onChange={(e)=>handleInput(e)}/></div>
        <label htmlFor="accountType">Select Account type:</label>
        <select value={input.accountType} name='accountType' className={style.select} onChange={(e)=>handleInput(e)}>
                {accountTypes.map(element=>{
                    return(
                        <option className={style.optionSelect}key={element} value={element} required >{element}</option>
                    )
                })}
        </select>
        <label htmlFor="currency">Select Currency type:</label>
        <select value={input.currency} name='currency' className={style.select} onChange={(e)=>handleInput(e)}>
                {currency.map(element=>{
                    return(
                        <option className={style.optionSelect}key={element} value={element} required >{element}</option>
                    )
                })}
        </select>
        <div className={style.input}>Balance: <br/><input value={input.balance} name='balance' type="number" placeholder='e.g 1000' onChange={(e)=>handleInput(e)}/></div>

        {error && <div className={style.error}>* {error}</div>}

        <div className={style.buttonContainer}>
            <button className={style.createButton} type='submit'>Create Account</button>
            <button className={style.cancelButton} name='Cancel' onClick={(e)=>handleCancel(e)}>Cancel</button>
        </div>
        </form>
        </div>
  )
}

export default AddAccountForm