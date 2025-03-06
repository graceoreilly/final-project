"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
//  import Link from "next/link"; //allows navigation between pages for login
import { GoogleSignIn } from "../../components/auth/GoogleSignIn";
import styles from "./SignUpForm.module.css";

// create TS interface obj for what the object function expects to take in
interface AuthSignUpFormProps {
  //onSucess will be called if sign-up is successful
  onSuccess?: () => void;
  // required prop for toggling between forms
  onToggleToSignIn?: () => void;
}

//receives an optional onSuccess and onToggleToSignIn function as a prop
export default function AuthSignUpForm({
  onSuccess,
  onToggleToSignIn,
}: AuthSignUpFormProps) {
  // init variables for state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  //extra loggingin info for debugging
  // const [debugInfo, setDebugInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setDebugInfo('Form submitted, starting validation...');

    // form validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");
    // setDebugInfo('Validation passed, calling Supabase auth.signUp...');

    try {
      //calls supabase.auth.signUp() with email and password
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        //Sends a verfication email with a redirect link
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (!data) {
        console.log("No data provided");
      }

      if (signUpError) {
        throw signUpError;
      }

      setMessage(`Almost there! We've sent a confirmation link to ${email}. 
            Please check your inbox and click the link to complete your registration. 
            If you don't see it, check your spam folder.`);

      // Clear the form fields for better UX
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      //if onSuccess is passed as a prop, it calls it
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Signup error:", error);
        // setDebugInfo(`Error during signup: ${error.message}`);
        setError(error.message || "An error occurred during sign up");
      } else {
        console.error("Signup error:", error);
        // setDebugInfo('An unknown error occurred during signup');
        setError("An unknown error occurred during sign up");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create an account</h2>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          {message && (
            <div className={styles.successMessage}>
              <h3 className={styles.successTitle}>
                Email Verification Required
              </h3>
              <p className={styles.successText}>{message}</p>
            </div>
          )}

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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <div>
              <button type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Sign up"}
              </button>
            </div>
          </form> */}

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={styles.input}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              className={styles.submitButton}
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </div>
        </form>

        <div className={styles.signInPrompt}>
          <p>
            Already have an account?{" "}
            <button
              onClick={onToggleToSignIn}
              type="button"
              className={styles.signInButton}
            >
              Sign in
            </button>
          </p>
        </div>
        <div>
          <div>OR</div>
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
}
