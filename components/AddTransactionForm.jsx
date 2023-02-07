import React from 'react'
import style from '../styles/AddTransactionForm.module.css'

function AddTransactionForm({setIsOpen}) {
  return (
    <div className={style.container}>
    <div className={style.wrapper}>
    <div className={style.close} onClick={()=>setIsOpen(false)}>X</div>
    </div>
    AddTransactionForm
    </div>
  )
}

export default AddTransactionForm