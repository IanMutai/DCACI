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
  ReferenceLine,
} from "recharts";

// Kenya climate finance flows (USD millions)
// Sources: CPI Landscape of Climate Finance (2018 confirmed), estimates for other years
const financeData = [
  { year: "2015", public: 500, private: 700 },
  { year: "2016", public: 600, private: 800 },
  { year: "2017", public: 750, private: 1050 },
  { year: "2018", public: 760, private: 1640 },
  { year: "2019", public: 850, private: 1350 },
  { year: "2020", public: 800, private: 1000 },
  { year: "2021", public: 900, private: 1100 },
  { year: "2022", public: 1100, private: 1400 },
  { year: "2023", public: 1200, private: 1600 },
  { year: "2024", public: 1500, private: 2000 },
];

export default function ClimateFinanceChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={financeData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#64748b" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            label={{
              value: "USD millions",
              angle: -90,
              position: "insideLeft",
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
              `$${value.toLocaleString()}M`,
              name === "public" ? "Public (Govt + Multilateral)" : "Private (Incl. VCM)",
            ]}
          />
          <Legend
            wrapperStyle={{ fontSize: 11 }}
            formatter={(value) =>
              value === "public"
                ? "Public (Govt + Multilateral)"
                : "Private (Incl. VCM)"
            }
          />
          <ReferenceLine
            y={5130}
            stroke="#ef4444"
            strokeDasharray="4 4"
            label={{
              value: "Annual Need: $5.1B (WB CCDR)",
              position: "insideTopRight",
              style: { fontSize: 10, fill: "#ef4444" },
            }}
          />
          <Bar
            dataKey="public"
            stackId="a"
            fill="#3b82f6"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="private"
            stackId="a"
            fill="#22c55e"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-slate-400 mt-1 text-right">
        Sources: CPI Landscape (2018 confirmed), GCF, World Bank CCDR 2023. Other years estimated.
      </p>
    </div>
  );
}
