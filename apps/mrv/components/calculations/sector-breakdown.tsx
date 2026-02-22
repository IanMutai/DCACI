"use client";

const sectorData = [
  { name: "Energy", code: "1", emissions: 125400.5, color: "bg-red-500" },
  { name: "IPPU", code: "2", emissions: 34200.3, color: "bg-orange-500" },
  { name: "Agriculture", code: "3", emissions: 45600.8, color: "bg-yellow-500" },
  { name: "LULUCF", code: "4", emissions: -12300.2, color: "bg-emerald-500" },
  { name: "Waste", code: "5", emissions: 8900.1, color: "bg-blue-500" },
];

export function SectorBreakdown() {
  const totalPositive = sectorData
    .filter((s) => s.emissions > 0)
    .reduce((sum, s) => sum + s.emissions, 0);

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Sector Breakdown
      </h3>

      {/* Simple bar chart placeholder */}
      <div className="space-y-3 mb-6">
        {sectorData.map((sector) => {
          const percentage =
            sector.emissions > 0
              ? (sector.emissions / totalPositive) * 100
              : 0;
          const isNegative = sector.emissions < 0;

          return (
            <div key={sector.code}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">
                  {sector.code}. {sector.name}
                </span>
                <span
                  className={`text-sm font-mono ${isNegative ? "text-emerald-700" : "text-gray-900"}`}
                >
                  {sector.emissions.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                {isNegative ? (
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{
                      width: `${(Math.abs(sector.emissions) / totalPositive) * 100}%`,
                    }}
                  />
                ) : (
                  <div
                    className={`h-full ${sector.color} rounded-full`}
                    style={{ width: `${percentage}%` }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t pt-4">
        <p className="text-xs text-gray-500">
          Values in Gg CO2 eq. Negative values indicate net removals (sinks).
          For detailed charts, integrate with a charting library such as
          Recharts or Chart.js.
        </p>
      </div>
    </div>
  );
}
