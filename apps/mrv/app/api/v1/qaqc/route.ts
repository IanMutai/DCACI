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

const qaqcRecords = [
  { id: "qc-001", name: "Completeness Check", type: "automated", status: "passed", severity: "high", lastRun: "2024-12-15T10:00:00Z", details: "All required categories have data entries" },
  { id: "qc-002", name: "Time Series Consistency", type: "automated", status: "warning", severity: "medium", lastRun: "2024-12-15T10:00:00Z", details: "Category 1.A.3 shows >20% variation from previous year" },
  { id: "qc-003", name: "Emission Factor Range", type: "automated", status: "passed", severity: "high", lastRun: "2024-12-15T10:00:00Z", details: "All emission factors within IPCC default ranges" },
  { id: "qc-004", name: "Unit Consistency", type: "automated", status: "passed", severity: "medium", lastRun: "2024-12-15T10:00:00Z", details: "Units consistent across all categories" },
  { id: "qc-005", name: "Cross-Sector Validation", type: "automated", status: "failed", severity: "high", lastRun: "2024-12-15T10:00:00Z", details: "Energy balance discrepancy detected between 1.A and reference approach" },
  { id: "qc-006", name: "Energy Sector Expert Review", type: "manual", status: "completed", severity: "high", lastRun: "2024-12-10T14:00:00Z", details: "Reviewed by Dr. Amina K. No significant issues found." },
  { id: "qc-007", name: "IPPU Sector Expert Review", type: "manual", status: "in_progress", severity: "high", lastRun: "2024-12-12T09:00:00Z", details: "Under review by J. Ochieng" },
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
  const type = searchParams.get("type");
  const status = searchParams.get("status");

  let filtered = [...qaqcRecords];

  if (type) {
    filtered = filtered.filter((r) => r.type === type);
  }
  if (status) {
    filtered = filtered.filter((r) => r.status === status);
  }

  const summary = {
    passed: qaqcRecords.filter((r) => r.status === "passed" || r.status === "completed").length,
    warnings: qaqcRecords.filter((r) => r.status === "warning").length,
    failed: qaqcRecords.filter((r) => r.status === "failed").length,
    inProgress: qaqcRecords.filter((r) => r.status === "in_progress").length,
  };

  return jsonResponse({
    success: true,
    data: { records: filtered, total: filtered.length, summary },
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
    const { name, type, checkType } = body;

    if (!name) {
      return jsonResponse(
        { success: false, error: "Missing required field: name" },
        400
      );
    }

    const newCheck = {
      id: `qc-${Date.now()}`,
      name,
      type: type || "automated",
      checkType: checkType || "general",
      status: "running",
      severity: "medium",
      startedAt: new Date().toISOString(),
      tenantId,
    };

    return jsonResponse({ success: true, data: newCheck }, 201);
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid request body" },
      400
    );
  }
}
