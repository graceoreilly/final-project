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
import SignUpPage from "./auth/signup/page"


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header></Header>
        <Navigation></Navigation>

        {/** if user clicks signIn, go to <SignInpage , else fo to Sign UP Page */}
        < SignUpPage />

        {/* <div className={styles.content}>
          <h2>Welcome to MyMemories</h2>
          <p>Store and share your precious memories with your loved ones.</p>
        </div> */}
        <Footer></Footer>
      </main>
    </div>
  );
}
