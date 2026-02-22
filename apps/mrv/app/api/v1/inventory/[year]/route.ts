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

async function findInventory(tenantId: string, year: number) {
  const tenantConfig = await prisma.tenantConfig.findUnique({
    where: { portalTenantId: tenantId },
  });

  if (!tenantConfig) return null;

  return prisma.inventory.findUnique({
    where: {
      tenantConfigId_year: {
        tenantConfigId: tenantConfig.id,
        year,
      },
    },
    include: {
      sectorData: {
        include: {
          categories: true,
        },
        orderBy: { sectorCode: "asc" },
      },
    },
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  const tenantId = getTenantId(request);
  if (!tenantId) {
    return jsonResponse(
      { success: false, error: "Missing X-Tenant-Id or X-API-Key header" },
      401
    );
  }

  const { year } = await params;
  const yearNum = parseInt(year, 10);

  if (isNaN(yearNum) || yearNum < 1990 || yearNum > 2100) {
    return jsonResponse(
      { success: false, error: "Invalid year parameter" },
      400
    );
  }

  try {
    const inventory = await findInventory(tenantId, yearNum);

    if (!inventory) {
      return jsonResponse(
        { success: false, error: `Inventory for year ${yearNum} not found` },
        404
      );
    }

    return jsonResponse({
      success: true,
      data: {
        id: inventory.id,
        year: inventory.year,
        status: inventory.status,
        totalEmissions: inventory.totalEmissions,
        totalRemovals: inventory.totalRemovals,
        netEmissions: inventory.netEmissions,
        submittedAt: inventory.submittedAt,
        approvedAt: inventory.approvedAt,
        createdAt: inventory.createdAt,
        updatedAt: inventory.updatedAt,
        sectors: inventory.sectorData.map((s) => ({
          id: s.id,
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
            id: c.id,
            code: c.categoryCode,
            name: c.categoryName,
            tier: c.tier,
            methodology: c.methodology,
            totalCO2eq: c.totalCO2eq,
          })),
        })),
      },
    });
  } catch (error) {
    console.error("GET /api/v1/inventory/[year] error:", error);
    return jsonResponse({ success: false, error: "Failed to fetch inventory" }, 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  const tenantId = getTenantId(request);
  if (!tenantId) {
    return jsonResponse(
      { success: false, error: "Missing X-Tenant-Id or X-API-Key header" },
      401
    );
  }

  const { year } = await params;
  const yearNum = parseInt(year, 10);

  if (isNaN(yearNum) || yearNum < 1990 || yearNum > 2100) {
    return jsonResponse(
      { success: false, error: "Invalid year parameter" },
      400
    );
  }

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

    const existing = await prisma.inventory.findUnique({
      where: {
        tenantConfigId_year: {
          tenantConfigId: tenantConfig.id,
          year: yearNum,
        },
      },
    });

    if (!existing) {
      return jsonResponse(
        { success: false, error: `Inventory for year ${yearNum} not found` },
        404
      );
    }

    // Only allow updating certain fields
    const updateData: Record<string, unknown> = {};
    if (body.status !== undefined) updateData.status = body.status;
    if (body.totalEmissions !== undefined) updateData.totalEmissions = body.totalEmissions;
    if (body.totalRemovals !== undefined) updateData.totalRemovals = body.totalRemovals;
    if (body.netEmissions !== undefined) updateData.netEmissions = body.netEmissions;
    if (body.status === "SUBMITTED") updateData.submittedAt = new Date();
    if (body.status === "APPROVED") updateData.approvedAt = new Date();

    const inventory = await prisma.inventory.update({
      where: { id: existing.id },
      data: updateData,
      include: {
        sectorData: {
          include: { categories: true },
          orderBy: { sectorCode: "asc" },
        },
      },
    });

    return jsonResponse({ success: true, data: inventory });
  } catch (error) {
    console.error("PUT /api/v1/inventory/[year] error:", error);
    return jsonResponse(
      { success: false, error: "Failed to update inventory" },
      500
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> }
) {
  const tenantId = getTenantId(request);
  if (!tenantId) {
    return jsonResponse(
      { success: false, error: "Missing X-Tenant-Id or X-API-Key header" },
      401
    );
  }

  const { year } = await params;
  const yearNum = parseInt(year, 10);

  if (isNaN(yearNum) || yearNum < 1990 || yearNum > 2100) {
    return jsonResponse(
      { success: false, error: "Invalid year parameter" },
      400
    );
  }

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

    const existing = await prisma.inventory.findUnique({
      where: {
        tenantConfigId_year: {
          tenantConfigId: tenantConfig.id,
          year: yearNum,
        },
      },
    });

    if (!existing) {
      return jsonResponse(
        { success: false, error: `Inventory for year ${yearNum} not found` },
        404
      );
    }

    // Delete related sector data (cascading through categories, activity data, etc.)
    await prisma.sectorData.deleteMany({
      where: { inventoryId: existing.id },
    });

    await prisma.qAQCRecord.deleteMany({
      where: { inventoryId: existing.id },
    });

    await prisma.inventory.delete({
      where: { id: existing.id },
    });

    return jsonResponse({
      success: true,
      data: { message: `Inventory for year ${yearNum} deleted successfully` },
    });
  } catch (error) {
    console.error("DELETE /api/v1/inventory/[year] error:", error);
    return jsonResponse(
      { success: false, error: "Failed to delete inventory" },
      500
    );
  }
}
