"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Target,
  Database,
  ArrowLeftRight,
  FileText,
  Settings,
  HelpCircle,
  ChevronRight,
  Leaf,
} from "lucide-react";

const mainNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "MRV System",
    href: "/dashboard/mrv",
    icon: BarChart3,
    badge: "MRV",
    children: [
      { name: "Overview", href: "/dashboard/mrv" },
      { name: "Data Collection", href: "/dashboard/mrv/data" },
      { name: "Verification", href: "/dashboard/mrv/verification" },
    ],
  },
  {
    name: "NDC Tracker",
    href: "/dashboard/ndc",
    icon: Target,
    badge: "NDC",
    children: [
      { name: "Overview", href: "/dashboard/ndc" },
      { name: "Targets", href: "/dashboard/ndc/targets" },
      { name: "Progress", href: "/dashboard/ndc/progress" },
    ],
  },
  {
    name: "Registry",
    href: "/dashboard/registry",
    icon: Database,
    badge: "REG",
  },
  {
    name: "Integration",
    href: "/dashboard/integration",
    icon: ArrowLeftRight,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  function isActive(href: string) {
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  function isSectionActive(href: string) {
    return pathname.startsWith(href);
  }

  function toggleSection(name: string) {
    setExpandedSections((prev) =>
      prev.includes(name)
        ? prev.filter((s) => s !== name)
        : [...prev, name]
    );
  }

  function isSectionExpanded(name: string) {
    return expandedSections.includes(name);
  }

  return (
    <aside
      className="flex w-64 flex-col"
      style={{ backgroundColor: "hsl(var(--sidebar))" }}
    >
      {/* Logo */}
      <div
        className="flex h-20 items-center gap-3 px-6"
        style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "hsl(var(--sidebar-primary))" }}
        >
          <Leaf
            className="h-5 w-5"
            style={{ color: "hsl(var(--sidebar-primary-foreground))" }}
          />
        </div>
        <div>
          <span
            className="text-base font-bold"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
          >
            NCTP
          </span>
          <span
            className="block text-[11px] font-medium"
            style={{ color: "hsl(var(--sidebar-foreground) / 0.5)" }}
          >
            Climate Platform
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-6 space-y-1">
        {mainNavigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const sectionActive = isSectionActive(item.href);
          const expanded = isSectionExpanded(item.name);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.name}>
              {hasChildren ? (
                <button
                  onClick={() => toggleSection(item.name)}
                  className={`w-full ${sectionActive ? "sidebar-link-active" : "sidebar-link"}`}
                >
                  <Icon className="h-[18px] w-[18px] flex-shrink-0" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                      style={{
                        backgroundColor: sectionActive
                          ? "hsl(var(--sidebar-primary-foreground) / 0.2)"
                          : "hsl(var(--sidebar-accent))",
                        color: sectionActive
                          ? "hsl(var(--sidebar-primary-foreground))"
                          : "hsl(var(--sidebar-foreground) / 0.6)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight
                    className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${
                      expanded ? "rotate-90" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={active ? "sidebar-link-active" : "sidebar-link"}
                >
                  <Icon className="h-[18px] w-[18px] flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                      style={{
                        backgroundColor: active
                          ? "hsl(var(--sidebar-primary-foreground) / 0.2)"
                          : "hsl(var(--sidebar-accent))",
                        color: active
                          ? "hsl(var(--sidebar-primary-foreground))"
                          : "hsl(var(--sidebar-foreground) / 0.6)",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}

              {/* Sub-items */}
              {hasChildren && expanded && (
                <div className="mt-1 ml-4 space-y-0.5">
                  {item.children!.map((child) => {
                    const childActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 rounded-lg py-2 pl-4 text-[13px] font-medium transition-colors duration-200"
                        style={{
                          borderLeft: childActive
                            ? "2px solid hsl(var(--sidebar-primary))"
                            : "2px solid hsl(var(--sidebar-border))",
                          color: childActive
                            ? "hsl(var(--sidebar-primary))"
                            : "hsl(var(--sidebar-foreground) / 0.6)",
                          backgroundColor: childActive
                            ? "hsl(var(--sidebar-accent))"
                            : "transparent",
                        }}
                      >
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div
        className="px-3 py-4 space-y-1"
        style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}
      >
        <Link href="/dashboard/settings" className="sidebar-link">
          <Settings className="h-[18px] w-[18px] flex-shrink-0" />
          <span className="flex-1">Settings</span>
        </Link>
        <button className="sidebar-link w-full">
          <HelpCircle className="h-[18px] w-[18px] flex-shrink-0" />
          <span className="flex-1 text-left">Help & Support</span>
        </button>

        <div
          className="mt-4 pt-4 text-center"
          style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}
        >
          <p
            className="text-[11px]"
            style={{ color: "hsl(var(--sidebar-foreground) / 0.4)" }}
          >
            Made with &#9829; for Climate Action
          </p>
        </div>
      </div>
    </aside>
  );
}
