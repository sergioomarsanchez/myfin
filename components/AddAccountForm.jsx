import React from 'react'
import style from '../styles/AddAccountForm.module.css'

function AddAccountForm({setIsOpen}) {
  return (
    <div className={style.container}>
        <div className={style.wrapper}>
        <div className={style.close} onClick={()=>setIsOpen(false)}>X</div>
        </div>
        AddAccountForm
        </div>
  )
}

export default AddAccountForm