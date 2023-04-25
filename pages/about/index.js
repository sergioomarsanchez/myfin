import { useEffect } from "react";
import style from "../../styles/About.module.css";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h2 className={style.title}>About</h2>
        <div className={style.text}>
          My Fin is a powerful financial management app designed to help you
          take control of your finances. With My Fin, you can easily add and
          monitor your bank accounts and transactions, and get a comprehensive
          view of your finances through a user-friendly dashboard with intuitive
          statistics and graphics.
        </div>
        <div className={style.text}>
          Managing finances can be a time-consuming and complicated task, but
          with My Fin, you can simplify the process and stay on top of your
          money. The app is designed to help you track your income and expenses,
          and identify areas where you can save money or make smarter financial
          decisions.
        </div>
        <div className={style.text}>
          With My Fin, you can view your financial data in a way that makes
          sense to you. The app provides you with a range of customizable
          charts, graphs, and tables that allow you to quickly analyze your
          financial information and identify trends and patterns.
        </div>
        <div className={style.text}>
          Whether you are a student, a business owner, or anyone looking to
          better manage their finances, My Fin is the perfect solution. The app
          is easy to use, secure, and accessible from anywhere, so you can keep
          track of your finances on the go.
        </div>
        <div className={style.text}>
          Take control of your finances today with My Fin!
        </div>
      </div>
    </div>
  );
}

export default About;
