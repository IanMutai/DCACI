import React from "react";

// ============================================================================
// Layout Components
// ============================================================================

export interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function PageLayout({
  children,
  title,
  subtitle,
  actions,
  breadcrumbs,
  className = "",
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              {breadcrumbs.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-nctp-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {(title || actions) && (
          <div className="flex items-start justify-between mb-8">
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
              )}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: string;
  className?: string;
}

export function SidebarLayout({
  sidebar,
  children,
  sidebarWidth = "w-64",
  className = "",
}: SidebarLayoutProps) {
  return (
    <div className={`flex min-h-screen ${className}`}>
      <aside
        className={`${sidebarWidth} flex-shrink-0 bg-white border-r border-gray-200`}
      >
        <div className="sticky top-0 h-screen overflow-y-auto p-4">
          {sidebar}
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}

export interface SidebarNavItemProps {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  badge?: string | number;
  className?: string;
}

export function SidebarNavItem({
  label,
  href,
  icon,
  isActive = false,
  badge,
  className = "",
}: SidebarNavItemProps) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
        isActive
          ? "bg-nctp-primary/10 text-nctp-primary font-medium"
          : "text-gray-700 hover:bg-gray-100"
      } ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1">{label}</span>
      {badge !== undefined && (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
          {badge}
        </span>
      )}
    </a>
  );
}
