import React from 'react'
import style from '../../styles/About.module.css'

function About() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>About</h2>
        <p className={style.text}>My Fin is a powerful financial management app designed to help you take control of your finances. With My Fin, you can easily add and monitor your bank accounts and transactions, and get a comprehensive view of your finances through a user-friendly dashboard with intuitive statistics and graphics.</p>
        <p className={style.text}>Managing finances can be a time-consuming and complicated task, but with My Fin, you can simplify the process and stay on top of your money. The app is designed to help you track your income and expenses, and identify areas where you can save money or make smarter financial decisions.</p>
        <p className={style.text}>With My Fin, you can view your financial data in a way that makes sense to you. The app provides you with a range of customizable charts, graphs, and tables that allow you to quickly analyze your financial information and identify trends and patterns.</p>
        <p className={style.text}>Whether you are a student, a business owner, or anyone looking to better manage their finances, My Fin is the perfect solution. The app is easy to use, secure, and accessible from anywhere, so you can keep track of your finances on the go.</p>
        <p className={style.text}>Take control of your finances today with My Fin!</p>
      </div>
  )
}

export default About