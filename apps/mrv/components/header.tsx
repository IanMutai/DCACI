"use client";

import { useState } from "react";
import { Bell, Search, Settings, Command, User } from "lucide-react";

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-[hsl(var(--border))]/60 bg-white/80 backdrop-blur-xl px-8">
      {/* Left: Search Bar */}
      <div className="relative hidden md:block">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
        />
        <input
          type="text"
          placeholder="Search inventories, sectors..."
          className="h-10 w-72 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 pl-10 pr-16 text-sm text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] transition-all duration-200 focus:border-[hsl(var(--primary))] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/10"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <Command size={12} className="text-[hsl(var(--muted-foreground))]" />
          <kbd className="rounded border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-1.5 py-0.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
            K
          </kbd>
        </div>
      </div>

      {/* Right: Notifications, Divider, User Info, Settings */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:bg-[hsl(var(--muted))]"
          >
            <Bell size={18} className="text-[hsl(var(--muted-foreground))]" />
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[10px] font-bold text-white shadow-sm">
              3
            </span>
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 rounded-xl border border-[hsl(var(--border))] bg-white p-2 shadow-lg shadow-black/5">
              <div className="px-3 py-2 text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">
                Notifications
              </div>
              <div className="space-y-1">
                <div className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-[hsl(var(--muted))]/50 transition-colors cursor-pointer">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-[hsl(var(--accent))] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      Inventory review pending
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      2 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-[hsl(var(--muted))]/50 transition-colors cursor-pointer">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-[hsl(var(--success))] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      QA/QC check completed
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      1 hour ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-[hsl(var(--muted))]/50 transition-colors cursor-pointer">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-[hsl(var(--primary))] flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[hsl(var(--foreground))]">
                      New emission factors available
                    </p>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">
                      3 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-[hsl(var(--border))]" />

        {/* User Info */}
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-sm font-medium text-[hsl(var(--foreground))] leading-tight">
              Inventory Manager
            </span>
            <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
              Admin
            </span>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(174_45%_35%)] border-2 border-[hsl(var(--primary))]/20 text-white shadow-sm">
            <User size={18} />
          </div>
        </div>

        {/* Settings Gear */}
        <button className="flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:bg-[hsl(var(--muted))] hover:rotate-90 group">
          <Settings
            size={18}
            className="text-[hsl(var(--muted-foreground))] transition-transform duration-300 group-hover:rotate-90"
          />
        </button>
      </div>
    </header>
  );
}
