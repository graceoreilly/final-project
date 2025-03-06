import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function GoogleSignIn() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/home",
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Google Sign In Error:", error);
      alert("Error signing in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleGoogleSignIn} disabled={loading}>
      {loading ? "Signing In..." : "Sign In with Google"}
    </button>
  );
}
