"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Integrate with password reset API
    console.log("Password reset for:", email);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-teal-700 flex items-center justify-center">
              <span className="text-white font-bold">NC</span>
            </div>
            <span className="text-xl font-bold text-slate-900">NCTP</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your email address and we&apos;ll send you a link to reset your
            password.
          </p>
        </div>

        <div className="card">
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Check your email
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium">{email}</span>. Please check your
                inbox and follow the instructions.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-block text-sm font-semibold text-teal-700 hover:text-teal-800"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input-field"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
