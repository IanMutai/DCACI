"use client";

interface GapData {
  sector: string;
  currentTrajectory: number;
  target: number;
  gap: number;
  priority: "high" | "medium" | "low";
}

interface GapChartProps {
  data: GapData[];
  title?: string;
}

const priorityColors: Record<string, { bar: string; badge: string }> = {
  high: { bar: "bg-red-500", badge: "bg-red-100 text-red-700" },
  medium: { bar: "bg-amber-500", badge: "bg-amber-100 text-amber-700" },
  low: { bar: "bg-blue-500", badge: "bg-blue-100 text-blue-700" },
};

export default function GapChart({
  data,
  title = "Gap Analysis by Sector",
}: GapChartProps) {
  const maxValue = Math.max(...data.map((d) => Math.abs(d.currentTrajectory)));

  return (
    <div className="card">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>

      <div className="space-y-4">
        {data.map((item) => {
          const colors = priorityColors[item.priority]!;
          const currentWidth = (Math.abs(item.currentTrajectory) / maxValue) * 100;
          const targetWidth = (Math.abs(item.target) / maxValue) * 100;

          return (
            <div key={item.sector}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.sector}</span>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors.badge}`}
                  >
                    {item.priority}
                  </span>
                </div>
                <span className="text-sm text-red-600 font-medium">
                  Gap: {item.gap} MtCO2e
                </span>
              </div>

              <div className="relative">
                {/* Current trajectory */}
                <div className="w-full bg-gray-100 rounded-full h-4 mb-1">
                  <div
                    className={`h-4 rounded-full ${colors.bar} opacity-60`}
                    style={{ width: `${currentWidth}%` }}
                  />
                </div>
                {/* Target */}
                <div className="w-full bg-gray-100 rounded-full h-4">
                  <div
                    className="h-4 rounded-full bg-green-500"
                    style={{ width: `${targetWidth}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-0.5">
                <span>Current: {item.currentTrajectory} MtCO2e</span>
                <span>Target: {item.target} MtCO2e</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-6 justify-center text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gray-400" />
          <span>Current Trajectory</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Target</span>
        </div>
      </div>
    </div>
  );
}
