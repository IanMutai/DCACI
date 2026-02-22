"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react"
import ARCLogo from "@/components/arc-logo"

export default function PublicHeader() {
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-gradient-to-b from-background/50 to-transparent backdrop-blur-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/public" className="flex items-center hover:scale-105 transition-transform">
            <ARCLogo size="md" theme="color" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/public"
              className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/public/projects"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
            >
              Projects
            </Link>
            <Link
              href="/public/verify"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
            >
              Verify Documents
            </Link>
            <Link
              href="/studio"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
            >
              KNCR Studio
            </Link>
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
              >
                Resources
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl py-2 animate-scale-in">
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    API Reference
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    Guidelines
                  </Link>
                  <div className="my-2 border-t border-border" />
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    GitHub Repository
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/public/contact"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg"
            >
              Contact
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link href="/register" className="btn-primary text-sm">
              Get Started
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border animate-fade-up">
            <nav className="flex flex-col gap-1">
              <Link href="/public" className="px-4 py-3 text-sm font-medium text-foreground rounded-lg">
                Home
              </Link>
              <Link
                href="/public/projects"
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg"
              >
                Projects
              </Link>
              <Link
                href="/public/verify"
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg"
              >
                Verify Documents
              </Link>
              <Link href="/studio" className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg">
                KNCR Studio
              </Link>
              <Link
                href="/public/contact"
                className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground rounded-lg"
              >
                Contact
              </Link>
              <div className="flex gap-3 pt-4 mt-4 border-t border-border">
                <Link
                  href="/login"
                  className="flex-1 py-3 text-center text-sm font-medium text-muted-foreground border border-border rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex-1 py-3 text-center text-sm font-medium bg-primary text-primary-foreground rounded-xl"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
