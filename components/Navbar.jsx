import React, {useState} from 'react'
import style from '../styles/NavBar.module.css'
import Image from 'next/image'
import Login from './Login'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <Image src='/img/LogoDark.png' alt='' className={style.logo} height={100} width={100}/>
      </div>
      <div className={style.linksContainer}>
        <div className={style.link}>Home</div>
        <div className={style.link}>About</div>
        <div className={style.link}>Contact</div>
        <div className={style.link}>Blog</div>
        <div className={style.link}>Career</div>
      </div>
      <div className={style.loginContainer}>
        {isOpen?<Login setIsOpen={setIsOpen}/>:<button onClick={()=>setIsOpen(true)} className={style.loginButton}>Log In</button>}
      </div>
    </div>
  )
}

export default Navbar