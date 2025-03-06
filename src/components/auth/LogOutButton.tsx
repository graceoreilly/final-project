"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import styles from "../navigation/navigation.module.css";

export default function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // Redirect to homepage after successful logout
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className={`${styles.navLink} ${styles.navButton} ${styles.signOutButton}`}
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
