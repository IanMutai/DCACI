"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  Settings2,
  GitBranch,
  BarChart3,
  TrendingUp,
  LineChart,
  ScrollText,
  Zap,
  Scale,
  Layers,
  ArrowUpDown,
  Wallet,
  Search,
  FileText,
  AlertTriangle,
  FileBarChart,
  BookOpen,
  ChevronRight,
  Globe2,
  User,
  LogOut,
  Settings,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Targets",
    items: [
      { label: "All Targets", href: "/targets", icon: Target },
      { label: "Configure", href: "/targets/configure", icon: Settings2 },
      { label: "Scenarios", href: "/targets/scenarios", icon: GitBranch },
    ],
  },
  {
    title: "Progress",
    items: [
      { label: "Dashboard", href: "/progress/dashboard", icon: BarChart3 },
      { label: "Tracking", href: "/progress/tracking", icon: TrendingUp },
      { label: "Projections", href: "/progress/projections", icon: LineChart },
    ],
  },
  {
    title: "Policies",
    items: [
      { label: "Measures", href: "/policies/measures", icon: ScrollText },
      { label: "Impact Analysis", href: "/policies/impact", icon: Zap },
      { label: "Cost-Benefit", href: "/policies/cost-benefit", icon: Scale },
    ],
  },
  {
    title: "Baselines",
    items: [
      { label: "Scenarios", href: "/baselines/scenarios", icon: Layers },
      {
        label: "Projections",
        href: "/baselines/projections",
        icon: ArrowUpDown,
      },
    ],
  },
  {
    title: "Finance",
    items: [
      { label: "Needs Assessment", href: "/finance/needs", icon: Wallet },
      { label: "Tracking", href: "/finance/tracking", icon: Search },
      { label: "Reporting", href: "/finance/reporting", icon: FileText },
    ],
  },
  {
    title: "Analysis",
    items: [
      { label: "Gap Analysis", href: "/gap-analysis", icon: AlertTriangle },
    ],
  },
  {
    title: "Reporting",
    items: [
      {
        label: "NDC Updates",
        href: "/reporting/ndc-updates",
        icon: FileBarChart,
      },
      {
        label: "BTR Chapter 3",
        href: "/reporting/btr-chapter3",
        icon: BookOpen,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
    new Set()
  );

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col bg-[hsl(var(--sidebar))]">
      {/* Logo Section */}
      <div className="flex items-center gap-3 border-b border-[hsl(var(--sidebar-border))] p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg">
          <Globe2 className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-wide text-white">
            NCTP
          </span>
          <span className="text-xs font-medium text-[hsl(var(--sidebar-foreground))]/60">
            NDC Tracker
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <div className="space-y-1">
          {navigation.map((section) => {
            const isCollapsed = collapsedSections.has(section.title);
            return (
              <div key={section.title} className="mb-1">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--sidebar-foreground))]/40 transition-colors hover:text-[hsl(var(--sidebar-foreground))]/70"
                >
                  <span>{section.title}</span>
                  <ChevronRight
                    className={`h-3 w-3 opacity-0 transition-all group-hover:opacity-100 ${
                      !isCollapsed ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Section Items */}
                {!isCollapsed && (
                  <div className="mt-0.5 space-y-0.5">
                    {section.items.map((item) => {
                      const active = isActive(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all ${
                            active
                              ? "bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] shadow-sm"
                              : "text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 flex-shrink-0 ${
                              active
                                ? "text-[hsl(var(--sidebar-primary-foreground))]"
                                : "opacity-60 group-hover:opacity-100"
                            }`}
                          />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* User Area */}
      <div className="border-t border-[hsl(var(--sidebar-border))] p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-300 to-teal-500 text-xs font-bold text-white">
            <User className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white/90">
              Climate Officer
            </p>
            <p className="truncate text-[11px] text-[hsl(var(--sidebar-foreground))]/50">
              Ministry of Environment
            </p>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1 px-1">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-[hsl(var(--sidebar-foreground))]/50 transition-colors hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]/80">
            <Settings className="h-3.5 w-3.5" />
            Settings
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-[hsl(var(--sidebar-foreground))]/50 transition-colors hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]/80">
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
