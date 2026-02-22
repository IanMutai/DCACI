"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  PenLine,
  Calculator,
  CheckCircle2,
  Flame,
  Factory,
  Wheat,
  TreePine,
  Trash2,
  BarChart3,
  AlertTriangle,
  RotateCcw,
  Atom,
  ShieldCheck,
  FileSearch,
  FolderOpen,
  FileText,
  Globe,
  Download,
  ChevronRight,
  Leaf,
  Settings,
  HelpCircle,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard size={18} />,
      },
    ],
  },
  {
    title: "Inventory",
    items: [
      {
        label: "Inventories",
        href: "/inventory",
        icon: <ClipboardList size={18} />,
      },
      {
        label: "Data Entry",
        href: "/inventory/data-entry",
        icon: <PenLine size={18} />,
      },
      {
        label: "Calculations",
        href: "/inventory/calculations",
        icon: <Calculator size={18} />,
      },
      {
        label: "Review",
        href: "/inventory/review",
        icon: <CheckCircle2 size={18} />,
      },
    ],
  },
  {
    title: "Sectors",
    items: [
      {
        label: "Energy",
        href: "/sectors/energy",
        icon: <Flame size={18} />,
      },
      {
        label: "IPPU",
        href: "/sectors/ippu",
        icon: <Factory size={18} />,
      },
      {
        label: "Agriculture",
        href: "/sectors/agriculture",
        icon: <Wheat size={18} />,
      },
      {
        label: "LULUCF",
        href: "/sectors/lulucf",
        icon: <TreePine size={18} />,
      },
      {
        label: "Waste",
        href: "/sectors/waste",
        icon: <Trash2 size={18} />,
      },
    ],
  },
  {
    title: "Analysis",
    items: [
      {
        label: "Key Categories",
        href: "/key-categories",
        icon: <BarChart3 size={18} />,
      },
      {
        label: "Uncertainty",
        href: "/uncertainty",
        icon: <AlertTriangle size={18} />,
      },
      {
        label: "Recalculations",
        href: "/recalculations",
        icon: <RotateCcw size={18} />,
      },
      {
        label: "Emission Factors",
        href: "/emission-factors",
        icon: <Atom size={18} />,
      },
    ],
  },
  {
    title: "QA/QC",
    items: [
      {
        label: "Checks",
        href: "/qaqc/checks",
        icon: <ShieldCheck size={18} />,
      },
      {
        label: "Reviews",
        href: "/qaqc/reviews",
        icon: <FileSearch size={18} />,
      },
      {
        label: "Documentation",
        href: "/qaqc/documentation",
        icon: <FolderOpen size={18} />,
      },
    ],
  },
  {
    title: "Reporting",
    items: [
      {
        label: "NIR",
        href: "/reporting/nir",
        icon: <FileText size={18} />,
      },
      {
        label: "BTR",
        href: "/reporting/btr",
        icon: <Globe size={18} />,
      },
      {
        label: "Exports",
        href: "/reporting/exports",
        icon: <Download size={18} />,
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
    if (href === "/dashboard") {
      return pathname === "/dashboard" || pathname === "/";
    }
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[260px] flex-col bg-[hsl(var(--sidebar))]">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 p-6 border-b border-[hsl(var(--sidebar-border))]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg shadow-teal-500/20">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-[hsl(var(--sidebar-foreground))] tracking-wide">
            NCTP MRV
          </span>
          <span className="text-[11px] text-[hsl(var(--sidebar-foreground))]/50 font-medium">
            GHG Inventory System
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-1">
        {navSections.map((section) => {
          const isCollapsed = collapsedSections.has(section.title);

          return (
            <div key={section.title} className="mb-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.title)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--sidebar-foreground))]/40 hover:text-[hsl(var(--sidebar-foreground))]/70 transition-colors"
              >
                <span>{section.title}</span>
                <ChevronRight
                  size={12}
                  className={`transition-transform duration-200 ${
                    isCollapsed ? "" : "rotate-90"
                  }`}
                />
              </button>

              {/* Section Items */}
              {!isCollapsed && (
                <div className="mt-0.5 space-y-0.5 border-l border-[hsl(var(--sidebar-border))]/50 ml-3 pl-4">
                  {section.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`
                          group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200
                          ${
                            active
                              ? "bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))] shadow-sm"
                              : "text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))]"
                          }
                        `}
                      >
                        <span
                          className={`flex-shrink-0 transition-colors ${
                            active
                              ? "text-[hsl(var(--sidebar-primary-foreground))]"
                              : "text-[hsl(var(--sidebar-foreground))]/40 group-hover:text-[hsl(var(--sidebar-accent-foreground))]/80"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-[hsl(var(--sidebar-border))] p-3 space-y-1">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))] transition-all duration-200">
          <Settings size={18} className="opacity-50" />
          <span>Settings</span>
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[hsl(var(--sidebar-foreground))]/70 hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-accent-foreground))] transition-all duration-200">
          <HelpCircle size={18} className="opacity-50" />
          <span>Help</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 text-center">
        <p className="text-[10px] text-[hsl(var(--sidebar-foreground))]/30">
          Made with &#9829; by NCTP
        </p>
      </div>
    </aside>
  );
}
