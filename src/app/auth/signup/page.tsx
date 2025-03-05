"use client";

import AuthSignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create an account</h1>
          <p>Join us to get started:</p>
        </div>
        {/* use AuthSignUpForm component */}
        <AuthSignUpForm
          onSuccess={() => {
            // Optional: Handle successful signup, such as showing a message or redirecting
            console.log("Signup successful");
          }}
        />
      </div>
    </div>
  );
}
