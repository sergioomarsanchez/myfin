import React, {useState} from 'react'
import style from '../styles/NavBar.module.css'

function Navbar() {

  const [isClosed, setIsClosed] = useState(true)
  return (
    <div className={style.container}>
      <div className={style.logoContainer}>Logo</div>
      <div className={style.linksContainer}>home, about, contact, blog, career</div>
      <div className={style.loginContainer}>
        {isClosed?<button onClick={()=>setIsClosed(false)} className={style.loginButton}>Log In</button>:null}
      </div>
    </div>
  )
}

export default Navbar