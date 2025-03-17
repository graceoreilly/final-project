import styles from "./page.module.css";
import Footer from "@/components/footer/footer";
import Navigation from "@/components/navigation/navigation";
import MemoriesContainer from "@/components/memoriesContainer/memoriesContainer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className={styles.main}>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Welcome to <span className={styles.memories}>MyMemories</span>
          </h2>
          <p className={styles.paragraphHeading}>
            Store and share your precious memories.
          </p>
        </div>
        <MemoriesContainer />
      </main>
      <Footer />
    </>
  );
}
