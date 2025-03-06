"use client";

import type React from "react";
import { useState } from "react";
import styles from "./chatbox.module.css";
import { Send } from "lucide-react";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

export function Chatbox() {
  // set up state variables
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hello! How can I help you today?", isUser: false },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if user input is empty even after applying trim for whitespace
    if (inputValue.trim() === "") return;

    // add user message
    const userMessage = inputValue.trim();
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      isUser: true,
    };

    // Add the user message to the messages array
    setMessages((prev) => [...prev, newUserMessage]);

    // Clear the input field
    setInputValue("");

    // Set loading state
    setIsLoading(true);

    try {
      // Send the query to our RAG API
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Add the AI response to the messages array
      const newResponseMessage: Message = {
        id: Date.now().toString(),
        text:
          data.response ||
          "Sorry, I couldn't generate a response at this time.",
        isUser: false,
      };

      setMessages((prev) => [...prev, newResponseMessage]);
    } catch (error) {
      console.error("Error getting RAG response:", error);

      // Add an error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "I'm sorry, there was an error processing your request. Please try again.",
        isUser: false,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatbox}>
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageRow} ${
              message.isUser ? styles.userMessageRow : styles.botMessageRow
            }`}
          >
            <div
              className={`${styles.message} ${
                message.isUser ? styles.userMessage : styles.botMessage
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className={`${styles.messageRow} ${styles.botMessageRow}`}>
            <div className={`${styles.message} ${styles.botMessage}`}>
              <div className={styles.loadingDots}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className={styles.input}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={isLoading}
          >
            <Send className={styles.sendIcon} />
            <span className={styles.srOnly}>Send message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
