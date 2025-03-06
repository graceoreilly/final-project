/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { getAllMemories, postMemory } from "@/db/memoryQueries";

import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Navigation from "../../components/navigation/navigation";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import styles from "./page.module.css";

interface Memory {
  date: string;
  title: string;
  description: string;
  image_metadata: string | null;
}

export default function TimelinePage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [date, setDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const imagePicker = useRef<HTMLInputElement | null>(null);

  async function fetchMemories() {
    const fetchedMemories = await getAllMemories();

    setMemories(fetchedMemories);
  }

  useEffect(() => {
    fetchMemories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleAddMemory() {
    if (date && title && description) {
      await postMemory({ date, title, description, image });

      setDate("");
      setTitle("");
      setDescription("");
      setImage(null);

      if (imagePicker.current) {
        imagePicker.current.value = "";
      }

      await fetchMemories();
    }
  }

  return (
    <>
      <Header />
      <Navigation />
      <h1>Timeline</h1>
      <div className={styles.container}>
        {/* Memory Form */}
        <div className={styles.memoryForm}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            className={styles.input}
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className={styles.input}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className={styles.textarea}
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.input}
            ref={imagePicker}
          />
          <button onClick={handleAddMemory} className={styles.button}>
            Add Memory
          </button>
        </div>

        {/* Timeline */}
        <div className={styles.timelineContainer}>
          {memories.length === 0 ? (
            <p className={styles.placeholder}>No memories yet. Add some!</p>
          ) : (
            <Timeline position="alternate-reverse">
              {memories.map((memory, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index !== memories.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <strong>{memory.title}</strong>
                    <p>{memory.date}</p>
                    <p>{memory.description}</p>
                    {memory.image_metadata && (
                      <img
                        src={memory.image_metadata}
                        alt="Memory"
                        className={styles.memoryImage}
                        onClick={() => setEnlargedImage(memory.image_metadata)}
                      />
                    )}
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          )}
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div
          className={styles.modalOverlay}
          onClick={() => setEnlargedImage(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent click on image from closing the modal
          >
            <img
              src={enlargedImage}
              alt="Enlarged Memory"
              className={styles.modalImage}
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
