"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";

// Kenya carbon credit issuance data
// Sources: Berkeley VROD, Allied Offsets, NEMA Carbon Report 2023
const creditData = [
  { year: "2011", issued: 0.5, cumulative: 0.5 },
  { year: "2012", issued: 0.8, cumulative: 1.3 },
  { year: "2013", issued: 1.2, cumulative: 2.5 },
  { year: "2014", issued: 1.5, cumulative: 4.0 },
  { year: "2015", issued: 2.0, cumulative: 6.0 },
  { year: "2016", issued: 3.0, cumulative: 9.0 },
  { year: "2017", issued: 3.5, cumulative: 12.5 },
  { year: "2018", issued: 4.0, cumulative: 16.5 },
  { year: "2019", issued: 4.5, cumulative: 21.0 },
  { year: "2020", issued: 5.0, cumulative: 26.0 },
  { year: "2021", issued: 6.0, cumulative: 32.0 },
  { year: "2022", issued: 11.0, cumulative: 43.0 },
  { year: "2023", issued: 10.0, cumulative: 53.0 },
  { year: "2024", issued: 6.0, cumulative: 59.0 },
];

export default function CarbonCreditsChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart
          data={creditData}
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#64748b" }}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12, fill: "#64748b" }}
            label={{
              value: "Annual (M tCO2e)",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 10, fill: "#94a3b8" },
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12, fill: "#64748b" }}
            label={{
              value: "Cumulative (M)",
              angle: 90,
              position: "insideRight",
              style: { fontSize: 10, fill: "#94a3b8" },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: 12,
            }}
            formatter={(value: number, name: string) => [
              `${value}M tCO2e`,
              name === "issued" ? "Annual Issuance" : "Cumulative",
            ]}
          />
          <Legend
            wrapperStyle={{ fontSize: 11 }}
            formatter={(value) =>
              value === "issued" ? "Annual Issuance" : "Cumulative Total"
            }
          />
          <Bar
            yAxisId="left"
            dataKey="issued"
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
            barSize={28}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cumulative"
            stroke="#0f766e"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#0f766e" }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-slate-400 mt-1 text-right">
        Sources: Berkeley VROD, Allied Offsets, NEMA Carbon Report (2023)
      </p>
    </div>
  );
}
