"use client";

import AuthSignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
    return (
        <div className="">
            <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="mt-2 text-gray-600">
          Join us to get started:
          
        </p>
      </div>
      {/* use AuthSignUpForm component */}
      <AuthSignUpForm onSuccess={() => {
        // Optional: Handle successful signup, such as showing a message or redirecting
        console.log('Signup successful');
      }} />
    </div>
        </div>
    )
}