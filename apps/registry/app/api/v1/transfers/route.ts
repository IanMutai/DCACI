import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET /api/v1/transfers - List all transfers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const creditId = searchParams.get("creditId");
    const page = parseInt(searchParams.get("page") ?? "1", 10);
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (creditId) where.creditId = creditId;

    const [transfers, total] = await Promise.all([
      prisma.transfer.findMany({
        where,
        skip,
        take: limit,
        orderBy: { executedAt: "desc" },
        include: { credit: true },
      }),
      prisma.transfer.count({ where }),
    ]);

    return NextResponse.json({
      data: transfers,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Error listing transfers:", error);
    return NextResponse.json(
      { error: "Failed to list transfers" },
      { status: 500 }
    );
  }
}

// POST /api/v1/transfers - Create a new transfer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { creditId, fromEntity, toEntity, quantity, transferType, reason } =
      body;

    if (!creditId || !fromEntity || !toEntity || !quantity) {
      return NextResponse.json(
        {
          error:
            "creditId, fromEntity, toEntity, and quantity are required",
        },
        { status: 400 }
      );
    }

    const credit = await prisma.credit.findUnique({
      where: { id: creditId },
    });
    if (!credit) {
      return NextResponse.json(
        { error: "Credit not found" },
        { status: 404 }
      );
    }

    const transfer = await prisma.transfer.create({
      data: {
        creditId,
        fromEntity,
        toEntity,
        quantity,
        transferType: transferType ?? "TRANSFER",
        reason,
      },
      include: { credit: true },
    });

    // Update the credit's current holder
    await prisma.credit.update({
      where: { id: creditId },
      data: { currentHolder: toEntity, status: "TRANSFERRED" },
    });

    return NextResponse.json({ data: transfer }, { status: 201 });
  } catch (error) {
    console.error("Error creating transfer:", error);
    return NextResponse.json(
      { error: "Failed to create transfer" },
      { status: 500 }
    );
  }
}
