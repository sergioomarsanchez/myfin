import Head from "next/head";
import styles from "../styles/Home.module.css";
import HomePage from "../components/HomePage";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Fin app</title>
        <meta name="description" content="Best finances app of Argentina" />
        <link rel="icon" href="/img/LogoDark.png" />
      </Head>
      <HomePage />
    </div>
  );
}
