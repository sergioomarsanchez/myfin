import React from "react";
import style from "../styles/CustomersCards.module.css";

function CustomersCards({ statement, i, index }) {
  return (
    <div
      className={style.container}
      style={{ display: i !== index ? "none" : "flex" }}
    >
      <div className={style.image}>
        <img src={statement.image} alt="" className={style.profile} />
      </div>
      <div className={style.name}>{statement.name}</div>
      <div className={style.statement}>
        <p>{statement.statement}</p>
      </div>
    </div>
  );
}

export default CustomersCards;
