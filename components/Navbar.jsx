import {useState, useEffect} from 'react'
import Link from 'next/link'
import style from '../styles/NavBar.module.css'
import Image from 'next/image'
import SignUp from './SignUp'
import Login from './Login'
import Swal from 'sweetalert2'
import { clearTransactions } from '../store/actions'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser]= useState(false)
  const [id, setId]= useState(false)
  const [isOpenLogin, setIsOpenLogin] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()


  useEffect(() => {
   const token =  sessionStorage.getItem('token')
   const id = sessionStorage.getItem('id')
   setUser(token)
   setId(id)
  }, [])
  function handleClick() {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4adac4',
      cancelButtonColor: '#9603c4',
      confirmButtonText: 'Yes, Log out!',
      color:'white',
      background:'#141c24',
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear()
        setUser(false)
        setId(false)
        dispatch(clearTransactions())
        router.push('/')
        Swal.fire({
          color:'white',
          background:'#141c24',
          title:'Logged Out successfully!',
          text:'Comeback Soon.',
          icon:'success'})
        }
    })
  }
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
        {user && router.pathname!=="/profile/[id]" ? <Link href={'/profile/' + id} passHref><button className={style.signupButton}>Go to Profile</button> </Link>:null}
        {user?<button onClick={handleClick} className={style.logoutButton}>Log out</button>:null}
        {!user && (isOpen?<SignUp setIsOpen={setIsOpen}/>:<button onClick={()=>setIsOpen(true)} className={style.signupButton}>Sign Up</button>)}
        {!user && (isOpenLogin?<Login setUser={setUser} setIsOpenLogin={setIsOpenLogin} setIsOpen={setIsOpen} setId={setId} />:<button onClick={()=>setIsOpenLogin(true)} className={style.loginButton}>Log In</button>)}
      </div>
    </div>
  )
}

export default Navbar