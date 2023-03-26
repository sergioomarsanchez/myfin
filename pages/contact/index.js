import React from 'react'
import style from '../../styles/Contact.module.css'
import ContactForm from '../../components/ContactForm'

function Contact() {
  return (
    <div className={style.container}>
        <ContactForm/>
    </div>
  )
}

export default Contact