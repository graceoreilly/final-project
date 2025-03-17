"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Filter only image memories
    const imageMemories = initialMemories.filter(
      (memory) => memory.mediaType === "image",
    );
    setMemories(imageMemories);

    // Check initial device size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial state
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length);
  }, [memories.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + memories.length) % memories.length,
    );
  }, [memories.length]);

  // Modal functions
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide, isModalOpen]);

  // Touch events for swiping
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent;
      touchStartX = touchEvent.touches[0].clientX;
    };

    const handleTouchMove = (e: Event) => {
      const touchEvent = e as TouchEvent;
      touchEndX = touchEvent.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const touchThreshold = 50;
      const touchDiff = touchEndX - touchStartX;

      if (touchDiff > touchThreshold) {
        prevSlide();
      } else if (touchDiff < -touchThreshold) {
        nextSlide();
      }
    };

    const carouselElement = document.querySelector(
      `.${styles.carouselContainer}`,
    );
    if (carouselElement) {
      carouselElement.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      carouselElement.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      carouselElement.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("touchstart", handleTouchStart);
        carouselElement.removeEventListener("touchmove", handleTouchMove);
        carouselElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [nextSlide, prevSlide]);

  if (memories.length === 0) return <p>Loading...</p>;

  // Calculate slide positioning
  const getSlidePositionStyles = (index: number) => {
    // Calculate position: -1 for left, 0 for center, 1 for right
    const position = index - currentIndex;

    // Handle wrapping for visual effect
    const wrappedPosition =
      position < -1
        ? position + memories.length
        : position > 1
          ? position - memories.length
          : position;

    // Scale based on position and screen size
    const scale = wrappedPosition === 0 ? 1 : 0.8;
    let translateX = wrappedPosition * 100;
    let opacity = Math.abs(wrappedPosition) > 1 ? 0 : 1;

    // Adjust for mobile devices
    if (isMobile) {
      // Bring slides closer together on mobile
      translateX = wrappedPosition * 80;
      // Make non-active slides more transparent on mobile
      opacity = wrappedPosition === 0 ? 1 : 0.7;
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex: wrappedPosition === 0 ? 2 : 1,
      opacity,
    };
  };

  return (
    <div className={styles.container}>
      <h2>Memory Snapshots</h2>
      <div className={styles.carouselContainer}>
        <button
          className={`${styles.carouselButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous memory"
        >
          &#10094;
        </button>

        <div className={styles.carouselTrack}>
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className={`${styles.carouselSlide} ${
                index === currentIndex ? styles.active : ""
              }`}
              style={getSlidePositionStyles(index)}
              onClick={() => openModal(memory)}
              role="button"
              tabIndex={0}
              aria-label={`Memory: ${memory.title}`}
            >
              <Image
                src={memory.mediaUrl}
                alt={memory.title}
                className={styles.memoryImage}
                width={300}
                height={320}
                priority={index === currentIndex}
                loading={index === currentIndex ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        <button
          className={`${styles.carouselButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next memory"
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
            <button
              className={styles.closeButton}
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <Image
              src={selectedMemory.mediaUrl}
              alt={selectedMemory.title}
              className={styles.expandedImage}
              width={1000}
              height={1200}
              priority={true}
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
