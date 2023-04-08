import React from 'react'
import Link from 'next/link'
import style from '../styles/MobileMenu.module.css'
import SignUp from './SignUp'
import Login from './Login'

function MobileMenu({ setMobileIsOpen, mobileIsOpen, handleClick, setIsOpen, setIsOpenLogin, isOpen, isOpenLogin, user, setUser, setId}) {
  return (
    <div className={mobileIsOpen ? style.container : style.containerOut}>
       <h5 className={style.title}>Menu</h5>
       <div className={style.linksContainer}>
      <Link href='/' passHref>
        <div onClick={()=>setMobileIsOpen(false)} className={style.link}>Home</div>
        </Link>
        <Link href='/about' passHref>
        <div onClick={()=>setMobileIsOpen(false)} className={style.link}>About</div>
        </Link>
        <Link href='/contact' passHref>
        <div onClick={()=>setMobileIsOpen(false)} className={style.link}>Contact</div>
        </Link>
        <Link href='/news' passHref>
        <div onClick={()=>setMobileIsOpen(false)} className={style.link}>News</div>
        </Link>
        <Link href='/career' passHref>
        <div onClick={()=>setMobileIsOpen(false)} className={style.link}>Career</div>
        </Link>
      </div>
       <div onClick={()=>setMobileIsOpen(false)} className={style.signupContainer}>
        {user && router.pathname!=="/profile/[id]" ? <Link href={'/profile/' + id} passHref><button className={style.signupButton}>Go to Profile</button> </Link>:null}
        {user?<button onClick={handleClick} className={style.logoutButton}>Log out</button>:null}
        {!user && <button onClick={()=>setIsOpen(true)} className={style.signupButton}>Sign Up</button>}
        {!user && <button onClick={()=>setIsOpenLogin(true)} className={style.loginButton}>Log In</button>}
      </div>
    </div>
  )
}

export default MobileMenu