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
  const year = searchParams.get("year") || "2024";

  return jsonResponse({
    success: true,
    data: {
      inventoryYear: parseInt(year, 10),
      calculationDate: "2024-12-15T14:30:00Z",
      status: "completed",
      results: {
        totalEmissions: 201801.5,
        totalExcludingLULUCF: 214101.7,
        unit: "Gg CO2 eq",
        bySector: {
          energy: { total: 125400.5, CO2: 120300.1, CH4: 3800.2, N2O: 1300.2 },
          ippu: { total: 34200.3, CO2: 28100.5, HFCs: 4200.3, PFCs: 1200.1, SF6: 700.4 },
          agriculture: { total: 45600.8, CH4: 34500.7, N2O: 11100.1 },
          lulucf: { total: -12300.2, CO2: -14200.5, CH4: 1200.2, N2O: 700.1 },
          waste: { total: 8900.1, CH4: 7200.3, N2O: 1700.8 },
        },
        byGas: {
          CO2: 134200.1,
          CH4: 46700.4,
          N2O: 14800.2,
          HFCs: 4200.3,
          PFCs: 1200.1,
          SF6: 700.4,
        },
      },
    },
  });
}

export async function POST(request: NextRequest) {
  const tenantId = getTenantId(request);
  if (!tenantId) {
    return jsonResponse(
      { success: false, error: "Missing X-Tenant-Id or X-API-Key header" },
      401
    );
  }

  try {
    const body = await request.json();
    const { year, sectors, tier } = body;

    if (!year) {
      return jsonResponse(
        { success: false, error: "Missing required field: year" },
        400
      );
    }

    return jsonResponse({
      success: true,
      data: {
        jobId: `calc-${Date.now()}`,
        inventoryYear: year,
        sectors: sectors || ["1", "2", "3", "4", "5"],
        tier: tier || "Tier 1",
        status: "running",
        startedAt: new Date().toISOString(),
        message: "Calculation job started. Poll GET /api/v1/calculations?year=" + year + " for results.",
      },
    }, 202);
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid request body" },
      400
    );
  }
}
