import React from "react";
import style from "../styles/Footer.module.css";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <div className={style.container}>
      <div className={style.socialMediaContainer}>
        <div className={style.icons}>
          <a href="https://www.youtube.com/channel/UChIMb1J6ILBRcq-b6PQ7SIQ">
            <Image
              src="/img/socialMediaIcons/icons8-youtube-94.png"
              alt=""
              height={50}
              width={50}
              className={style.iconImg}
            />
          </a>
          <a href="https://www.linkedin.com/in/sergio-omar-sanchez-6ba362104">
            <Image
              src="/img/socialMediaIcons/icons8-linkedin-94.png"
              alt=""
              height={50}
              width={50}
              className={style.iconImg}
            />
          </a>
          <a href="https://www.instagram.com/sergio_omar_sanchez/">
            <Image
              src="/img/socialMediaIcons/icons8-instagram-94.png"
              alt=""
              height={50}
              width={50}
              className={style.iconImg}
            />
          </a>
          <a href="https://github.com/sergioomarsanchez">
            <Image
              src="/img/socialMediaIcons/icons8-github-94.png"
              alt=""
              height={50}
              width={50}
              className={style.iconImg}
            />
          </a>
          <a href="mailto:sanchez.omar.sergio@gmail.com">
            <Image
              src="/img/socialMediaIcons/icons8-gmail-logo-94.png"
              alt=""
              height={50}
              width={50}
              className={style.iconImg}
            />
          </a>
        </div>
        <div className={style.iconsSrc}>
          Icons from{" "}
          <a className={style.iconsLink} href="https://icons8.com/">
            icons8.com
          </a>
        </div>
      </div>
      <div className={style.left}>
        <h4>
          The best app to manage your finances, savings, investment and budgets
        </h4>
      </div>
      <div className={style.right}>
        <ul className={style.list}>
          <Link href="/about" passHref>
            <li className={style.item}>About</li>
          </Link>
          <Link href="/contact" passHref>
            <li className={style.item}>Contact</li>
          </Link>
          <Link href="/career" passHref>
            <li className={style.item}>Career</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
