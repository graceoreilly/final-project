// import styles from "./page.module.css";
// import Header from "@/components/header/header";
// import Footer from "@/components/footer/footer";
// import Navigation from "@/components/navigation/navigation";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Header></Header>
//         <Navigation></Navigation>
//         <Footer></Footer>
//       </main>
//     </div>
//   );
// }

import styles from "./page.module.css"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import Navigation from "@/components/navigation/navigation"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header></Header>
        <Navigation></Navigation>
        <div className={styles.content}>
          {/* Your page content goes here */}
          <h2>Welcome to MyMemories</h2>
          <p>Store and share your precious memories with your loved ones.</p>
        </div>
        <Footer></Footer>
      </main>
    </div>
  )
}

