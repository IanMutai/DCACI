"use client";

interface TargetCardProps {
  id: string;
  name: string;
  type: string;
  sector: string;
  baseYear: number;
  targetYear: number;
  reductionPercent: number;
  status: "draft" | "active" | "achieved" | "off-track";
  currentProgress?: number;
}

const statusStyles: Record<string, { badge: string; color: string }> = {
  draft: { badge: "bg-gray-100 text-gray-700", color: "bg-gray-400" },
  active: { badge: "bg-green-100 text-green-800", color: "bg-green-500" },
  achieved: { badge: "bg-blue-100 text-blue-800", color: "bg-blue-500" },
  "off-track": { badge: "bg-red-100 text-red-800", color: "bg-red-500" },
};

export default function TargetCard({
  id,
  name,
  type,
  sector,
  baseYear,
  targetYear,
  reductionPercent,
  status,
  currentProgress = 0,
}: TargetCardProps) {
  const styles = statusStyles[status] ?? statusStyles["draft"]!;

  return (
    <a
      href={`/targets/${id}`}
      className="card group hover:shadow-md transition-shadow block"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg group-hover:text-[var(--color-primary)] transition-colors">
            {name}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {sector} | {baseYear} - {targetYear}
          </p>
        </div>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles.badge}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-[var(--color-text-muted)]">Progress</span>
          <span className="font-medium">
            {currentProgress}% / {reductionPercent}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all ${styles.color}`}
            style={{
              width: `${Math.min((currentProgress / reductionPercent) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-3 flex gap-3 text-xs text-[var(--color-text-muted)]">
        <span className="capitalize">Type: {type}</span>
        <span>Reduction: {reductionPercent}%</span>
      </div>
    </a>
  );
}
