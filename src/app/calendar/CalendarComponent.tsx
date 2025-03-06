"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import EventModal from "./EventModal";
import styles from "./Calendar.module.css";

export type Event = {
  id: string;
  title: string;
  date: Date;
  description?: string;
  memoryId?: string; // For future database integration
};

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  // Open modal to add a new event
  const openAddEventModal = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  // Open modal to edit an existing event
  const openEditEventModal = (event: Event) => {
    setSelectedEvent(event);
    setSelectedDate(event.date);
    setIsModalOpen(true);
  };

  // Add a new event
  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substring(2, 9), // Simple ID generation
    };
    setEvents([...events, newEvent]);
    setIsModalOpen(false);
  };

  // Update an existing event
  const updateEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
    setIsModalOpen(false);
  };

  // Delete an event
  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    setIsModalOpen(false);
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <h1>Calendar</h1>
        <div className={styles.calendarControls}>
          <button
            onClick={prevMonth}
            className={styles.navButton}
            aria-label="Previous month"
          >
            <ChevronLeft />
          </button>
          <h2>
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className={styles.navButton}
            aria-label="Next month"
          >
            <ChevronRight />
          </button>
        </div>
        <button
          className={styles.addButton}
          onClick={() => openAddEventModal(new Date())}
          aria-label="Add event"
        >
          <Plus size={20} />
          <span>Add Event</span>
        </button>
      </div>

      <CalendarHeader />

      <CalendarDays
        currentDate={currentDate}
        events={events}
        onAddEvent={openAddEventModal}
        onEditEvent={openEditEventModal}
      />

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={selectedEvent ? updateEvent : addEvent}
          onDelete={selectedEvent ? deleteEvent : undefined}
          selectedDate={selectedDate}
          event={selectedEvent}
        />
      )}
    </div>
  );
}
