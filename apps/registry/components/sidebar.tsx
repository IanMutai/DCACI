"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderOpen,
  Plus,
  List,
  CheckCircle,
  Globe,
  FileText,
  Users,
  ChevronRight,
  Heart,
  ExternalLink,
  Settings,
  HelpCircle,
} from "lucide-react"
import ARCLogo from "./arc-logo"

export default function Sidebar() {
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [article6Open, setArticle6Open] = useState(false)
  const pathname = usePathname()

  const isProjectsListActive =
    pathname === "/projects" ||
    pathname === "/pcn" ||
    pathname === "/pdd" ||
    pathname === "/authorization" ||
    pathname === "/monitoring" ||
    pathname === "/issuance"
  const isAddProjectActive = pathname === "/" || pathname === "/onboarding"

  return (
    <aside className="w-[260px] bg-sidebar flex flex-col min-h-screen border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <ARCLogo size="md" theme="light" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-1">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              pathname === "/dashboard"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {/* Projects Section */}
          <div className="pt-4">
            <button
              onClick={() => setProjectsOpen(!projectsOpen)}
              className="flex items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent rounded-xl text-sm font-medium w-full transition-all"
            >
              <FolderOpen size={18} />
              Projects
              <ChevronRight
                size={14}
                className={`ml-auto transition-transform duration-200 ${projectsOpen ? "rotate-90" : ""}`}
              />
            </button>

            {projectsOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
                <Link
                  href="/"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isAddProjectActive
                      ? "bg-sidebar-primary/20 text-sidebar-primary"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <Plus size={16} />
                  Add Project
                </Link>
                <Link
                  href="/projects"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    isProjectsListActive
                      ? "bg-sidebar-primary/20 text-sidebar-primary"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <List size={16} />
                  Projects List
                </Link>
              </div>
            )}
          </div>

          {/* Article 6 Projects */}
          <div>
            <button
              onClick={() => setArticle6Open(!article6Open)}
              className="flex items-center gap-3 px-4 py-3 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground rounded-xl text-sm w-full transition-all"
            >
              <CheckCircle size={18} />
              Article 6 Projects
              <ChevronRight
                size={14}
                className={`ml-auto transition-transform duration-200 ${article6Open ? "rotate-90" : ""}`}
              />
            </button>

            {article6Open && (
              <div className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-4">
                <Link
                  href="/article6-projects"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all"
                >
                  <List size={16} />
                  All Projects
                </Link>
                <Link
                  href="/article6-projects/itmo-dashboard"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                    pathname === "/article6-projects/itmo-dashboard"
                      ? "bg-sidebar-primary/20 text-sidebar-primary"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <CheckCircle size={16} />
                  ITMO Dashboard
                </Link>
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link
            href="/credit-listings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
              pathname === "/credit-listings"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <Globe size={18} />
            Credit Listings
          </Link>

          <Link
            href="/transactions"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
              pathname === "/transactions"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <FileText size={18} />
            Transactions
          </Link>

          <Link
            href="/community-development"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
              pathname === "/community-development"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <Users size={18} />
            Community Agreement
          </Link>

          <Link
            href="/compliance"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
              pathname === "/compliance"
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            }`}
          >
            <CheckCircle size={18} />
            Compliance
          </Link>
        </div>

        {/* Public Portal Link */}
        <div className="mt-8 pt-6 border-t border-sidebar-border">
          <Link
            href="http://www.arc.verst.earth/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-sidebar-primary hover:bg-sidebar-primary/10 rounded-xl text-sm font-medium transition-all"
          >
            <ExternalLink size={18} />
            Public Portal
          </Link>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 mb-4">
          <Link
            href="/settings"
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              pathname === "/settings"
                ? "bg-sidebar-primary/20 text-sidebar-primary"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent"
            }`}
          >
            <Settings size={16} />
            Settings
          </Link>
          <Link
            href="/help"
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              pathname === "/help"
                ? "bg-sidebar-primary/20 text-sidebar-primary"
                : "text-sidebar-foreground/60 hover:bg-sidebar-accent"
            }`}
          >
            <HelpCircle size={16} />
            Help
          </Link>
        </div>

        <div className="px-2 text-xs text-sidebar-foreground/40">
          <div className="flex items-center gap-1 justify-center">
            Made with <Heart size={10} className="text-red-400 fill-red-400" /> by GIZ & Verst Carbon
          </div>
        </div>
      </div>
    </aside>
  )
}
