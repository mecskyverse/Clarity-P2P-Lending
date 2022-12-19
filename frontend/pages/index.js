import Head from "next/head";
import ConnectWallet from "../components/ConnectWallet";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>gm</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>gm</h1>

        <div className={styles.components}>
          {/* ConnectWallet file: `../components/ConnectWallet.js` */}
          <ConnectWallet />
        </div>
      </main>
    </div>
  );
}