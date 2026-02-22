"use client";

import { Search, Bell, Settings, ChevronDown, User, Command } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center border-b border-[hsl(var(--border))]/60 bg-white/80 backdrop-blur-xl">
      <div className="flex w-full items-center justify-between px-8">
        {/* Left: Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search targets, policies..."
            className="h-10 w-80 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--secondary))] pl-10 pr-12 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] transition-all focus:border-[hsl(var(--ring))] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]/10"
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-0.5 rounded-md border border-[hsl(var(--border))] bg-white px-1.5 py-0.5">
            <Command className="h-3 w-3 text-[hsl(var(--muted-foreground))]" />
            <span className="text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
              K
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className="relative rounded-xl p-2.5 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--accent))] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
            </span>
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-[hsl(var(--border))]" />

          {/* User Info */}
          <button className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-[hsl(var(--secondary))]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-xs font-bold text-white">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                Climate Officer
              </p>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))]">
                Ministry of Environment
              </p>
            </div>
            <ChevronDown className="hidden h-4 w-4 text-[hsl(var(--muted-foreground))] md:block" />
          </button>

          {/* Settings */}
          <button className="rounded-xl p-2.5 text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
