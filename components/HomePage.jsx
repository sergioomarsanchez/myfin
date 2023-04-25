import React from "react";
import style from "../styles/HomePage.module.css";
import Image from "next/image";
import CustomersCards from "./CustomersCards";
import statements from "../data/Statements";
import { useState, useEffect } from "react";

function HomePage() {
  const [index, setIndex] = useState(0);

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };
  useEffect(() => {
    const interval = setInterval(function test() {
      handleArrow("r");
      return test;
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.mContainer}>M</div>
        <div className={style.lineContainer}></div>
        <div className={style.fContainer}>F</div>
      </div>
      <div className={style.center}>
        <Image
          src="/img/HomeImg.jpg"
          alt=""
          width={375}
          height={525}
          placeholder
          className={style.image}
        />
      </div>
      <div className={style.right}>
        <h3>Take control of your finances, take control of your future</h3>
        <h4>Like they did:</h4>
        <div
          className={style.statements}
          style={{ transform: `translateY(${-1 * index}VH)` }}
        >
          {statements?.map((e, i) => (
            <CustomersCards key={i} i={i} index={index} statement={e} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
