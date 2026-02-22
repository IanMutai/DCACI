"use client";

interface ImpactData {
  policy: string;
  directReduction: number;
  indirectReduction: number;
}

interface ImpactChartProps {
  data: ImpactData[];
  title?: string;
}

export default function ImpactChart({
  data,
  title = "Policy Impact Analysis",
}: ImpactChartProps) {
  const maxTotal = Math.max(
    ...data.map((d) => d.directReduction + d.indirectReduction)
  );

  return (
    <div className="card">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>

      <div className="space-y-4">
        {data.map((item) => {
          const total = item.directReduction + item.indirectReduction;
          const directWidth = (item.directReduction / maxTotal) * 100;
          const indirectWidth = (item.indirectReduction / maxTotal) * 100;

          return (
            <div key={item.policy}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium truncate mr-4">{item.policy}</span>
                <span className="text-[var(--color-text-muted)] whitespace-nowrap">
                  {total.toFixed(1)} MtCO2e
                </span>
              </div>
              <div className="flex h-6 rounded-md overflow-hidden bg-gray-100">
                <div
                  className="bg-green-500 transition-all"
                  style={{ width: `${directWidth}%` }}
                  title={`Direct: ${item.directReduction} MtCO2e`}
                />
                <div
                  className="bg-green-300 transition-all"
                  style={{ width: `${indirectWidth}%` }}
                  title={`Indirect: ${item.indirectReduction} MtCO2e`}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex gap-6 justify-center text-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-500" />
          <span>Direct Reduction</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-green-300" />
          <span>Indirect Reduction</span>
        </div>
      </div>
    </div>
  );
}
