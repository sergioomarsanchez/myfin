import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import style from "../styles/MobileMenu.module.css";
import { useRouter } from "next/router";

function MobileMenu({
  user,
  id,
  setMobileIsOpen,
  mobileIsOpen,
  handleClick,
  setIsOpen,
  setIsOpenLogin,
}) {
  const router = useRouter();

  const [initial, setInitial] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setInitial(true);
    }
  }, [mobileIsOpen]);

  return (
    <div
      className={
        initial
          ? mobileIsOpen
            ? style.container
            : style.containerOut
          : style.initial
      }
    >
      <h5 className={style.title}>Menu</h5>
      <div className={style.linksContainer}>
        <Link href="/" passHref>
          <div onClick={() => setMobileIsOpen(false)} className={style.link}>
            Home
          </div>
        </Link>
        <Link href="/about" passHref>
          <div onClick={() => setMobileIsOpen(false)} className={style.link}>
            About
          </div>
        </Link>
        <Link href="/contact" passHref>
          <div onClick={() => setMobileIsOpen(false)} className={style.link}>
            Contact
          </div>
        </Link>
        <Link href="/news" passHref>
          <div onClick={() => setMobileIsOpen(false)} className={style.link}>
            News
          </div>
        </Link>
        <Link href="/career" passHref>
          <div onClick={() => setMobileIsOpen(false)} className={style.link}>
            Career
          </div>
        </Link>
      </div>
      <div
        onClick={() => setMobileIsOpen(false)}
        className={style.signupContainer}
      >
        {user && router.pathname !== "/profile/[id]" ? (
          <Link href={"/profile/" + id} passHref>
            <button className={style.signupButton}>Go to Profile</button>{" "}
          </Link>
        ) : null}
        {user ? (
          <button onClick={handleClick} className={style.logoutButton}>
            Log out
          </button>
        ) : null}
        {!user && (
          <button
            onClick={() => setIsOpen(true)}
            className={style.signupButton}
          >
            Sign Up
          </button>
        )}
        {!user && (
          <button
            onClick={() => setIsOpenLogin(true)}
            className={style.loginButton}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
