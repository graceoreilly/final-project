import styles from "./Calendar.module.css";

export default function CalendarHeader() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={styles.weekdaysHeader}>
      {weekdays.map((day) => (
        <div key={day} className={styles.weekday}>
          {day}
        </div>
      ))}
    </div>
  );
}
