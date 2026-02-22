"use client";

import { useState } from "react";
import { Search, Bell, Settings, Command, Globe2, DollarSign, Sparkles } from "lucide-react";
import { useAppContext } from "./context-provider";

interface DashboardHeaderProps {
  onToggleChat?: () => void;
  chatOpen?: boolean;
}

export default function DashboardHeader({ onToggleChat, chatOpen }: DashboardHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { context, setContext } = useAppContext();

  return (
    <header className="flex h-16 items-center justify-between border-b border-[hsl(var(--border))]/50 bg-white/80 backdrop-blur-xl px-8">
      {/* Left: Context Switcher (prominent) */}
      <div className="flex items-center gap-5 flex-1">
        {/* Context Switcher */}
        <div
          className="flex rounded-xl p-1 border border-[hsl(var(--border))]"
          style={{ backgroundColor: "hsl(var(--secondary))" }}
        >
          <button
            onClick={() => setContext("environment")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              context === "environment"
                ? "bg-white shadow-sm text-emerald-700"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            <Globe2 className="h-4 w-4" />
            Environment
          </button>
          <button
            onClick={() => setContext("finance")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              context === "finance"
                ? "bg-white shadow-sm text-blue-700"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            <DollarSign className="h-4 w-4" />
            Finance
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder={
              context === "environment"
                ? "Search emissions, MRV, NDC..."
                : "Search finance, LOAs, budget..."
            }
            className="w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] py-2 pl-10 pr-16 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/10 transition-all duration-200"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 rounded-lg bg-white border border-[hsl(var(--border))] px-1.5 py-0.5">
            <Command className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
            <span className="text-[11px] font-medium text-[hsl(var(--muted-foreground))]">K</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Intelligence Toggle */}
        {onToggleChat && (
          <button
            onClick={onToggleChat}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
              chatOpen
                ? "bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-sm"
                : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
            }`}
            title={chatOpen ? "Hide Intelligence" : "Show Intelligence"}
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden lg:inline">Intelligence</span>
          </button>
        )}

        {/* Notifications */}
        <button className="relative rounded-xl p-2.5 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))] transition-colors duration-200">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-[hsl(var(--border))]" />

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-xl p-2 hover:bg-[hsl(var(--secondary))] transition-colors duration-200"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl font-semibold text-xs"
              style={{
                backgroundColor: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              DU
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                Demo User
              </p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[hsl(var(--border))] bg-white py-2 shadow-lg z-50 animate-scale-in">
              <a
                href="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))] transition-colors"
              >
                <Settings className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
                Account Settings
              </a>
              <hr className="my-1.5 border-[hsl(var(--border))]" />
              <button className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-[hsl(var(--destructive))] hover:bg-red-50 transition-colors">
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Settings gear */}
        <button className="rounded-xl p-2.5 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))] transition-all duration-200 hover:rotate-90">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
