import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccounts, fetchTransactions } from "../../store/actions";
import axios from "axios";
import style from "../../styles/Profile.module.css";
import AccountCard from "../../components/AccountCard";
import AddAccountForm from "../../components/AddAccountForm";

function Profile({ user }) {
  const [token, setToken] = useState(false);
  const [id, setId] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const totalARS = useSelector((state) => state.totalARS);
  const totalUSD = useSelector((state) => state.totalUSD);
  const acc = useSelector((state) => state.allAccounts);
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const inToScroll = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    setToken(token);
    setId(id);
    if (!acc.length) dispatch(fetchAccounts(id));
  }, []);

  useEffect(() => {
    if (acc.length) {
      const promises = acc.map((account) =>
        dispatch(fetchTransactions(account._id))
      );
      Promise.all(promises).then(() => {
        if (!isInitialMount.current) {
          inToScroll.current.scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
      isInitialMount.current = false;
    }
  }, [acc]);

  return (
    <div className={style.container}>
      {id && token ? (
        <div className={style.wrapper}>
          <h2 className={style.title}>
            Welcome back{" "}
            <span className={style.titleName}>
              {user.firstName + " " + user.lastName}
            </span>
            , nice to see you again
          </h2>
          <h2 className={style.mobileTitle}>
            Welcome back
            <span className={style.titleName}>
              {user.firstName + " " + user.lastName}
            </span>
            Nice to see you again
          </h2>
          <div className={style.totalContainer}>
            <h4 className={style.totals}>
              Your total USD Balance is:{" "}
              <span
                style={{ color: totalUSD > 0 ? "#4ada84" : "white" }}
                className={style.totalAmount}
              >
                ${parseFloat(Number(totalUSD)).toFixed(2)}
              </span>
            </h4>
            <h4 className={style.totals}>
              Your total ARS Balance is:{" "}
              <span
                style={{ color: totalARS > 0 ? "#4ada84" : "white" }}
                className={style.totalAmount}
              >
                ${parseFloat(Number(totalARS)).toFixed(2)}
              </span>
            </h4>
          </div>
          {isOpen ? <AddAccountForm userId={id} setIsOpen={setIsOpen} /> : null}
          <div className={style.division}>
            <h3>Your accounts</h3>
            <div className={style.line} />{" "}
            <div className={style.addAccount} onClick={() => setIsOpen(true)}>
              + Add New Account
            </div>
          </div>
          <div className={style.accountsContainer}>
            {acc?.map((a, i) => {
              return <AccountCard key={a._id} acc={a} accounts={acc} />;
            })}
            <div ref={inToScroll}></div>
          </div>
        </div>
      ) : (
        <div className={style.warning}>
          Sorry you have no credentials, please, Log in again
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `https://myfin-sergioomarsanchez.vercel.app/api/users/${params.id}`
  );
  return {
    props: {
      user: res.data,
    },
  };
};

export default Profile;
