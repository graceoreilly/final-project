import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./SignInForm.module.css";

interface GoogleSignInProps {
  buttonText?: string;
  loadingText?: string;
  className?: string;
}

export function GoogleSignIn({
  buttonText = "Sign up with Google",
  loadingText = "Signing in...",
  className = styles.submitButton,
}: GoogleSignInProps) {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    console.log("Starting Google Sign In process...");
    console.log("Redirect URL:", `${window.location.origin}/auth/callback`);

    try {
      console.log("Calling supabase.auth.signInWithOAuth...");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      console.log("OAuth response:", data);

      if (error) {
        console.error("OAuth error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      if (error instanceof Error) {
        alert(`Error signing in with Google: ${error.message}`);
      } else {
        alert(`Error signing in with Google: ${String(error)}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={className}
      onClick={handleGoogleSignIn}
      disabled={loading}
    >
      {loading ? loadingText : buttonText}
    </button>
  );
}
