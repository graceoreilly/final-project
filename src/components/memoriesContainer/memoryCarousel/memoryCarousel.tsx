"use client";

import React, { useState, useEffect } from "react";
import styles from "./memoryCarousel.module.css";
import initialMemories from "@/data";
import Image from "next/image";

// Define the Memory interface
interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  mediaType: string;
  mediaUrl: string;
}

const MemoryCarousel: React.FC = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Filter only image memories
    const imageMemories = initialMemories.filter(
      (memory) => memory.mediaType === "image",
    );
    setMemories(imageMemories);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + memories.length) % memories.length,
    );
  };

  const openModal = (memory: Memory) => {
    setSelectedMemory(memory);
    setIsModalOpen(true);
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMemory(null);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = "auto";
  };

  if (memories.length === 0) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>Memory Snapshots</h2>
      <div className={styles.carouselContainer}>
        <button
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={prevSlide}
        >
          &#10094;
        </button>

        <div className={styles.carouselTrack}>
          {memories.map((memory, index) => {
            // Calculate position: -1 for left, 0 for center, 1 for right
            const position = index - currentIndex;
            // Handle wrapping for visual effect
            const wrappedPosition =
              position < -1
                ? position + memories.length
                : position > 1
                  ? position - memories.length
                  : position;

            return (
              <div
                key={memory.id}
                className={`${styles.carouselSlide} ${wrappedPosition === 0 ? styles.active : ""}`}
                style={{
                  transform: `translateX(${wrappedPosition * 100}%) scale(${wrappedPosition === 0 ? 1 : 0.8})`,
                  zIndex: wrappedPosition === 0 ? 2 : 1,
                  opacity: Math.abs(wrappedPosition) > 1 ? 0 : 1,
                }}
                onClick={() => openModal(memory)}
              >
                <Image
                  src={memory.mediaUrl}
                  alt={memory.title}
                  className={styles.memoryImage}
                  width={300}
                  height={320}
                />
              </div>
            );
          })}
        </div>

        <button
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={nextSlide}
        >
          &#10095;
        </button>
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedMemory && (
        <div className={styles.modal} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <Image
              src={selectedMemory.mediaUrl}
              alt={selectedMemory.title}
              className={styles.expandedImage}
              width={1000}
              height={1200}
            />
            <div className={styles.memoryInfo}>
              <p className={styles.memoryDate}>{selectedMemory.date}</p>
              <h3>{selectedMemory.title}</h3>
              <p>{selectedMemory.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryCarousel;
