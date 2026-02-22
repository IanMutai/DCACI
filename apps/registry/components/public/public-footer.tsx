import Link from "next/link"
import { Heart } from "lucide-react"
import ARCLogo from "@/components/arc-logo"

export default function PublicFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <ARCLogo theme="light" size="lg" className="mb-6" />
            <p className="text-sm text-sidebar-foreground/60 max-w-sm leading-relaxed mb-8">
              A digital public goods carbon registry platform designed to empower African nations with transparent,
              efficient tools for managing carbon credits and driving sustainable development.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-sidebar-accent hover:bg-sidebar-primary/20 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-sidebar-accent hover:bg-sidebar-primary/20 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-sidebar-accent hover:bg-sidebar-primary/20 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5 text-sidebar-foreground/60 group-hover:text-sidebar-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sidebar-foreground mb-4">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/public/projects"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/public/verify"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  Verify Documents
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  Register Project
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sidebar-foreground mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  Deployment Guide
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  GitHub Repository
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sidebar-foreground mb-4">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/public/contact"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@arc-registry.org"
                  className="text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
                >
                  support@arc-registry.org
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-sidebar-accent rounded-xl">
              <p className="text-xs text-sidebar-foreground/60 leading-relaxed">
                ARC is a digital public goods platform available under the MIT license. Contributions and feedback are
                welcome.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sidebar-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-sidebar-foreground/50">
            © {currentYear} ARC - African Registry for Carbon. Digital Public Goods under MIT License.
          </div>
          <div className="flex items-center gap-1 text-sm text-sidebar-foreground/50">
            Made with <Heart size={14} className="text-red-400 fill-red-400 mx-1" /> by GIZ & Verst Carbon
          </div>
        </div>
      </div>
    </footer>
  )
}
