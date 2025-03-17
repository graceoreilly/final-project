"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./navigation.module.css";
import LogoutButton from "../auth/LogOutButton";
import Image from "next/image";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // Close menu when navigation link is clicked
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={styles.navigation}>
      <div>
        <Link href="/home">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={80}
            height={80}
            className={styles.logo}
          />
        </Link>
      </div>

      <div
        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        className={`${styles.navItemsContainer} ${isMenuOpen ? styles.active : ""}`}
      >
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              href="/home"
              className={styles.navLink}
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/about"
              className={styles.navLink}
              onClick={handleLinkClick}
            >
              About Me
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/timeline"
              className={styles.navLink}
              onClick={handleLinkClick}
            >
              Timeline
            </Link>
          </li>
          {/* <li className={styles.navItem}>
            <Link href="/tree" className={styles.navLink} onClick={handleLinkClick}>
              Family Tree
            </Link>
          </li> */}
          <li className={styles.navItem}>
            <Link
              href="/calendar"
              className={styles.navLink}
              onClick={handleLinkClick}
            >
              Calendar
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              href="/assistant"
              className={styles.navLink}
              onClick={handleLinkClick}
            >
              Assistant
            </Link>
          </li>
          <li className={`${styles.navItem} ${styles.navItemRight}`}>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}
