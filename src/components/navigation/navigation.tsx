import Link from "next/link";
import styles from "./navigation.module.css";
import LogoutButton from "../auth/LogOutButton";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      <div>
        <Image
          src="/logo.jpg"
          alt="logo"
          width={80}
          height={80}
          className={styles.logo}
        />
      </div>
      <ul className={styles.navList}>
        <div className={styles.navItemsContainer}>
          <li className={styles.navItem}>
            <Link href="/home" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/about" className={styles.navLink}>
              About Me
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/timeline" className={styles.navLink}>
              Timeline
            </Link>
          </li>
          {/* <li className={styles.navItem}>
            <Link href="/tree" className={styles.navLink}>
              Family Tree
            </Link>
          </li> */}
          <li className={styles.navItem}>
            <Link href="/calendar" className={styles.navLink}>
              Calendar
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/assistant" className={styles.navLink}>
              Assistant
            </Link>
          </li>
        </div>
        <li className={`${styles.navItem} ${styles.navItemRight}`}>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}
