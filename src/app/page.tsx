"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Header from "@/components/header/header";
import Navigation from "@/components/navigation/navigation";
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
    // You can add special handling for sign up success if needed
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header></Header>

        {/* Conditional rendering based on state */}
        {showSignIn ? (
          <AuthSignInForm
            onSuccess={handleSignInSuccess}
            redirectTo="/home" // This is a backup if onSuccess doesn't handle the redirect
            onToggleToSignUp={toggleForm}
          />
        ) : (
          <AuthSignUpForm
            onSuccess={handleSignUpSuccess}
            onToggleToSignIn={toggleForm}
          />
        )}

        <Footer></Footer>
      </main>
    </div>
  );
}
