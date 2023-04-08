import React from 'react'
import JobOpening from '../../components/JobOpening'
import style from '../../styles/Career.module.css'
import {perks, openings} from '../../data/data.js'
function Career() {
  return (
    <div className={style.container}>
    <h2 className={style.title}>Join Us</h2> 
    <p className={style.text}>{"Join our team at My Fin and be a part of a dynamic and innovative company that is revolutionizing the way people manage their finances. We are dedicated to creating a culture of collaboration, growth, and creativity, where every team member has the opportunity to contribute their unique talents and ideas."}</p>  
    <p className={style.text}>{"At My Fin, we offer a range of benefits to support the personal and professional growth of our team members. Here are some of the benefits you can expect when you join our team:"}</p>
    <ul className={style.perkList}>
    {
        perks&&perks.map((perk, i)=>{
            return <li className={style.perk} key={i}>{perk}</li>
        })
    }
    </ul>  
    <p className={style.text}>{"Join our team at My Fin and take the next step in your career while making a positive impact on people's lives."}</p>  
    <h4 className={style.openingsTitle}>Our Openings</h4>  
    <section className={style.openingContainer}>
    {
        openings? openings.map((opening, index)=>{
            return <div key={index} >
              <JobOpening opening={opening} />
              </div>
        }):<div>We have no Openings at the moment</div>
    }
    </section>
    </div>
  )
}

export default Career