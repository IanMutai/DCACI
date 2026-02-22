import type { InventoryStatus } from "./inventory-table";

interface InventoryStatusBadgeProps {
  status: InventoryStatus;
}

const statusConfig: Record<
  InventoryStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-gray-100 text-gray-700",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-yellow-100 text-yellow-700",
  },
  submitted: {
    label: "Submitted",
    className: "bg-blue-100 text-blue-700",
  },
  under_review: {
    label: "Under Review",
    className: "bg-purple-100 text-purple-700",
  },
  approved: {
    label: "Approved",
    className: "bg-green-100 text-green-700",
  },
  published: {
    label: "Published",
    className: "bg-emerald-100 text-emerald-700",
  },
};

export function InventoryStatusBadge({ status }: InventoryStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${config.className}`}
    >
      {config.label}
    </span>
  );
}
