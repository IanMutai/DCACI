import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string }> };

// GET /api/v1/credits/:id - Get a single credit
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const credit = await prisma.credit.findUnique({
      where: { id },
      include: {
        project: true,
        transfers: { orderBy: { executedAt: "desc" } },
      },
    });

    if (!credit) {
      return NextResponse.json(
        { error: "Credit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: credit });
  } catch (error) {
    console.error("Error fetching credit:", error);
    return NextResponse.json(
      { error: "Failed to fetch credit" },
      { status: 500 }
    );
  }
}
