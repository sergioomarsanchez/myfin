import {useState} from 'react'
import Link from 'next/link'
import style from '../styles/NavBar.module.css'
import Image from 'next/image'
import SignUp from './SignUp'
import Login from './Login'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenLogin, setIsOpenLogin] = useState(false)
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <Link href='/' passHref>
        <Image src='/img/LogoDark.png' alt='' className={style.logo} height={100} width={100} priority/>
        </Link>
      </div>
      <div className={style.linksContainer}>
      <Link href='/' passHref>
        <div className={style.link}>Home</div>
        </Link>
        <Link href='/about' passHref>
        <div className={style.link}>About</div>
        </Link>
        <div className={style.link}>Contact</div>
        <div className={style.link}>Blog</div>
        <div className={style.link}>Career</div>
      </div>
      <div className={style.signupContainer}>
        {isOpen?<SignUp setIsOpen={setIsOpen}/>:<button onClick={()=>setIsOpen(true)} className={style.signupButton}>Sign Up</button>}
        {isOpenLogin?<Login setIsOpenLogin={setIsOpenLogin}/>:<button onClick={()=>setIsOpenLogin(true)} className={style.loginButton}>Log In</button>}
      </div>
    </div>
  )
}

export default Navbar