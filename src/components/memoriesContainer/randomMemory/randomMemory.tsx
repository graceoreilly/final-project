/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import styles from "./randomMemory.module.css"; // Using CSS Modules
import initialMemories from "@/data";

// Define the Memory interface
interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  mediaType: string;
  //"image" | "video" | "audio";
  mediaUrl: string;
}

const RandomMemory: React.FC = () => {
  const [randomMemory, setRandomMemory] = useState<Memory | null>(null);

  useEffect(() => {
    if (initialMemories.length > 0) {
      const random =
        initialMemories[Math.floor(Math.random() * initialMemories.length)];
      setRandomMemory(random);
    }
  }, []);

  if (!randomMemory) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>Random Memory</h2>
      <div className={styles.memoryCard}>
        {randomMemory.mediaType === "image" && (
          <img
            className={styles.memoryImage}
            src={randomMemory.mediaUrl}
            alt={randomMemory.title}
          />
        )}
        <div className={styles.memoryContent}>
          <p>{randomMemory.date}</p>
          <h3>{randomMemory.title}</h3>
          <p className={styles.description}>{randomMemory.description}</p>
        </div>
      </div>
    </div>
  );
};

export default RandomMemory;
