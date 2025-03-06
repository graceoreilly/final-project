"use client";
import type { Event } from "./CalendarComponent";
import styles from "./Calendar.module.css";

type CalendarDaysProps = {
  currentDate: Date;
  events: Event[];
  onAddEvent: (date: Date) => void;
  onEditEvent: (event: Event) => void;
};

export default function CalendarDays({
  currentDate,
  events,
  onAddEvent,
  onEditEvent,
}: CalendarDaysProps) {
  // Get all days in the current month view (including days from prev/next months)
  const getDaysInMonthView = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0-6, where 0 is Sunday)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Calculate days from previous month to show
    const daysFromPrevMonth = firstDayOfWeek;

    // Calculate total days to show (42 for a 6-row calendar)
    const totalDays = 42;

    const days = [];

    // Add days from previous month
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();

    for (
      let i = prevMonthDays - daysFromPrevMonth + 1;
      i <= prevMonthDays;
      i++
    ) {
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
      });
    }

    // Add days from current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Add days from next month
    const remainingDays = totalDays - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear(),
    );
  };

  // Format date to YYYY-MM-DD for comparison
  const formatDateForComparison = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return formatDateForComparison(date) === formatDateForComparison(today);
  };

  const days = getDaysInMonthView(currentDate);

  return (
    <div className={styles.calendarGrid}>
      {days.map((day, index) => {
        const dayEvents = getEventsForDay(day.date);
        const dayIsToday = isToday(day.date);

        return (
          <div
            key={index}
            className={`${styles.calendarDay} ${!day.isCurrentMonth ? styles.otherMonth : ""} ${dayIsToday ? styles.today : ""}`}
            onClick={() => onAddEvent(new Date(day.date))}
          >
            <div className={styles.dayNumber}>{day.date.getDate()}</div>
            <div className={styles.eventsList}>
              {dayEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className={styles.eventItem}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditEvent(event);
                  }}
                >
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className={styles.moreEvents}>
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
