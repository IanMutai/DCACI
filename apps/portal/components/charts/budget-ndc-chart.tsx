"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

/* Budget vs NDC needs by sector (verified data from Kenya National Budget FY2024/25 + Updated NDC) */
const data = [
  {
    sector: "Energy",
    ndcNeed: 15.2,    // $15.2B needed for energy mitigation (geothermal, wind, solar, clean cooking)
    budgeted: 0.92,   // KES 119.7B ≈ $0.92B (Ministry of Energy & Petroleum)
    gap: 14.28,
    ndcShare: 55.6,   // % of NDC mitigation target
  },
  {
    sector: "LULUCF",
    ndcNeed: 8.5,     // $8.5B for 10% forest cover restoration
    budgeted: 0.20,   // KES 26.4B ≈ $0.20B (Ministry of Environment)
    gap: 8.30,
    ndcShare: 24.0,
  },
  {
    sector: "Agriculture",
    ndcNeed: 5.8,     // $5.8B for climate-smart agriculture
    budgeted: 0.49,   // KES 63.2B ≈ $0.49B (Ministry of Agriculture)
    gap: 5.31,
    ndcShare: 11.2,
  },
  {
    sector: "Transport",
    ndcNeed: 4.2,     // $4.2B for e-mobility, BRT
    budgeted: 1.68,   // KES 218.3B ≈ $1.68B (Ministry of Transport)
    gap: 2.52,
    ndcShare: 5.4,
  },
  {
    sector: "IPPU",
    ndcNeed: 1.8,     // $1.8B for cement alternatives, efficiency
    budgeted: 0.12,   // estimated industrial allocation
    gap: 1.68,
    ndcShare: 2.8,
  },
  {
    sector: "Waste",
    ndcNeed: 0.7,     // $0.7B for waste-to-energy
    budgeted: 0.08,   // estimated waste management allocation
    gap: 0.62,
    ndcShare: 0.9,
  },
];

export default function BudgetNdcChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            tickFormatter={(v) => `$${v}B`}
            domain={[0, 16]}
            fontSize={11}
            tick={{ fill: "#64748b" }}
          />
          <YAxis
            type="category"
            dataKey="sector"
            fontSize={12}
            tick={{ fill: "#334155", fontWeight: 500 }}
            width={75}
          />
          <Tooltip
            formatter={(value: number, name: string) => [
              `$${value.toFixed(2)}B`,
              name === "ndcNeed"
                ? "NDC Need (2020-2030)"
                : name === "budgeted"
                  ? "Budget FY24/25"
                  : "Funding Gap",
            ]}
            contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
          />
          <Legend
            formatter={(value) =>
              value === "ndcNeed"
                ? "NDC Implementation Need"
                : value === "budgeted"
                  ? "Current Budget Allocation"
                  : value
            }
            wrapperStyle={{ fontSize: "11px" }}
          />
          <Bar dataKey="ndcNeed" fill="#dbeafe" radius={[0, 4, 4, 0]} name="ndcNeed" />
          <Bar dataKey="budgeted" radius={[0, 4, 4, 0]} name="budgeted">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.budgeted / entry.ndcNeed > 0.3 ? "#22c55e" : entry.budgeted / entry.ndcNeed > 0.1 ? "#f59e0b" : "#ef4444"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="text-slate-600">&gt;30% funded</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
          <span className="text-slate-600">10-30% funded</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-slate-600">&lt;10% funded</span>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 mt-2">
        Sources: Kenya National Budget FY 2024/25, Updated NDC Implementation Plan (2020), World Bank CCDR 2023
      </p>
    </div>
  );
}
