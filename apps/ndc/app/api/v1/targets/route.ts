import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ndcId = searchParams.get("ndcId");
    const sector = searchParams.get("sector");

    const where: Record<string, unknown> = {};
    if (ndcId) where.ndcId = ndcId;
    if (sector) where.sector = sector;

    const targets = await prisma.target.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: targets,
    });
  } catch (error) {
    console.error("Failed to fetch targets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch targets" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const target = await prisma.target.create({
      data: {
        ndcId: body.ndcId,
        name: body.name,
        sector: body.sector,
        targetType: body.targetType,
        referenceType: body.referenceType,
        baseYear: body.baseYear,
        baseValue: body.baseValue,
        baseUnit: body.baseUnit,
        targetYear: body.targetYear,
        targetValue: body.targetValue,
        targetUnit: body.targetUnit,
        isConditional: body.isConditional,
        conditionDescription: body.conditionDescription,
      },
    });

    return NextResponse.json(
      { success: true, data: target },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create target:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create target" },
      { status: 500 }
    );
  }
}
