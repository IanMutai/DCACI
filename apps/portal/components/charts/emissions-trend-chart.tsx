"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";

// Kenya GHG emissions excl. LULUCF (MtCO2e)
// Sources: PRIMAP-hist v2.6 HISTCR, Climate Watch, Kenya NC3, NCCAP 2018-2022
const historicalData = [
  { year: 1990, actual: 28.5 },
  { year: 1992, actual: 28.0 },
  { year: 1995, actual: 31.0 },
  { year: 1998, actual: 32.8 },
  { year: 2000, actual: 34.0 },
  { year: 2002, actual: 35.0 },
  { year: 2005, actual: 39.0 },
  { year: 2007, actual: 42.0 },
  { year: 2010, actual: 62.0 },
  { year: 2012, actual: 63.0 },
  { year: 2015, actual: 67.7 },
  { year: 2017, actual: 73.1 },
  { year: 2018, actual: 75.8 },
  { year: 2019, actual: 81.0 },
  { year: 2020, actual: 82.0 },
  { year: 2021, actual: 82.3 },
  { year: 2022, actual: 94.9 },
];

// NDC BAU & target projections
const projectionData = [
  { year: 2022, actual: 94.9, bau: 100 },
  { year: 2025, bau: 120, unconditional: 112, conditional: 96 },
  { year: 2030, bau: 143, unconditional: 133, conditional: 97 },
  { year: 2035, bau: 215, unconditional: 169, conditional: 118 },
];

const combinedData = [
  ...historicalData.map((d) => ({ ...d })),
  ...projectionData
    .filter((d) => d.year > 2022)
    .map((d) => ({ ...d })),
];

export default function EmissionsTrendChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart
          data={combinedData}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={{ stroke: "#cbd5e1" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            tickLine={{ stroke: "#cbd5e1" }}
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
                actual: "Actual Emissions",
                bau: "BAU Projection",
                unconditional: "Unconditional Target (7%)",
                conditional: "Conditional Target (32%)",
              };
              return [value ? `${value} MtCO2e` : "—", labels[name] || name];
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            formatter={(value) => {
              const labels: Record<string, string> = {
                actual: "Actual (PRIMAP-hist v2.6)",
                bau: "BAU Projection",
                unconditional: "Unconditional (−7%)",
                conditional: "Conditional (−32%)",
              };
              return labels[value] || value;
            }}
          />
          <ReferenceLine
            x={2022}
            stroke="#94a3b8"
            strokeDasharray="4 4"
            label={{
              value: "2022",
              position: "top",
              style: { fontSize: 10, fill: "#94a3b8" },
            }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#0f766e"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#0f766e" }}
            activeDot={{ r: 5 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="bau"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={{ r: 3, fill: "#ef4444" }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="unconditional"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: "#f59e0b" }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="conditional"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: "#3b82f6" }}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-slate-400 mt-2 text-right">
        Sources: PRIMAP-hist v2.6 HISTCR, Kenya Updated NDC (2020), Second NDC (2025), Climate Action Tracker
      </p>
    </div>
  );
}
