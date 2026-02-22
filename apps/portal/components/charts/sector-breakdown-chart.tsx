"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// PRIMAP-hist v2.6 HISTCR 2022 sector data (MtCO2e, excl. LULUCF)
const sectorData = [
  { name: "Agriculture", value: 44.92, color: "#22c55e" },
  { name: "Energy", value: 40.27, color: "#ef4444" },
  { name: "IPPU", value: 5.96, color: "#3b82f6" },
  { name: "Waste", value: 3.10, color: "#a855f7" },
];

const total = sectorData.reduce((s, d) => s + d.value, 0);

const RADIAN = Math.PI / 180;
function renderLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#475569"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={11}
    >
      {name} ({(percent * 100).toFixed(1)}%)
    </text>
  );
}

export function SectorPieChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={sectorData}
            cx="50%"
            cy="50%"
            outerRadius={95}
            innerRadius={50}
            dataKey="value"
            label={renderLabel}
            labelLine={{ stroke: "#94a3b8", strokeWidth: 1 }}
          >
            {sectorData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value.toFixed(2)} MtCO2e (${((value / total) * 100).toFixed(1)}%)`,
              name,
            ]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: 12,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-slate-500 -mt-2">
        Total: {total.toFixed(1)} MtCO2e excl. LULUCF
      </p>
      <p className="text-[10px] text-slate-400 mt-1 text-center">
        Source: PRIMAP-hist v2.6 HISTCR (2022)
      </p>
    </div>
  );
}

// Sector comparison across years
const sectorHistoryData = [
  { year: "2010", Energy: 25.0, Agriculture: 30.5, IPPU: 3.3, Waste: 2.0 },
  { year: "2015", Energy: 30.2, Agriculture: 34.0, IPPU: 3.5, Waste: 2.4 },
  { year: "2018", Energy: 34.5, Agriculture: 37.0, IPPU: 4.3, Waste: 2.6 },
  { year: "2020", Energy: 35.0, Agriculture: 40.0, IPPU: 4.8, Waste: 2.8 },
  { year: "2022", Energy: 40.27, Agriculture: 44.92, IPPU: 5.96, Waste: 3.10 },
];

const sectorColors = {
  Energy: "#ef4444",
  Agriculture: "#22c55e",
  IPPU: "#3b82f6",
  Waste: "#a855f7",
};

export function SectorStackedBarChart() {
  return (
    <div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={sectorHistoryData}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12, fill: "#64748b" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
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
            formatter={(value: number) => [`${value} MtCO2e`]}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {Object.entries(sectorColors).map(([key, color]) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={color}
              radius={key === "Waste" ? [4, 4, 0, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-slate-400 mt-1 text-right">
        Sources: PRIMAP-hist v2.6, NCCAP 2018-2022, Climate Watch
      </p>
    </div>
  );
}
