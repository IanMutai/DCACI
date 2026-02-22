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

const activityDataRecords = [
  { id: "ad-001", categoryCode: "1.A.1", description: "Electricity generation - Coal", value: 15200.0, unit: "TJ", year: 2024, source: "National Statistics Bureau", status: "verified" },
  { id: "ad-002", categoryCode: "1.A.3", description: "Road transport - Diesel", value: 8400.0, unit: "TJ", year: 2024, source: "Ministry of Transport", status: "verified" },
  { id: "ad-003", categoryCode: "1.A.3", description: "Road transport - Gasoline", value: 6200.0, unit: "TJ", year: 2024, source: "Ministry of Transport", status: "pending" },
  { id: "ad-004", categoryCode: "3.A", description: "Dairy cattle population", value: 3500000, unit: "heads", year: 2024, source: "Ministry of Agriculture", status: "verified" },
  { id: "ad-005", categoryCode: "3.A", description: "Non-dairy cattle population", value: 12000000, unit: "heads", year: 2024, source: "Ministry of Agriculture", status: "pending" },
  { id: "ad-006", categoryCode: "5.A", description: "Municipal solid waste disposed", value: 4500.0, unit: "Gg", year: 2024, source: "National Environment Agency", status: "draft" },
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
  const category = searchParams.get("category");
  const year = searchParams.get("year");
  const status = searchParams.get("status");

  let filtered = [...activityDataRecords];

  if (category) {
    filtered = filtered.filter((r) => r.categoryCode.startsWith(category));
  }
  if (year) {
    filtered = filtered.filter((r) => r.year === parseInt(year, 10));
  }
  if (status) {
    filtered = filtered.filter((r) => r.status === status);
  }

  return jsonResponse({
    success: true,
    data: { records: filtered, total: filtered.length },
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
    const { categoryCode, description, value, unit, year, source } = body;

    if (!categoryCode || !description || value === undefined || !unit || !year) {
      return jsonResponse(
        { success: false, error: "Missing required fields: categoryCode, description, value, unit, year" },
        400
      );
    }

    const newRecord = {
      id: `ad-${Date.now()}`,
      categoryCode,
      description,
      value,
      unit,
      year,
      source: source || "Manual Entry",
      status: "draft",
      createdAt: new Date().toISOString(),
      tenantId,
    };

    return jsonResponse({ success: true, data: newRecord }, 201);
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid request body" },
      400
    );
  }
}
