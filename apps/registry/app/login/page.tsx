"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight, Heart } from "lucide-react"
import ARCLogo from "@/components/arc-logo"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard")
  }

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
            Empowering Africa's
            <br />
            <span className="text-sidebar-primary">Climate Future</span>
          </h1>
          <p className="text-sidebar-foreground/60 leading-relaxed">
            Join the platform that's helping African nations manage carbon credits with transparency, efficiency, and
            scale.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-1 text-sm text-sidebar-foreground/40">
          Made with <Heart size={14} className="text-red-400 fill-red-400 mx-1" /> by GIZ & Verst Carbon
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden p-6 bg-sidebar">
          <ARCLogo theme="light" size="sm" />
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-medium text-foreground mb-2">Welcome back</h2>
              <p className="text-muted-foreground">Sign in to continue to your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@organization.com"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
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
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
                  />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 font-medium">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary font-medium hover:text-primary/80">
                  Create one here
                </Link>
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <Link href="http://www.arc.verst.earth/" className="btn-secondary w-full justify-center">
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
