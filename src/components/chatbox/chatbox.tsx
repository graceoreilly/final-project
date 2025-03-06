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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if user input is empty even after applying trim for whitespace
    if (inputValue.trim() === "") return;

    // add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
    };

    if (!newUserMessage) {
      console.log("Check newUserMessage");
    }

    // Simulate response (in a real app, this would be an API call)
    setTimeout(() => {
      const newResponseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! This is a simulated response.",
        isUser: false,
      };
      setMessages((prev) => [...prev, newResponseMessage]);
    }, 1000);
  };
  return (
    <div className={styles.chatbox}>
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageRow} ${message.isUser ? styles.userMessageRow : styles.botMessageRow}`}
          >
            <div
              className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage}`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className={styles.input}
          />
          <button type="submit" className={styles.sendButton}>
            <Send className={styles.sendIcon} />
            <span className={styles.srOnly}>Send message</span>
          </button>
        </form>
      </div>
    </div>
  );
}
