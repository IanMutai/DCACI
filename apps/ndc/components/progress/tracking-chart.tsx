"use client";

interface TrackingDataPoint {
  year: number;
  emissions: number;
  reductionPercent: number;
}

interface TrackingChartProps {
  data: TrackingDataPoint[];
  baselineEmissions: number;
  targetEmissions: number;
  targetYear: number;
  title?: string;
}

export default function TrackingChart({
  data,
  baselineEmissions,
  targetEmissions,
  targetYear,
  title = "Emissions Tracking",
}: TrackingChartProps) {
  const maxEmissions = Math.max(baselineEmissions, ...data.map((d) => d.emissions));
  const minEmissions = Math.min(targetEmissions, ...data.map((d) => d.emissions));
  const range = maxEmissions - minEmissions;

  const getBarHeight = (value: number) => {
    return ((value - minEmissions) / range) * 100;
  };

  return (
    <div className="card">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>

      <div className="flex items-end gap-2 h-48 border-b border-l border-[var(--color-border)] p-4">
        {/* Baseline reference */}
        <div className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-gray-300 rounded-t"
            style={{ height: `${getBarHeight(baselineEmissions)}%` }}
          />
          <span className="text-xs text-[var(--color-text-muted)] mt-1">
            Base
          </span>
        </div>

        {/* Data points */}
        {data.map((point) => (
          <div key={point.year} className="flex flex-col items-center flex-1">
            <div className="text-xs font-medium mb-1">
              {point.emissions.toFixed(1)}
            </div>
            <div
              className="w-full bg-[var(--color-primary)] rounded-t transition-all"
              style={{ height: `${getBarHeight(point.emissions)}%` }}
            />
            <span className="text-xs text-[var(--color-text-muted)] mt-1">
              {point.year}
            </span>
          </div>
        ))}

        {/* Target reference */}
        <div className="flex flex-col items-center flex-1">
          <div
            className="w-full bg-green-400 rounded-t border-2 border-dashed border-green-600"
            style={{ height: `${getBarHeight(targetEmissions)}%` }}
          />
          <span className="text-xs text-[var(--color-text-muted)] mt-1">
            {targetYear}
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-6 justify-center text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gray-300" />
          <span>Baseline</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-[var(--color-primary)]" />
          <span>Actual Emissions</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-400 border border-green-600" />
          <span>Target</span>
        </div>
      </div>
    </div>
  );
}
