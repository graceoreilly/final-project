"use client"

import AuthSignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
    return (
    <div className="signin-container">
      <div className="signin-header">
        <h1>Sign in to your account</h1>
        <p>
          Welcome back
        </p>
      </div>
      
      {/* <AuthSignInForm redirectTo="/dashboard" /> */}
      <AuthSignInForm redirectTo="/home" />
    </div>
    )
}