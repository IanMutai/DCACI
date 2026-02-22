"use client";

interface QAQCCheck {
  id: number;
  name: string;
  description: string;
  status: string;
  lastRun: string;
  severity: string;
}

interface CheckListProps {
  checks: QAQCCheck[];
}

export function CheckList({ checks }: CheckListProps) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Check Results</h2>
      </div>
      <div className="divide-y">
        {checks.map((check) => (
          <div key={check.id} className="px-6 py-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    check.status === "passed"
                      ? "bg-green-500"
                      : check.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
                <h3 className="text-sm font-medium text-gray-900">
                  {check.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    check.severity === "high"
                      ? "bg-red-100 text-red-700"
                      : check.severity === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {check.severity}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    check.status === "passed"
                      ? "bg-green-100 text-green-700"
                      : check.status === "warning"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {check.status}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 ml-5.5">{check.description}</p>
            <p className="text-xs text-gray-400 ml-5.5 mt-1">
              Last run: {check.lastRun}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
