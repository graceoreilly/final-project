import styles from "../page.module.css";
import Footer from "@/components/footer/footer";
import Navigation from "@/components/navigation/navigation";
import MemoriesContainer from "@/components/memoriesContainer/memoriesContainer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Navigation></Navigation>
        <div className={styles.content}>
          <h2>Welcome to MyMemories</h2>
          <p>Store and share your precious memories.</p>
        </div>
        <main>
          <MemoriesContainer></MemoriesContainer>
        </main>
        <Footer></Footer>
      </main>
    </div>
  );
}
