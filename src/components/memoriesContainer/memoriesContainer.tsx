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

  // Placeholder data for reminder
  const reminder = "Today is Elena's Birthday!";

  return (
    <div className={styles.container}>
      <div className={styles.reminder}>
        <div className={styles.reminderContent}>
          <h3>Reminder</h3>
          <p>{reminder}</p>
        </div>
        <div className={styles.reminderDate}>
          <p>{day}</p>
          <p>{date}</p>
        </div>
      </div>
      <div className={styles.memory}>
        <RandomMemory />
      </div>
    </div>
  );
}
