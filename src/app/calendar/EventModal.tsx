"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Event } from "./CalendarComponent";
import styles from "./Calendar.module.css";

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete?: (id: string) => void;
  selectedDate: Date | null;
  event: Event | null;
};

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  selectedDate,
  event,
}: EventModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  // Initialize form with event data if editing
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || "");
      setDate(event.date);
    } else if (selectedDate) {
      setDate(selectedDate);
      setTitle("");
      setDescription("");
    }
  }, [event, selectedDate]);

  // Format date for input
  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (event) {
      onSave({
        ...event,
        title,
        description,
        date,
      });
    } else {
      onSave({
        id: Date.now().toString(),
        title,
        description,
        date,
      });
    }
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>{event ? "Edit Event" : "Add Event"}</h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={formatDateForInput(date)}
              onChange={(e) => setDate(new Date(e.target.value))}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Event description"
              rows={4}
            />
          </div>

          <div className={styles.modalActions}>
            {event && onDelete && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button type="submit" className={styles.saveButton}>
              {event ? "Update" : "Add"} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
