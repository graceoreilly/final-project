/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./memoriesContainer.module.css";
import RandomMemory from "./randomMemory/randomMemory";

export default function MemoriesContainer() {
  const currentDate = new Date();
  const day = currentDate.toLocaleDateString("en-US", { weekday: "long" });
  const date = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Placeholder data for reminder and memory
  const reminder = "Today is Elena's Birthday!";
  // const memory = {
  //   image: "/legoland.jpg",
  //   description:
  //     "September 20, 2024 — A day of pure joy for my granddaughter, her husband, and their little ones, Marcelina and Filip. At Legoland, they marveled at towering brick creations, built their own masterpieces, and laughed their way through exciting rides. The children’s wonder and excitement made it a day to remember—a beautiful adventure for their young hearts.",
  // };

  return (
    <div className={styles.container}>
      <div className={styles.currentDay}>
        <h2>{day}</h2>
        <p>{date}</p>
      </div>
      <div className={styles.reminder}>
        <h3>Reminder</h3>
        <p>{reminder}</p>
      </div>
      <div className={styles.memory}>
        <RandomMemory></RandomMemory>
      </div>
    </div>
  );
}
