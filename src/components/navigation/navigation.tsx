import Link from "next/link";
import styles from "./navigation.module.css";

export default function Navigation() {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/timeline">Timeline</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/calendar">Calendar</Link>
        </li>
        <li>
          <Link href="/tree">Tree</Link>
        </li>
        <li>
          <Link href="/assistant">Assistant</Link>
        </li>
      </ul>
    </nav>
  );
}
