"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import styles from "./SignInForm.module.css";
import { GoogleSignIn } from "./GoogleSignIn";

interface AuthSignInFormProps {
  //function that runs after successful sign-in
  onSuccess?: () => void;
  //A URL string for where to redirect users
  redirectTo?: string;
  // Add this optional prop for toggling between forms
  onToggleToSignUp?: () => void;
}

//Sign in component
export default function AuthSignInForm({
  onSuccess,
  redirectTo,
  onToggleToSignUp,
}: AuthSignInFormProps) {
  // declare variables for state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //initialises Next.js's router, allows user to be redirected after login
  const router = useRouter();

  // sign in event handler function - runs when user submits the form
  const handleSubmit = async (e: React.FormEvent) => {
    //prevents the page from refreshing on form submission
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      //Calls supbase's signInWithPassword method to log in user
      //data contains user info if login is sucessful
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (!data) {
        console.log("No data provided");
      }
      if (signInError) throw signInError;

      //if sucessful calls onSuccess function and redirects the user
      if (onSuccess) {
        onSuccess();
      }

      if (redirectTo) {
        router.push(redirectTo);
      }

      //catches any errrors from supabase
    } catch (error) {
      //Error class - build in error object
      //checking if error is an instance of Error class is a type guard
      if (error instanceof Error) {
        setError(error.message || "Invalid login credentials");
        console.error("Error signing in:", error);
      } else {
        setError("Invalid login credentials");
        console.error("Error signing in:", error);
      }
      //resets the loading state, finally will always run, even if there is not an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Sign in to your account</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email address
          </label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.rememberForgotRow}>
          <div className={styles.rememberMe}>
            {/* Checkbox to remember login details */}
            <input
              className={styles.checkboxInput}
              id="remember-me"
              name="remember-me"
              type="checkbox"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <div>
            <Link
              className={styles.forgotPassword}
              href="/auth/forgot-password"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div>
          <button
            className={styles.submitButton}
            type="submit"
            // Prevents multiple clicks
            disabled={loading}
          >
            {/* If loading is true, the button text changes to Signing in... */}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      <div className={styles.signUpPrompt}>
        <p>
          Don&apos;t have an account?{" "}
          <button
            onClick={onToggleToSignUp}
            type="button"
            className={styles.signUpButton}
          >
            Sign up
          </button>
        </p>
      </div>
  <div>
  <GoogleSignIn 
  buttonText="Sign in with Google" 
  loadingText="Signing in..." 
/>
        </div>
    </div>
  );
}
