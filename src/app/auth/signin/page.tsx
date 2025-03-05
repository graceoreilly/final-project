"use client";

import AuthSignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Sign in to your account</h1>
        <p className="mt-2 text-gray-600">Welcome back</p>
      </div>

      <AuthSignInForm redirectTo="/dashboard" />
    </div>
  );
}
