import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const target = await prisma.target.findUnique({
      where: { id },
      include: {
        progressRecords: {
          include: { progressRecord: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!target) {
      return NextResponse.json(
        { success: false, error: "Target not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: target,
    });
  } catch (error) {
    console.error("Failed to fetch target:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch target" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const target = await prisma.target.update({
      where: { id },
      data: {
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
        isActive: body.isActive,
      },
    });

    return NextResponse.json({
      success: true,
      data: target,
    });
  } catch (error) {
    console.error("Failed to update target:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update target" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.target.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      data: { id, deleted: true },
    });
  } catch (error) {
    console.error("Failed to delete target:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete target" },
      { status: 500 }
    );
  }
}
