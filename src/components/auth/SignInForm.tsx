"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

interface AuthSignInFormProps {
  //function that runs after successful sign-in
  onSuccess?: () => void;
  //A URL string for where to redirect users
  redirectTo?: string;
}

//Sign in component
export default function AuthSignInForm({
  onSuccess,
  redirectTo,
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
    <div>
      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}

        <div>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <div>
            {/* Checkbox to remember login details */}
            <input id="remember-me" name="remember-me" type="checkbox" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <div>
            <Link href="/auth/forgot-password">Forgot your password?</Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            // Prevents multiple clicks
            disabled={loading}
          >
            {/* If loading is true, the button text changes to Signing in... */}
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>

      <div>
        <p>
          Don`&apos;`t have an account?{" "}
          {/* Navigate to the sign-up page if user does not have account */}
          <Link href="/auth/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
