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

const categoryData: Record<string, object> = {
  "1.A": {
    code: "1.A",
    name: "Fuel Combustion Activities",
    sectorCode: "1",
    emissions: 95200.3,
    unit: "Gg CO2 eq",
    gases: { CO2: 92100.1, CH4: 1800.2, N2O: 1300.0 },
    methodology: "Tier 2",
    subcategories: [
      { code: "1.A.1", name: "Energy Industries", emissions: 42100.1 },
      { code: "1.A.2", name: "Manufacturing Industries and Construction", emissions: 18500.4 },
      { code: "1.A.3", name: "Transport", emissions: 28300.6 },
      { code: "1.A.4", name: "Other Sectors", emissions: 6300.2 },
    ],
  },
  "1.B": {
    code: "1.B",
    name: "Fugitive Emissions from Fuels",
    sectorCode: "1",
    emissions: 30200.2,
    unit: "Gg CO2 eq",
    gases: { CO2: 8100.0, CH4: 22100.2 },
    methodology: "Tier 1",
    subcategories: [
      { code: "1.B.1", name: "Solid Fuels", emissions: 12100.1 },
      { code: "1.B.2", name: "Oil and Natural Gas", emissions: 18100.1 },
    ],
  },
  "3.A": {
    code: "3.A",
    name: "Enteric Fermentation",
    sectorCode: "3",
    emissions: 22300.4,
    unit: "Gg CO2 eq",
    gases: { CH4: 22300.4 },
    methodology: "Tier 1",
    activityData: {
      dairyCattle: { value: 3500000, unit: "heads" },
      nonDairyCattle: { value: 12000000, unit: "heads" },
      sheep: { value: 8000000, unit: "heads" },
      goats: { value: 15000000, unit: "heads" },
    },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const tenantId = getTenantId(request);
  if (!tenantId) {
    return jsonResponse(
      { success: false, error: "Missing X-Tenant-Id or X-API-Key header" },
      401
    );
  }

  const { code } = await params;
  const decodedCode = decodeURIComponent(code);
  const category = categoryData[decodedCode];

  if (!category) {
    return jsonResponse(
      { success: false, error: `Category with code '${decodedCode}' not found` },
      404
    );
  }

  return jsonResponse({ success: true, data: category });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const tenantId = getTenantId(request);
  if (!tenantId) {
    return jsonResponse(
      { success: false, error: "Missing X-Tenant-Id or X-API-Key header" },
      401
    );
  }

  const { code } = await params;
  const decodedCode = decodeURIComponent(code);
  const category = categoryData[decodedCode];

  if (!category) {
    return jsonResponse(
      { success: false, error: `Category with code '${decodedCode}' not found` },
      404
    );
  }

  try {
    const body = await request.json();
    return jsonResponse({
      success: true,
      data: { ...category, ...body, lastUpdated: new Date().toISOString() },
    });
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid request body" },
      400
    );
  }
}
