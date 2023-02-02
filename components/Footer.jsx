import React from 'react'
import style from '../styles/Footer.module.css'
import Image from 'next/image'

function Footer() {
  return (
    <div className={style.container}>
      <div className={style.img}>
      <Image src='/img/FooterImg.png' alt='' height={100} width={500} className={style.footerImg}/>
      </div>
      <div className={style.left}>
        <h4>The best app to manage your finances, savings, investment and budgets</h4>
      </div>
      <div className={style.right}>
        <ul className={style.list}>
          <li className={style.item}>About</li>
          <li className={style.item}>Product Help</li>
          <li className={style.item}>Report an issue</li>
          <li className={style.item}>Careers</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer