"use client";

interface Policy {
  id: string;
  name: string;
  type: "mitigation" | "adaptation" | "cross-cutting";
  sector: string;
  status: "planned" | "implemented" | "under-review";
  estimatedReduction: number;
  costEstimate: number;
}

interface PolicyTableProps {
  policies: Policy[];
  onRowClick?: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  planned: "bg-gray-100 text-gray-700",
  implemented: "bg-green-100 text-green-800",
  "under-review": "bg-amber-100 text-amber-800",
};

const typeStyles: Record<string, string> = {
  mitigation: "bg-blue-100 text-blue-700",
  adaptation: "bg-purple-100 text-purple-700",
  "cross-cutting": "bg-teal-100 text-teal-700",
};

export default function PolicyTable({ policies, onRowClick }: PolicyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="text-left py-3 px-4 font-medium text-[var(--color-text-muted)]">
              Policy/Measure
            </th>
            <th className="text-left py-3 px-4 font-medium text-[var(--color-text-muted)]">
              Type
            </th>
            <th className="text-left py-3 px-4 font-medium text-[var(--color-text-muted)]">
              Sector
            </th>
            <th className="text-right py-3 px-4 font-medium text-[var(--color-text-muted)]">
              Est. Reduction (MtCO2e)
            </th>
            <th className="text-right py-3 px-4 font-medium text-[var(--color-text-muted)]">
              Cost (M USD)
            </th>
            <th className="text-center py-3 px-4 font-medium text-[var(--color-text-muted)]">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <tr
              key={policy.id}
              className={`border-b border-[var(--color-border)] hover:bg-gray-50 ${
                onRowClick ? "cursor-pointer" : ""
              }`}
              onClick={() => onRowClick?.(policy.id)}
            >
              <td className="py-3 px-4 font-medium">{policy.name}</td>
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    typeStyles[policy.type]
                  }`}
                >
                  {policy.type}
                </span>
              </td>
              <td className="py-3 px-4">{policy.sector}</td>
              <td className="py-3 px-4 text-right text-green-600">
                {policy.estimatedReduction}
              </td>
              <td className="py-3 px-4 text-right">${policy.costEstimate}M</td>
              <td className="py-3 px-4 text-center">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    statusStyles[policy.status]
                  }`}
                >
                  {policy.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {policies.length === 0 && (
        <div className="text-center py-8 text-[var(--color-text-muted)]">
          No policies found
        </div>
      )}
    </div>
  );
}
