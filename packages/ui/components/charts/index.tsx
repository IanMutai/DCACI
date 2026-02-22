import React from "react";

// ============================================================================
// Chart Components (Container / Placeholder)
// ============================================================================

export interface ChartContainerProps {
  title?: string;
  description?: string;
  height?: number | string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export function ChartContainer({
  title,
  description,
  height = 300,
  children,
  className = "",
  isLoading = false,
}: ChartContainerProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
      )}
      <div
        style={{ height: typeof height === "number" ? `${height}px` : height }}
        className="relative"
      >
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse text-sm text-gray-400">
              Loading chart...
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export interface ChartLegendItem {
  label: string;
  color: string;
  value?: string | number;
}

export interface ChartLegendProps {
  items: ChartLegendItem[];
  className?: string;
}

export function ChartLegend({ items, className = "" }: ChartLegendProps) {
  return (
    <div className={`flex flex-wrap gap-4 mt-3 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-xs">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-gray-600">{item.label}</span>
          {item.value !== undefined && (
            <span className="font-medium text-gray-900">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
