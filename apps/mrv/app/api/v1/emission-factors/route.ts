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

const emissionFactors = [
  { id: "ef-001", gas: "CO2", source: "Coal Combustion", factor: 94.6, unit: "kg CO2/GJ", origin: "IPCC 2006", tier: "Tier 1", categoryCode: "1.A" },
  { id: "ef-002", gas: "CO2", source: "Natural Gas Combustion", factor: 56.1, unit: "kg CO2/GJ", origin: "IPCC 2006", tier: "Tier 1", categoryCode: "1.A" },
  { id: "ef-003", gas: "CO2", source: "Diesel Oil Combustion", factor: 74.1, unit: "kg CO2/GJ", origin: "IPCC 2006", tier: "Tier 1", categoryCode: "1.A" },
  { id: "ef-004", gas: "CO2", source: "Gasoline Combustion", factor: 69.3, unit: "kg CO2/GJ", origin: "IPCC 2006", tier: "Tier 1", categoryCode: "1.A" },
  { id: "ef-005", gas: "CH4", source: "Enteric Fermentation - Dairy Cattle", factor: 68.0, unit: "kg CH4/head/yr", origin: "IPCC 2006", tier: "Tier 1", categoryCode: "3.A" },
  { id: "ef-006", gas: "CH4", source: "Enteric Fermentation - Non-Dairy Cattle", factor: 56.0, unit: "kg CH4/head/yr", origin: "IPCC 2006", tier: "Tier 1", categoryCode: "3.A" },
  { id: "ef-007", gas: "N2O", source: "Agricultural Soils - Direct", factor: 0.01, unit: "kg N2O-N/kg N", origin: "IPCC 2006", tier: "Tier 1", categoryCode: "3.D" },
  { id: "ef-008", gas: "CO2", source: "Cement Production", factor: 0.52, unit: "t CO2/t clinker", origin: "IPCC 2006", tier: "Tier 1", categoryCode: "2.A.1" },
];

export async function GET(request: NextRequest) {
  const tenantId = getTenantId(request);
  if (!tenantId) {
    return jsonResponse(
      { success: false, error: "Missing X-Tenant-Id or X-API-Key header" },
      401
    );
  }

  const { searchParams } = new URL(request.url);
  const gas = searchParams.get("gas");
  const category = searchParams.get("category");
  const tier = searchParams.get("tier");

  let filtered = [...emissionFactors];

  if (gas) {
    filtered = filtered.filter((ef) => ef.gas === gas);
  }
  if (category) {
    filtered = filtered.filter((ef) => ef.categoryCode.startsWith(category));
  }
  if (tier) {
    filtered = filtered.filter((ef) => ef.tier === tier);
  }

  return jsonResponse({
    success: true,
    data: { emissionFactors: filtered, total: filtered.length },
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
    const { gas, source, factor, unit, origin, tier, categoryCode } = body;

    if (!gas || !source || factor === undefined || !unit || !categoryCode) {
      return jsonResponse(
        { success: false, error: "Missing required fields: gas, source, factor, unit, categoryCode" },
        400
      );
    }

    const newFactor = {
      id: `ef-${Date.now()}`,
      gas,
      source,
      factor,
      unit,
      origin: origin || "Custom",
      tier: tier || "Tier 1",
      categoryCode,
      createdAt: new Date().toISOString(),
      tenantId,
    };

    return jsonResponse({ success: true, data: newFactor }, 201);
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid request body" },
      400
    );
  }
}
