import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
  const inventoryYear = searchParams.get("year");

  if (!inventoryYear) {
    return jsonResponse(
      { success: false, error: "Missing required 'year' query parameter" },
      400
    );
  }

  const yearNum = parseInt(inventoryYear, 10);

  try {
    const tenantConfig = await prisma.tenantConfig.findUnique({
      where: { portalTenantId: tenantId },
    });

    if (!tenantConfig) {
      return jsonResponse(
        { success: false, error: "Tenant configuration not found" },
        404
      );
    }

    const inventory = await prisma.inventory.findUnique({
      where: {
        tenantConfigId_year: {
          tenantConfigId: tenantConfig.id,
          year: yearNum,
        },
      },
      include: {
        sectorData: {
          include: {
            categories: {
              select: {
                categoryCode: true,
                categoryName: true,
                totalCO2eq: true,
              },
            },
          },
          orderBy: { sectorCode: "asc" },
        },
      },
    });

    if (!inventory) {
      return jsonResponse(
        { success: false, error: `Inventory for year ${yearNum} not found` },
        404
      );
    }

    const sectors = inventory.sectorData.map((s) => ({
      code: s.sectorCode,
      name: s.sectorName,
      co2Emissions: s.co2Emissions,
      ch4Emissions: s.ch4Emissions,
      n2oEmissions: s.n2oEmissions,
      hfcEmissions: s.hfcEmissions,
      pfcEmissions: s.pfcEmissions,
      sf6Emissions: s.sf6Emissions,
      nf3Emissions: s.nf3Emissions,
      totalCO2eq: s.totalCO2eq,
      categories: s.categories.map((c) => ({
        code: c.categoryCode,
        name: c.categoryName,
        totalCO2eq: c.totalCO2eq,
      })),
    }));

    const totalEmissions = sectors.reduce((sum, s) => sum + s.totalCO2eq, 0);

    return jsonResponse({
      success: true,
      data: {
        inventoryYear: yearNum,
        sectors,
        totalEmissions,
        unit: "Gg CO2 eq",
      },
    });
  } catch (error) {
    console.error("GET /api/v1/sectors error:", error);
    return jsonResponse({ success: false, error: "Failed to fetch sectors" }, 500);
  }
}
