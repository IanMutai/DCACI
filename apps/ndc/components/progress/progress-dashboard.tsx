"use client";

interface SectorProgress {
  sector: string;
  progress: number;
  target: number;
  status: "on-track" | "off-track" | "at-risk";
}

interface ProgressDashboardProps {
  overallProgress: number;
  totalTargets: number;
  onTrackTargets: number;
  totalReduced: number;
  remainingGap: number;
  sectorProgress: SectorProgress[];
}

const statusColors: Record<string, string> = {
  "on-track": "bg-green-500",
  "off-track": "bg-red-500",
  "at-risk": "bg-amber-500",
};

export default function ProgressDashboard({
  overallProgress,
  totalTargets,
  onTrackTargets,
  totalReduced,
  remainingGap,
  sectorProgress,
}: ProgressDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="text-sm text-[var(--color-text-muted)]">
            Overall Progress
          </div>
          <div className="text-2xl font-bold mt-1">
            {overallProgress.toFixed(1)}%
          </div>
          <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-[var(--color-primary)] h-2 rounded-full"
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            />
          </div>
        </div>

        <div className="card">
          <div className="text-sm text-[var(--color-text-muted)]">
            Targets On Track
          </div>
          <div className="text-2xl font-bold mt-1">
            {onTrackTargets} / {totalTargets}
          </div>
        </div>

        <div className="card">
          <div className="text-sm text-[var(--color-text-muted)]">
            Emissions Reduced
          </div>
          <div className="text-2xl font-bold mt-1 text-green-600">
            {totalReduced} MtCO2e
          </div>
        </div>

        <div className="card">
          <div className="text-sm text-[var(--color-text-muted)]">
            Remaining Gap
          </div>
          <div className="text-2xl font-bold mt-1 text-red-600">
            {remainingGap} MtCO2e
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-semibold text-lg mb-4">Sector Progress</h3>
        <div className="space-y-3">
          {sectorProgress.map((s) => (
            <div key={s.sector}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{s.sector}</span>
                <span className="text-[var(--color-text-muted)]">
                  {s.progress}% / {s.target}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${statusColors[s.status]}`}
                  style={{ width: `${Math.min(s.progress, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
