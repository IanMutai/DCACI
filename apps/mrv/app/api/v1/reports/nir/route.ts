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
      reportType: "NIR",
      inventoryYear: parseInt(year, 10),
      status: "in_progress",
      lastGenerated: "2024-12-15T10:00:00Z",
      chapters: [
        { id: 1, title: "Executive Summary", status: "complete", pages: 12 },
        { id: 2, title: "National Circumstances", status: "complete", pages: 25 },
        { id: 3, title: "Energy (CRF Sector 1)", status: "in_progress", pages: 45 },
        { id: 4, title: "IPPU (CRF Sector 2)", status: "in_progress", pages: 30 },
        { id: 5, title: "Agriculture (CRF Sector 3)", status: "draft", pages: 35 },
        { id: 6, title: "LULUCF (CRF Sector 4)", status: "draft", pages: 40 },
        { id: 7, title: "Waste (CRF Sector 5)", status: "pending", pages: 0 },
        { id: 8, title: "Cross-cutting: Recalculations", status: "pending", pages: 0 },
        { id: 9, title: "Cross-cutting: QA/QC", status: "pending", pages: 0 },
        { id: 10, title: "Cross-cutting: Uncertainty", status: "pending", pages: 0 },
      ],
      totalPages: 187,
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
    const { year, chapters, format } = body;

    return jsonResponse({
      success: true,
      data: {
        jobId: `nir-${Date.now()}`,
        reportType: "NIR",
        inventoryYear: year || 2024,
        chapters: chapters || "all",
        format: format || "pdf",
        status: "generating",
        startedAt: new Date().toISOString(),
        estimatedCompletion: "2-5 minutes",
      },
    }, 202);
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid request body" },
      400
    );
  }
}
