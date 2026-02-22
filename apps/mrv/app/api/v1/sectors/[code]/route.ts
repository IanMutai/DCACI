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
    });

    if (!inventory) {
      return jsonResponse(
        { success: false, error: `Inventory for year ${yearNum} not found` },
        404
      );
    }

    const sectorData = await prisma.sectorData.findUnique({
      where: {
        inventoryId_sectorCode: {
          inventoryId: inventory.id,
          sectorCode: code,
        },
      },
      include: {
        categories: {
          orderBy: { categoryCode: "asc" },
        },
      },
    });

    if (!sectorData) {
      return jsonResponse(
        { success: false, error: `Sector with code '${code}' not found for year ${yearNum}` },
        404
      );
    }

    return jsonResponse({
      success: true,
      data: {
        id: sectorData.id,
        code: sectorData.sectorCode,
        name: sectorData.sectorName,
        co2Emissions: sectorData.co2Emissions,
        ch4Emissions: sectorData.ch4Emissions,
        n2oEmissions: sectorData.n2oEmissions,
        hfcEmissions: sectorData.hfcEmissions,
        pfcEmissions: sectorData.pfcEmissions,
        sf6Emissions: sectorData.sf6Emissions,
        nf3Emissions: sectorData.nf3Emissions,
        totalCO2eq: sectorData.totalCO2eq,
        categories: sectorData.categories.map((c) => ({
          id: c.id,
          code: c.categoryCode,
          name: c.categoryName,
          tier: c.tier,
          methodology: c.methodology,
          co2Emissions: c.co2Emissions,
          ch4Emissions: c.ch4Emissions,
          n2oEmissions: c.n2oEmissions,
          totalCO2eq: c.totalCO2eq,
          uncertaintyLower: c.uncertaintyLower,
          uncertaintyUpper: c.uncertaintyUpper,
          dataSource: c.dataSource,
          assumptions: c.assumptions,
        })),
      },
    });
  } catch (error) {
    console.error("GET /api/v1/sectors/[code] error:", error);
    return jsonResponse({ success: false, error: "Failed to fetch sector" }, 500);
  }
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
    const body = await request.json();

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
    });

    if (!inventory) {
      return jsonResponse(
        { success: false, error: `Inventory for year ${yearNum} not found` },
        404
      );
    }

    const existing = await prisma.sectorData.findUnique({
      where: {
        inventoryId_sectorCode: {
          inventoryId: inventory.id,
          sectorCode: code,
        },
      },
    });

    if (!existing) {
      return jsonResponse(
        { success: false, error: `Sector with code '${code}' not found for year ${yearNum}` },
        404
      );
    }

    // Allow updating emission values
    const updateData: Record<string, unknown> = {};
    if (body.sectorName !== undefined) updateData.sectorName = body.sectorName;
    if (body.co2Emissions !== undefined) updateData.co2Emissions = body.co2Emissions;
    if (body.ch4Emissions !== undefined) updateData.ch4Emissions = body.ch4Emissions;
    if (body.n2oEmissions !== undefined) updateData.n2oEmissions = body.n2oEmissions;
    if (body.hfcEmissions !== undefined) updateData.hfcEmissions = body.hfcEmissions;
    if (body.pfcEmissions !== undefined) updateData.pfcEmissions = body.pfcEmissions;
    if (body.sf6Emissions !== undefined) updateData.sf6Emissions = body.sf6Emissions;
    if (body.nf3Emissions !== undefined) updateData.nf3Emissions = body.nf3Emissions;
    if (body.totalCO2eq !== undefined) updateData.totalCO2eq = body.totalCO2eq;

    const sectorData = await prisma.sectorData.update({
      where: { id: existing.id },
      data: updateData,
      include: {
        categories: {
          orderBy: { categoryCode: "asc" },
        },
      },
    });

    return jsonResponse({ success: true, data: sectorData });
  } catch (error) {
    console.error("PUT /api/v1/sectors/[code] error:", error);
    return jsonResponse(
      { success: false, error: "Failed to update sector" },
      500
    );
  }
}
