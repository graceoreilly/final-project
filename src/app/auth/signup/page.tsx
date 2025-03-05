"use client";

import AuthSignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
<<<<<<< HEAD
    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-header">
                    <h1>Create an account</h1>
                    <p>
                        Join us to get started:
                    </p>
                </div>
                {/* use AuthSignUpForm component */}
                <AuthSignUpForm onSuccess={() => {
                    // Optional: Handle successful signup, such as showing a message or redirecting
                    console.log('Signup successful');
                }} />
            </div>
=======
  return (
    <div className="">
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-gray-600">Join us to get started:</p>
>>>>>>> main
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
