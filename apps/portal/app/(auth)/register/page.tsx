"use client";

import Link from "next/link";
import { useState } from "react";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Angola", "Argentina", "Armenia",
  "Australia", "Austria", "Azerbaijan", "Bangladesh", "Belarus", "Belgium",
  "Benin", "Bolivia", "Botswana", "Brazil", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Canada", "Chad", "Chile", "China", "Colombia",
  "Congo", "Costa Rica", "Croatia", "Cuba", "Czech Republic", "Denmark",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Ethiopia",
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Guatemala", "Guinea", "Haiti", "Honduras", "Hungary", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Laos", "Lebanon",
  "Liberia", "Libya", "Madagascar", "Malawi", "Malaysia", "Mali", "Mexico",
  "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway",
  "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Romania", "Rwanda", "Saudi Arabia", "Senegal", "Serbia",
  "Sierra Leone", "Singapore", "Somalia", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Tanzania",
  "Thailand", "Togo", "Tunisia", "Turkey", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe",
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    organization: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    // TODO: Integrate with registration API
    console.log("Register attempt:", formData);
    setTimeout(() => setIsLoading(false), 1000);
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-700 to-teal-900 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold">NC</span>
            </div>
            <span className="text-xl font-bold text-white">DCACI</span>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the Platform
          </h2>
          <p className="text-teal-100 text-lg">
            Register your country or organization to begin building your climate
            transparency infrastructure.
          </p>
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-3 text-teal-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs text-white">1</span>
              Create your account
            </li>
            <li className="flex items-center gap-3 text-teal-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs text-white">2</span>
              Set up your country profile
            </li>
            <li className="flex items-center gap-3 text-teal-100">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs text-white">3</span>
              Select and configure modules
            </li>
          </ul>
        </div>
        <p className="text-teal-200 text-sm">
          UNFCCC Enhanced Transparency Framework
        </p>
      </div>

      {/* Right Panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="h-8 w-8 rounded-lg bg-teal-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NC</span>
              </div>
              <span className="text-lg font-bold text-slate-900">DCACI</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Get started with the Digital Center for Applied Carbon Intelligence
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="input-field"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="input-field"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="input-field"
              >
                <option value="">Select your country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Organization (optional)
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Ministry, agency, or organization"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  className="input-field"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-1.5"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  required
                  minLength={8}
                  className="input-field"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input
                id="terms"
                type="checkbox"
                required
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-500"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the{" "}
                <a href="#" className="text-teal-700 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-teal-700 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full"
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-teal-700 hover:text-teal-800"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
