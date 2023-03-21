import React, { useState, } from 'react'
import { useDispatch } from 'react-redux'
import { addTransactions, updateTotals } from '../store/actions'
import axios from 'axios'
import Swal from 'sweetalert2'
import style from '../styles/AddTransactionForm.module.css'

function AddTransactionForm({account, setIsOpen, currentBalance, entityName}) {
    const [input, setInput] = useState({
        amount:'',
        type:"credit",
        method:"credit",
        category: 'Other',
        date:new Date()
    })
    const [error, setError] = useState('')
    const [categories, setCategories] = useState({
        'credit':[ 'Other', 'Salary', 'Freelance/Contract Work', 'Investments', 'Rental Income', 'Gifts'],
        'debit':['Other', 'Housing', 'Transportation', 'Food', 'Entertainment', 'Utilities', 'Insurance', 'Healthcare', 'Debt Repayment', 'Savings', 'Investments', 'Taxes']
})
    const [methods, setMethods] = useState({
                                            'credit':['credit','cash'],
                                            'debit':['debit', 'cash']
                                        })
    const types = ["debit", "credit"]

    let dispatch = useDispatch()

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
        console.log(input)
        try {
            const url='http://localhost:3000/api/transactions'
            const { data: res } = await axios.post(url, {...input, account:account})

            if(input.type === 'credit'){
                currentBalance = currentBalance + Number(input.amount)
                if(entityName.toLowerCase().includes(' ars')){
                    dispatch(updateTotals({transactionType:'credit', currency: 'ars', amount:input.amount}))
                } else{
                    dispatch(updateTotals({transactionType:'credit', currency: 'usd', amount:input.amount}))
                }
            } else {
                currentBalance = currentBalance - Number(input.amount)
                if(entityName.toLowerCase().includes(' ars')){
                    dispatch(updateTotals({transactionType:'debit', currency: 'ars', amount:input.amount}))
                } else{
                    dispatch(updateTotals({transactionType:'debit', currency: 'usd', amount:input.amount}))
                }
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
            setIsOpen(false)
            dispatch(addTransactions(account, {...input, account:account}))
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
        {methods[input.type].map(element=>{
            return(
                <option className={style.optionSelect}key={element} value={element} required >{element}</option>
                )
            })}
        </select>
        <label htmlFor="category">Select Transaction Category:</label>
        <select value={input.category} name='category' className={style.select} onChange={(e)=>handleInput(e)}>
        { 
        categories[input.type].map(element=>{
            return(
                <option className={style.optionSelect}key={element} value={element} required >{element}</option>
            )
        })
        }
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