"use client";

interface TrajectoryPoint {
  year: number;
  bau?: number;
  wem?: number;
  wam?: number;
  actual?: number;
  target?: number;
}

interface EmissionsTrajectoryProps {
  data: TrajectoryPoint[];
  title?: string;
  showLegend?: boolean;
}

export default function EmissionsTrajectory({
  data,
  title = "Emissions Trajectory",
  showLegend = true,
}: EmissionsTrajectoryProps) {
  const allValues = data.flatMap((d) =>
    [d.bau, d.wem, d.wam, d.actual, d.target].filter(
      (v): v is number => v !== undefined
    )
  );
  const maxVal = Math.max(...allValues);
  const minVal = Math.min(...allValues);
  const range = maxVal - minVal || 1;

  const getY = (value: number) => {
    return 100 - ((value - minVal) / range) * 80 - 10;
  };

  return (
    <div className="card">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>

      <div className="relative h-64 border-b border-l border-[var(--color-border)] mx-4 mb-4">
        {/* Y-axis labels */}
        <div className="absolute -left-12 top-0 text-xs text-[var(--color-text-muted)]">
          {maxVal.toFixed(0)}
        </div>
        <div className="absolute -left-12 bottom-0 text-xs text-[var(--color-text-muted)]">
          {minVal.toFixed(0)}
        </div>

        {/* Data visualization placeholder with bars */}
        <div className="absolute inset-0 flex items-end justify-around px-2">
          {data.map((point) => (
            <div key={point.year} className="flex flex-col items-center gap-1 flex-1">
              <div className="flex gap-0.5 items-end h-full w-full justify-center">
                {point.bau !== undefined && (
                  <div
                    className="bg-red-400 rounded-t w-2"
                    style={{ height: `${getY(minVal) - getY(point.bau)}%` }}
                    title={`BAU: ${point.bau}`}
                  />
                )}
                {point.wem !== undefined && (
                  <div
                    className="bg-amber-400 rounded-t w-2"
                    style={{ height: `${getY(minVal) - getY(point.wem)}%` }}
                    title={`WEM: ${point.wem}`}
                  />
                )}
                {point.wam !== undefined && (
                  <div
                    className="bg-green-400 rounded-t w-2"
                    style={{ height: `${getY(minVal) - getY(point.wam)}%` }}
                    title={`WAM: ${point.wam}`}
                  />
                )}
                {point.actual !== undefined && (
                  <div
                    className="bg-blue-600 rounded-t w-2"
                    style={{ height: `${getY(minVal) - getY(point.actual)}%` }}
                    title={`Actual: ${point.actual}`}
                  />
                )}
                {point.target !== undefined && (
                  <div
                    className="bg-blue-300 rounded-t w-2 border border-dashed border-blue-500"
                    style={{ height: `${getY(minVal) - getY(point.target)}%` }}
                    title={`Target: ${point.target}`}
                  />
                )}
              </div>
              <span className="text-xs text-[var(--color-text-muted)]">
                {point.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showLegend && (
        <div className="flex gap-4 justify-center text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-400" />
            <span>BAU</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-400" />
            <span>WEM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-green-400" />
            <span>WAM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-600" />
            <span>Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-300 border border-blue-500" />
            <span>Target</span>
          </div>
        </div>
      )}
    </div>
  );
}
