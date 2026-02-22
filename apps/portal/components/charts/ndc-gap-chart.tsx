"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// NDC progress: actual vs BAU vs targets
// Sources: Updated NDC (2020), Second NDC (2025), PRIMAP-hist v2.6, Climate Action Tracker
const gapData = [
  { year: 2015, actual: 67.7, bau: 73 },
  { year: 2018, actual: 75.8, bau: 85 },
  { year: 2020, actual: 82.0, bau: 95 },
  { year: 2022, actual: 94.9, bau: 100 },
  { year: 2025, bau: 120, unconditional: 112, conditional: 96 },
  { year: 2030, bau: 143, unconditional: 133, conditional: 97 },
];

export default function NdcGapChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={gapData}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorBau" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f766e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#64748b" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            domain={[60, 160]}
            label={{
              value: "MtCO2e",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 11, fill: "#94a3b8" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: 12,
            }}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                bau: "BAU Baseline",
                actual: "Actual Emissions",
                unconditional: "Unconditional (−7%)",
                conditional: "Conditional (−32%)",
              };
              return value
                ? [`${value} MtCO2e`, labels[name] || name]
                : [null, null];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            formatter={(value) => {
              const labels: Record<string, string> = {
                bau: "BAU Projection",
                actual: "Actual Emissions",
                unconditional: "Unconditional Target (−7%)",
                conditional: "Conditional Target (−32%)",
              };
              return labels[value] || value;
            }}
          />
          <Area
            type="monotone"
            dataKey="bau"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="6 4"
            fill="url(#colorBau)"
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#0f766e"
            strokeWidth={2.5}
            fill="url(#colorActual)"
            connectNulls
            dot={{ r: 4, fill: "#0f766e" }}
          />
          <Area
            type="monotone"
            dataKey="unconditional"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="4 3"
            fill="transparent"
            connectNulls
            dot={{ r: 3, fill: "#f59e0b" }}
          />
          <Area
            type="monotone"
            dataKey="conditional"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="4 3"
            fill="transparent"
            connectNulls
            dot={{ r: 3, fill: "#3b82f6" }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-between mt-2">
        <div className="flex gap-4 text-[10px] text-slate-500">
          <span>Gap to unconditional: <strong className="text-amber-600">~10 MtCO2e</strong></span>
          <span>Gap to conditional: <strong className="text-blue-600">~46 MtCO2e</strong></span>
        </div>
        <p className="text-[10px] text-slate-400">
          Source: Updated NDC (2020), Climate Action Tracker
        </p>
      </div>
    </div>
  );
}
