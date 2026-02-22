"use client";

const summaryData = {
  totalWithLULUCF: 201801.5,
  totalWithoutLULUCF: 214101.7,
  byGas: [
    { gas: "CO2", value: 134200.1, percentage: 66.5 },
    { gas: "CH4", value: 46700.4, percentage: 23.1 },
    { gas: "N2O", value: 14800.2, percentage: 7.3 },
    { gas: "HFCs", value: 4200.3, percentage: 2.1 },
    { gas: "PFCs", value: 1200.1, percentage: 0.6 },
    { gas: "SF6", value: 700.4, percentage: 0.4 },
  ],
};

export function EmissionSummary() {
  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Emission Summary
      </h3>

      <div className="space-y-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-sm text-green-700">Total (with LULUCF)</p>
          <p className="text-xl font-bold text-green-900">
            {summaryData.totalWithLULUCF.toLocaleString()} Gg CO2 eq
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-700">Total (without LULUCF)</p>
          <p className="text-xl font-bold text-blue-900">
            {summaryData.totalWithoutLULUCF.toLocaleString()} Gg CO2 eq
          </p>
        </div>
      </div>

      <h4 className="text-sm font-semibold text-gray-700 mb-3">By Gas</h4>
      <div className="space-y-2">
        {summaryData.byGas.map((gasData) => (
          <div key={gasData.gas} className="flex items-center gap-3">
            <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full w-12 text-center">
              {gasData.gas}
            </span>
            <div className="flex-1">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${gasData.percentage}%` }}
                />
              </div>
            </div>
            <span className="text-xs text-gray-600 w-20 text-right">
              {gasData.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
