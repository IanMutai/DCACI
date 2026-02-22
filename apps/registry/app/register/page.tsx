"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Heart, Check, ArrowRight } from "lucide-react"
import ARCLogo from "@/components/arc-logo"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    accountType: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    country: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/login")
  }

  const accountTypes = [
    { value: "project_proponent", label: "Project Proponent" },
    { value: "verifier", label: "Verifier/Validator" },
    { value: "buyer", label: "Carbon Credit Buyer" },
    { value: "government", label: "Government Official" },
  ]

  const countries = [
    { value: "kenya", label: "Kenya" },
    { value: "nigeria", label: "Nigeria" },
    { value: "ethiopia", label: "Ethiopia" },
    { value: "morocco", label: "Morocco" },
    { value: "tanzania", label: "Tanzania" },
    { value: "south_africa", label: "South Africa" },
    { value: "ghana", label: "Ghana" },
    { value: "egypt", label: "Egypt" },
    { value: "rwanda", label: "Rwanda" },
    { value: "other", label: "Other" },
  ]

  const benefits = [
    "Register and track carbon projects",
    "Access official documentation",
    "Monitor carbon credit issuance",
    "Connect with verified buyers globally",
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-sidebar p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-80 h-80 bg-sidebar-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 pattern-dots" />
        </div>

        <div className="relative z-10">
          <ARCLogo theme="light" size="lg" />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl lg:text-5xl font-serif font-medium text-sidebar-foreground mb-6 leading-tight">
            Join Africa's Carbon
            <br />
            <span className="text-sidebar-primary">Revolution</span>
          </h1>
          <p className="text-sidebar-foreground/60 mb-10 leading-relaxed">
            Register to start managing your carbon credit projects and contribute to Africa's sustainable development
            goals.
          </p>

          {/* Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-sidebar-foreground/80">
                <div className="w-6 h-6 bg-sidebar-primary/20 rounded-full flex items-center justify-center">
                  <Check size={12} className="text-sidebar-primary" />
                </div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-1 text-sm text-sidebar-foreground/40">
          Made with <Heart size={14} className="text-red-400 fill-red-400 mx-1" /> by GIZ & Verst Carbon
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 bg-sidebar">
          <ARCLogo theme="light" size="sm" />
        </div>

        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-medium text-foreground mb-2">Create Account</h2>
              <p className="text-muted-foreground">Register to access the ARC platform</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center gap-3 mb-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= 1 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                1
              </div>
              <div className={`flex-1 h-1 rounded-full transition-all ${step >= 2 ? "bg-primary" : "bg-secondary"}`} />
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  step >= 2 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}
              >
                2
              </div>
            </div>

            <form onSubmit={handleRegister}>
              {step === 1 && (
                <div className="space-y-5 animate-fade-up">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Account Type</label>
                    <select
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select account type</option>
                      {accountTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select your country</option>
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@organization.com"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 700 000 000"
                      className="input-field"
                      required
                    />
                  </div>

                  <button type="button" onClick={() => setStep(2)} className="btn-primary w-full justify-center">
                    Continue
                    <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5 animate-fade-up">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Organization Name</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Enter organization name"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="input-field pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Must be at least 8 characters with a number and symbol
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="input-field pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                      required
                    />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:text-primary/80 font-medium">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:text-primary/80 font-medium">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !formData.agreeTerms}
                      className="btn-primary flex-1 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:text-primary/80">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <Link href="/public" className="btn-secondary w-full justify-center">
                Visit Public Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden p-6 text-center text-sm text-muted-foreground border-t border-border">
          <div className="flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500 mx-1" /> by GIZ & Verst Carbon
          </div>
        </div>
      </div>
    </div>
  )
}
