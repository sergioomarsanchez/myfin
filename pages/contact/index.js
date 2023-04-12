import React, { useEffect } from 'react'
import style from '../../styles/Contact.module.css'
import ContactForm from '../../components/ContactForm'

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className={style.container}>
        <ContactForm/>
    </div>
  )
}

export default Contact