import React from "react";

// ============================================================================
// Table Components
// ============================================================================

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export function Table({ children, className = "", ...props }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full divide-y divide-gray-200 ${className}`}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHeader({ children, className = "" }: TableHeaderProps) {
  return <thead className={`bg-gray-50 ${className}`}>{children}</thead>;
}

export interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function TableBody({ children, className = "" }: TableBodyProps) {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  );
}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
  isHoverable?: boolean;
  isSelected?: boolean;
}

export function TableRow({
  children,
  isHoverable = true,
  isSelected = false,
  className = "",
  ...props
}: TableRowProps) {
  const classes = [
    isHoverable ? "hover:bg-gray-50" : "",
    isSelected ? "bg-nctp-primary/5" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <tr className={classes} {...props}>
      {children}
    </tr>
  );
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  isHeader?: boolean;
}

export function TableCell({
  children,
  isHeader = false,
  className = "",
  ...props
}: TableCellProps) {
  if (isHeader) {
    return (
      <th
        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
        {...props}
      >
        {children}
      </th>
    );
  }

  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}

export interface EmptyTableProps {
  message?: string;
  colSpan: number;
}

export function EmptyTable({
  message = "No data available",
  colSpan,
}: EmptyTableProps) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-12 text-center text-sm text-gray-500"
      >
        {message}
      </td>
    </tr>
  );
}
