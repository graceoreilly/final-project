// Document Ingestion Tool (Optional)

"use client";

import { useState } from "react";
import styles from "./upload.module.css"; // Create this file separately

export default function DocumentUploader() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setStatus("error");
      setMessage("Please enter some text to upload");
      return;
    }

    setStatus("loading");
    setMessage("Uploading document...");

    try {
      const response = await fetch("/api/rag", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          metadata: {
            title: title || "Untitled Document",
            timestamp: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to upload document");
      }

      setStatus("success");
      setMessage("Document uploaded successfully!");
      setText("");
      setTitle("");
    } catch (error) {
      console.error("Error uploading document:", error);
      setStatus("error");
      setMessage("Failed to upload document. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Document to Knowledge Base</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title" className={styles.label}>
            Document Title (optional)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            placeholder="Enter document title"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="content" className={styles.label}>
            Document Content
          </label>
          <textarea
            id="content"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={styles.textarea}
            placeholder="Paste or type document content here"
            rows={10}
          />
        </div>

        <button
          type="submit"
          className={styles.button}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Uploading..." : "Upload Document"}
        </button>

        {message && (
          <div
            className={`${styles.message} ${
              status === "success" ? styles.success : styles.error
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
