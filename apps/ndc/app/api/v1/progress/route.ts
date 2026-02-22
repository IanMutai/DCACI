import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ndcId = searchParams.get("ndcId");

    const where: Record<string, unknown> = {};
    if (ndcId) where.ndcId = ndcId;

    const records = await prisma.progressRecord.findMany({
      where,
      include: {
        targetProgress: {
          include: { target: true },
        },
      },
      orderBy: { year: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("Failed to fetch progress records:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch progress records" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const record = await prisma.progressRecord.create({
      data: {
        ndcId: body.ndcId,
        year: body.year,
        overallProgress: body.overallProgress,
        onTrack: body.onTrack,
        mrvDataYear: body.mrvDataYear,
        notes: body.notes,
      },
      include: {
        targetProgress: true,
      },
    });

    return NextResponse.json(
      { success: true, data: record },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create progress record:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create progress record" },
      { status: 500 }
    );
  }
}
