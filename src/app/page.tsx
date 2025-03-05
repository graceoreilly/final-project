import styles from "./page.module.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Navigation from "@/components/navigation/navigation";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header></Header>
        <Navigation></Navigation>
        <Footer></Footer>
      </main>
    </div>
  );
}
