import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import style from '../styles/AddTransactionForm.module.css'

function AddTransactionForm({account, setIsOpen, currentBalance}) {
    const [input, setInput] = useState({
        amount:'',
        type:"credit",
        method:"credit",
        date:new Date()
    })
    const [error, setError] = useState('')
    const methods = ['cash', 'debit', 'credit']
    const types = ["debit", "credit"]

    function  handleInput(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
       
    }
    useEffect(() => {
        console.log(input)
    }, [input])
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
            const url='http://localhost:3000/api/transactions'
            const { data: res } = await axios.post(url, {...input, account:account})

            if(input.type === 'credit'){
                currentBalance = currentBalance + Number(input.amount)
            } else {
                currentBalance = currentBalance - Number(input.amount)
            }
            const acc = await axios.put('http://localhost:3000/api/accounts/' + account, { balance:currentBalance }) 


            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Congratulations, Transaction Added Successfully!',
            showConfirmButton: false,
            timer: 1500,
            color:'white',
            background:'#141c24',
            })

           setInput({
            amount:'',
            type:"credit",
            method:"credit",
            date:''
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
        <h2 className={style.title}>Add new Transaction</h2>
        
        <div className={style.input}>Date<br/><input value={input.date} name='date' required type="date" onChange={(e)=>handleInput(e)}/></div>
        
        <label htmlFor="type">Select Transaction type:</label>
        <select value={input.type} name='type' className={style.select} onChange={(e)=>handleInput(e)}>
        {types.map(element=>{
            return(
                <option className={style.optionSelect}key={element} value={element} required >{element}</option>
            )
        })}
        </select>
        <label htmlFor="method">Select Method type:</label>
        <select value={input.method} name='method' className={style.select} onChange={(e)=>handleInput(e)}>
        {methods.map(element=>{
            return(
                <option className={style.optionSelect}key={element} value={element} required >{element}</option>
                )
            })}
        </select>
        <div className={style.input}>Amount: <br/><input value={input.amount} name='amount' type="number" placeholder='e.g 1000' onChange={(e)=>handleInput(e)}/></div>

        {error && <div className={style.error}>* {error}</div>}

        <div className={style.buttonContainer}>
            <button className={style.createButton} type='submit'>Add transaction</button>
            <button className={style.cancelButton} name='Cancel' onClick={(e)=>handleCancel(e)}>Cancel</button>
        </div>
        </form>
        </div>
  )
}

export default AddTransactionForm