"use client";

import { useEffect } from "react";

export default function DatabaseInitializer() {
  useEffect(() => {
    // Call the init endpoint when the app starts
    const initDatabase = async () => {
      try {
        console.log("Initializing database...");
        const response = await fetch("/api/init");
        const data = await response.json();
        console.log("Database initialization result:", data);
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initDatabase();
  }, []);

  // This component doesn't render anything
  return null;
}
