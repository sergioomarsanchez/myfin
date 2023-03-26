import React,{useState} from 'react'
import style from '../styles/JobOpening.module.css'

function JobOpening({key, opening}) {
    const [display, setDisplay] = useState('none')

    function showHide(){
        display==='none'?setDisplay('flex'):setDisplay('none')
    }

  return (
    <div key={key}className={style.container}>
        <h4 onClick={()=>showHide()} className={style.title}>{opening.position}{display==='none'?<span className={style.arrow}>{">"}</span>:<span className={style.arrow}>{"v"}</span>}</h4>
        <div className={style.wrapper} style={{"display":display}}> hola 
        <span onClick={()=>showHide()}>Show Less</span>
        </div>
    </div>
  )
}

export default JobOpening