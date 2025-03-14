"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

import Footer from "@/components/footer/footer";
import AuthSignUpForm from "@/components/auth/SignUpForm";
import AuthSignInForm from "@/components/auth/SignInForm";

export default function Home() {
  // State to track which form to display
  const [showSignIn, setShowSignIn] = useState(false);
  const router = useRouter();

  // Toggle function to switch between forms
  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  // Handle successful sign in by redirecting to dashboard
  const handleSignInSuccess = () => {
    console.log("Sign in successful, redirecting to dashboard");
    // Redirect to the dashboard page
    router.push("/home");
  };

  // Handle successful sign up
  const handleSignUpSuccess = () => {
    console.log("Sign up successful");
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* Conditional rendering based on state */}
        {showSignIn ? (
          <AuthSignInForm
            onSuccess={handleSignInSuccess}
            redirectTo="/home"
            onToggleToSignUp={toggleForm}
          />
        ) : (
          <AuthSignUpForm
            onSuccess={handleSignUpSuccess}
            onToggleToSignIn={toggleForm}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
