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
      reportType: "BTR",
      chapter: "Chapter II - National GHG Inventory",
      inventoryYear: parseInt(year, 10),
      status: "in_progress",
      lastGenerated: "2024-12-14T16:00:00Z",
      sections: [
        { id: 1, title: "National GHG Inventory", status: "in_progress" },
        { id: 2, title: "Emission Trends", status: "draft" },
        { id: 3, title: "Common Tabular Formats (CTFs)", status: "pending" },
        { id: 4, title: "Methods and Data Sources", status: "draft" },
        { id: 5, title: "Key Categories", status: "pending" },
        { id: 6, title: "Uncertainty Assessment", status: "pending" },
        { id: 7, title: "QA/QC and Verification", status: "pending" },
        { id: 8, title: "Recalculations and Improvements", status: "pending" },
      ],
      ctfTables: {
        summary1: "Summary table - National totals",
        summary2: "Summary table - Trends",
        sectoral: "Sectoral background tables",
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
    const { year, sections, format, includeCtf } = body;

    return jsonResponse({
      success: true,
      data: {
        jobId: `btr-${Date.now()}`,
        reportType: "BTR",
        chapter: "Chapter II",
        inventoryYear: year || 2024,
        sections: sections || "all",
        format: format || "pdf",
        includeCtf: includeCtf !== false,
        status: "generating",
        startedAt: new Date().toISOString(),
        estimatedCompletion: "3-7 minutes",
      },
    }, 202);
  } catch {
    return jsonResponse(
      { success: false, error: "Invalid request body" },
      400
    );
  }
}
