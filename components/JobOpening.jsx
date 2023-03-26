import React,{useState} from 'react'
import style from '../styles/JobOpening.module.css'

function JobOpening({key, opening}) {
    const [display, setDisplay] = useState('none')
    const [animate, setAnimate] = useState(false)

    function showHide(){
        if (display==='none') {
            setAnimate(true)
            setDisplay('flex')
        } else {
            setAnimate(false)
            setTimeout(() => {
                setDisplay('none')
            }, 300)
        }
    }

  return (
    <div key={key} className={style.container}>
        <h4 onClick={()=>showHide()} className={style.title}>{opening.position}{display==='none'?<span className={style.arrow}>{">"}</span>:<span className={style.arrow}>{"v"}</span>}</h4>
        <div className={style.wrapper} style={{"display":display, "opacity": animate ? "1" : "0", "transition": "opacity 0.3s ease-in-out"}}>
            <div>Location: {opening.location}</div>
            <p className={style.description}>What we are looking for: {opening.description}</p>
            <label htmlFor="responsibilities">Responsibilities:</label>
            <ul name='responsibilities' className={style.responsibilitiesList}>
                {
                    opening.responsibilities&&opening.responsibilities.map((resp, i)=>{
                        return <li className={style.resp} key={i}>{resp}</li>
                    })
                }
            </ul>  
            <label htmlFor="qualifications">Qualifications:</label>
            <ul name='qualifications' className={style.qualificationsList}>
                {
                    opening.qualifications&&opening.qualifications.map((qual, i)=>{
                        return <li className={style.qual} key={i}>{qual}</li>
                    })
                }
            </ul>  
            <label htmlFor="benefits">Benefits:</label>
            <ul name='benefits' className={style.benefits}>
                {
                    opening.benefits&&opening.benefits.map((bene, i)=>{
                        return <li className={style.bene} key={i}>{bene}</li>
                    })
                }
            </ul> 

            <p className={style.contactCEO}>Interested in joining our team? Please reach out to our CEO, Sergio Sánchez, at myfinCEO@gmail.com with the name of the position in the subject line and your resume attached. We look forward to hearing from you!</p>

        <span className={style.hide} onClick={()=>showHide()}>Show Less</span>
        </div>
    </div>
  )
}

export default JobOpening
