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
      method: "IPCC Approach 1",
      threshold: 95,
      categories: [
        { rank: 1, code: "1.A.1", name: "Energy Industries", levelAssessment: 42.3, trendAssessment: 38.1, isKey: true },
        { rank: 2, code: "1.A.3", name: "Transport", levelAssessment: 15.2, trendAssessment: 22.4, isKey: true },
        { rank: 3, code: "3.A", name: "Enteric Fermentation", levelAssessment: 12.1, trendAssessment: 8.5, isKey: true },
        { rank: 4, code: "2.A.1", name: "Cement Production", levelAssessment: 8.4, trendAssessment: 12.3, isKey: true },
        { rank: 5, code: "4.A", name: "Forest Land", levelAssessment: 7.2, trendAssessment: 6.8, isKey: true },
        { rank: 6, code: "1.A.2", name: "Manufacturing Industries", levelAssessment: 5.1, trendAssessment: 4.2, isKey: true },
        { rank: 7, code: "3.D", name: "Agricultural Soils", levelAssessment: 3.8, trendAssessment: 3.1, isKey: false },
        { rank: 8, code: "5.A", name: "Solid Waste Disposal", levelAssessment: 2.4, trendAssessment: 2.0, isKey: false },
      ],
      summary: {
        totalKeyCategories: 6,
        cumulativeLevelCoverage: 90.3,
        cumulativeTrendCoverage: 92.3,
      },
    },
  });
}
