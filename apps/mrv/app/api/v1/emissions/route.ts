import { NextRequest, NextResponse } from "next/server";

function getTenantId(request: NextRequest): string | null {
  return (
    request.headers.get("x-tenant-id") ||
    request.headers.get("x-api-key") ||
    null
  );
}

function jsonResponse(data: { success: boolean; data?: unknown; error?: string }, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET(request: NextRequest) {
  const tenantId = getTenantId(request);
  if (!tenantId) {
    return jsonResponse(
      { success: false, error: "Missing X-Tenant-Id or X-API-Key header" },
      401
    );
  }

  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const sector = searchParams.get("sector");
  const gas = searchParams.get("gas");

  const timeSeries = [
    { year: 2020, totalWithLULUCF: 185200.3, totalWithoutLULUCF: 196500.5 },
    { year: 2021, totalWithLULUCF: 190100.8, totalWithoutLULUCF: 201400.2 },
    { year: 2022, totalWithLULUCF: 195400.2, totalWithoutLULUCF: 207100.8 },
    { year: 2023, totalWithLULUCF: 198700.6, totalWithoutLULUCF: 210500.4 },
    { year: 2024, totalWithLULUCF: 201801.5, totalWithoutLULUCF: 214101.7 },
  ];

  const latestYear = year ? parseInt(year, 10) : 2024;

  const response: Record<string, unknown> = {
    inventoryYear: latestYear,
    unit: "Gg CO2 eq",
    totalEmissionsWithLULUCF: 201801.5,
    totalEmissionsWithoutLULUCF: 214101.7,
    bySector: {
      "1_energy": 125400.5,
      "2_ippu": 34200.3,
      "3_agriculture": 45600.8,
      "4_lulucf": -12300.2,
      "5_waste": 8900.1,
    },
    byGas: {
      CO2: 134200.1,
      CH4: 46700.4,
      N2O: 14800.2,
      HFCs: 4200.3,
      PFCs: 1200.1,
      SF6: 700.4,
    },
    timeSeries,
    perCapita: {
      totalEmissions: 3.8,
      unit: "t CO2 eq/capita",
      population: 53100000,
    },
    gdpIntensity: {
      totalEmissions: 0.18,
      unit: "kg CO2 eq/USD GDP",
      gdp: 1120000000000,
    },
  };

  if (sector) {
    response.filter = { sector };
  }
  if (gas) {
    response.filter = { ...(response.filter as object || {}), gas };
  }

  return jsonResponse({ success: true, data: response });
}
