import Swal from 'sweetalert2'
import axios from 'axios'
import React, { useState } from 'react'
import Image from 'next/image'
import style from '../styles/AddAccountForm.module.css'

function AddAccountForm({ userId, setIsOpen}) {

    const [input, setInput] = useState({
        accountType:"checking",
        balance:'',
        entityName:'',
        currency:'ARS',
        logo:''

    })
    const [error, setError] = useState('')
    const [entities, setEntities] = useState([])
    const [selected, setSelected] = useState({state:false})
    const accountTypes = ["checking", "savings", "credit card"]
    const currency = ["USD", "ARS"]

    async function  handleInput(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        if(e.target.name === 'entityName'&& e.target.value!==''){
            let {data} = await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${e.target.value}`)
            data?setEntities([...data]):null
        }
       
    }
    function handleOnClick(logo, name){
        setInput({
            ...input,
            ['entityName']: name,
            ['logo']: logo
        })
        setSelected({
            state:true,
            name:name,
            logo:logo
        })
        setEntities([])
    }
    
    function handleCancel(e){
        Swal.fire({
            title: `Are you sure you want to ${e.target.name!=='X'?'Close':'Cancel'} Create?`,
            text: "All data inputed will be lost!",
            icon: 'warning',
            showCancelButton: true,
            color:'white',
            background:'#141c24',
            confirmButtonText: `Yes, ${e.target.name==='X'?'Close':'Cancel'} it!`
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
              title:'Canceled!',
              text: 'Your account creation has been canceled.',
              icon: 'error',
              color:'white',
              background:'#141c24',
            })
              setIsOpen(false)
            }
          })
    }

    async function handleSubmit(e){
        e.preventDefault()

        try {

            input.entityName = `${input.entityName} ${input.currency}`
            const url='https://myfin-sergioomarsanchez.vercel.app/api/accounts'
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
        } catch (error) {
            if(error.response && error.response.status >=400 && error.response.status <= 500){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: error.response.data.message,
                    color:'white',
                    background:'#141c24',
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
        <div className={style.entityInputContainer}>

        {
            selected.state?
            <div className={style.selectedContainer}>
                <Image className={style.selectedEntityLogo} src={selected.logo} alt={selected.name} width={30} height={30}/>
                <span className={style.selectedEntity} value={selected.name} name='entityName'>{selected.name}</span>
                <span className={style.unselect} onClick={()=>{
                    setSelected({state:false})
                    setInput({
                        ...input,
                        ['entityName']: '',
                        ['logo']: ''
                    })
                }}>Unselect</span>
            </div>:
            <div className={style.input}>Entity: <br/><input value={input.entityName} name='entityName' defaultValue={input.entityName} placeholder='e.g Brubank' onChange={(e)=>handleInput(e)}/></div>
        }
        {
            selected.state || !entities.length?null:
        <div className={style.suggestionsContainer}>
        {entities?.map(element=>{
            return(<div className={style.suggestions} key={element.name} onClick={()=>handleOnClick(element.logo, element.name)}>
                <Image className={style.entityLogo} src={element.logo} alt={element.name} width={10} height={10}/>
                <span className={style.entityName} value={element.name} name='entityName' >{element.name}</span>
            </div>
                    )
                })}
        </div>
        }
        </div>
        <label htmlFor="accountType">Select Account type:</label><br/>
        <select value={input.accountType} name='accountType' className={style.select} onChange={(e)=>handleInput(e)}>
                {accountTypes.map(element=>{
                    return(
                        <option className={style.optionSelect}key={element} value={element} required >{element}</option>
                    )
                })}
        </select><br/>
        <label htmlFor="currency">Select Currency type:</label><br/>
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
            <button className={style.cancelButton} type='button' name='Cancel' onClick={(e)=>handleCancel(e)}>Cancel</button>
        </div>
        </form>
        </div>
  )
}

export default AddAccountForm