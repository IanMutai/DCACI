import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/v1/projects - List all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const tenantConfigId = searchParams.get("tenantConfigId");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (tenantConfigId) where.tenantConfigId = tenantConfigId;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { tenantConfig: true },
      }),
      prisma.project.count({ where }),
    ]);

    return NextResponse.json({
      data: projects,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error listing projects:", error);
    return NextResponse.json(
      { error: "Failed to list projects" },
      { status: 500 }
    );
  }
}

// POST /api/v1/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      tenantConfigId,
      title,
      description,
      methodology,
      sector,
      projectType,
      startDate,
      endDate,
      creditingPeriodStart,
      creditingPeriodEnd,
      location,
      coordinates,
      proponentName,
      proponentContact,
      estimatedReductions,
      documentUrl,
      isArticle6,
      correspondingAdjustment,
    } = body;

    if (!tenantConfigId || !title) {
      return NextResponse.json(
        { error: "tenantConfigId and title are required" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        tenantConfigId,
        title,
        description,
        methodology,
        sector,
        projectType,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        creditingPeriodStart: creditingPeriodStart
          ? new Date(creditingPeriodStart)
          : undefined,
        creditingPeriodEnd: creditingPeriodEnd
          ? new Date(creditingPeriodEnd)
          : undefined,
        location,
        coordinates,
        proponentName,
        proponentContact,
        estimatedReductions,
        documentUrl,
        isArticle6: isArticle6 ?? false,
        correspondingAdjustment: correspondingAdjustment ?? false,
      },
      include: { tenantConfig: true },
    });

    return NextResponse.json({ data: project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
