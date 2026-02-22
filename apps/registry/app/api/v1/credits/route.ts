import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/v1/credits - List all credits
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const projectId = searchParams.get("projectId");
    const vintage = searchParams.get("vintage");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (projectId) where.projectId = projectId;
    if (vintage) where.vintage = parseInt(vintage, 10);

    const [credits, total] = await Promise.all([
      prisma.credit.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: { project: true },
      }),
      prisma.credit.count({ where }),
    ]);

    return NextResponse.json({
      data: credits,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error listing credits:", error);
    return NextResponse.json(
      { error: "Failed to list credits" },
      { status: 500 }
    );
  }
}

// POST /api/v1/credits - Issue new credits
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      projectId,
      serialNumber,
      vintage,
      quantity,
      unit,
      currentHolder,
      isItmo,
      correspondingAdjustmentApplied,
      metadata,
    } = body;

    if (!projectId || !serialNumber || vintage === undefined || !quantity) {
      return NextResponse.json(
        {
          error:
            "projectId, serialNumber, vintage, and quantity are required",
        },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    const credit = await prisma.credit.create({
      data: {
        projectId,
        serialNumber,
        vintage,
        quantity,
        unit: unit ?? "tCO2e",
        currentHolder,
        isItmo: isItmo ?? false,
        correspondingAdjustmentApplied:
          correspondingAdjustmentApplied ?? false,
        metadata,
      },
      include: { project: true },
    });

    return NextResponse.json({ data: credit }, { status: 201 });
  } catch (error) {
    console.error("Error issuing credit:", error);
    return NextResponse.json(
      { error: "Failed to issue credit" },
      { status: 500 }
    );
  }
}
