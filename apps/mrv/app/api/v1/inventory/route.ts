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
  const year = searchParams.get("year");
  const status = searchParams.get("status");
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const skip = (page - 1) * limit;

  try {
    const where: Record<string, unknown> = {
      tenantConfig: { portalTenantId: tenantId },
    };
    if (year) where.year = parseInt(year, 10);
    if (status) where.status = status.toUpperCase();

    const [inventories, total] = await Promise.all([
      prisma.inventory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { year: "desc" },
        include: {
          _count: { select: { sectorData: true } },
          sectorData: {
            select: {
              sectorCode: true,
              sectorName: true,
              totalCO2eq: true,
            },
          },
        },
      }),
      prisma.inventory.count({ where }),
    ]);

    return jsonResponse({
      success: true,
      data: {
        inventories: inventories.map((inv) => ({
          id: inv.id,
          year: inv.year,
          status: inv.status,
          totalEmissions: inv.totalEmissions,
          totalRemovals: inv.totalRemovals,
          netEmissions: inv.netEmissions,
          submittedAt: inv.submittedAt,
          approvedAt: inv.approvedAt,
          createdAt: inv.createdAt,
          updatedAt: inv.updatedAt,
          sectorCount: inv._count.sectorData,
          sectors: inv.sectorData.map((s) => ({
            code: s.sectorCode,
            name: s.sectorName,
            totalCO2eq: s.totalCO2eq,
          })),
        })),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/v1/inventory error:", error);
    return jsonResponse({ success: false, error: "Failed to fetch inventories" }, 500);
  }
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
    const { year } = body;

    if (!year || typeof year !== "number") {
      return jsonResponse(
        { success: false, error: "Invalid or missing 'year' field" },
        400
      );
    }

    // Find the tenant config for this tenant
    const tenantConfig = await prisma.tenantConfig.findUnique({
      where: { portalTenantId: tenantId },
    });

    if (!tenantConfig) {
      return jsonResponse(
        { success: false, error: "Tenant configuration not found" },
        404
      );
    }

    // Check for existing inventory for this year
    const existing = await prisma.inventory.findUnique({
      where: {
        tenantConfigId_year: {
          tenantConfigId: tenantConfig.id,
          year,
        },
      },
    });

    if (existing) {
      return jsonResponse(
        { success: false, error: `Inventory for year ${year} already exists` },
        409
      );
    }

    const inventory = await prisma.inventory.create({
      data: {
        tenantConfigId: tenantConfig.id,
        year,
        status: "DRAFT",
      },
      include: {
        sectorData: true,
      },
    });

    return jsonResponse({ success: true, data: inventory }, 201);
  } catch (error) {
    console.error("POST /api/v1/inventory error:", error);
    return jsonResponse(
      { success: false, error: "Failed to create inventory" },
      500
    );
  }
}
