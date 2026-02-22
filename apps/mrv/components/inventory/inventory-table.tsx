"use client";

import { InventoryStatusBadge } from "./inventory-status-badge";

export type InventoryStatus =
  | "draft"
  | "in_progress"
  | "submitted"
  | "under_review"
  | "approved"
  | "published";

interface Inventory {
  year: number;
  status: InventoryStatus;
  lastUpdated: string;
  completeness: number;
}

interface InventoryTableProps {
  inventories: Inventory[];
}

export function InventoryTable({ inventories }: InventoryTableProps) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50 text-left text-sm text-gray-500">
            <th className="px-6 py-3 font-medium">Year</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Completeness</th>
            <th className="px-6 py-3 font-medium">Last Updated</th>
            <th className="px-6 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.year} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                <a
                  href={`/inventory/${inventory.year}`}
                  className="text-sm font-semibold text-green-700 hover:text-green-800"
                >
                  {inventory.year}
                </a>
              </td>
              <td className="px-6 py-4">
                <InventoryStatusBadge status={inventory.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${inventory.completeness}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">
                    {inventory.completeness}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {inventory.lastUpdated}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <a
                    href={`/inventory/${inventory.year}`}
                    className="text-sm text-green-600 hover:text-green-800"
                  >
                    View
                  </a>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
