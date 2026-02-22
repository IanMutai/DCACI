import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const ndcs = await prisma.nDC.findMany({
      include: {
        _count: { select: { targets: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: ndcs,
    });
  } catch (error) {
    console.error("Failed to fetch NDCs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch NDCs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const ndc = await prisma.nDC.create({
      data: {
        tenantConfigId: body.tenantConfigId,
        version: body.version,
        status: body.status,
        submissionDate: body.submissionDate
          ? new Date(body.submissionDate)
          : undefined,
        unfcccRef: body.unfcccRef,
        documentUrl: body.documentUrl,
      },
      include: {
        _count: { select: { targets: true } },
      },
    });

    return NextResponse.json(
      { success: true, data: ndc },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create NDC:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create NDC" },
      { status: 500 }
    );
  }
}
