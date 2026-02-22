import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const ndc = await prisma.nDC.findUnique({
      where: { id },
      include: {
        targets: true,
        progressRecords: { orderBy: { year: "desc" } },
      },
    });

    if (!ndc) {
      return NextResponse.json(
        { success: false, error: "NDC not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: ndc,
    });
  } catch (error) {
    console.error("Failed to fetch NDC:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch NDC" },
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

    const ndc = await prisma.nDC.update({
      where: { id },
      data: {
        version: body.version,
        status: body.status,
        submissionDate: body.submissionDate
          ? new Date(body.submissionDate)
          : undefined,
        unfcccRef: body.unfcccRef,
        documentUrl: body.documentUrl,
      },
    });

    return NextResponse.json({
      success: true,
      data: ndc,
    });
  } catch (error) {
    console.error("Failed to update NDC:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update NDC" },
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

    await prisma.nDC.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      data: { id, deleted: true },
    });
  } catch (error) {
    console.error("Failed to delete NDC:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete NDC" },
      { status: 500 }
    );
  }
}
