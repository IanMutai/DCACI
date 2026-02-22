import { NextRequest, NextResponse } from "next/server";

const mockPolicy = {
  id: "policy-1",
  name: "Renewable Energy Feed-in Tariff",
  type: "mitigation",
  sector: "Energy",
  status: "implemented",
  estimatedReduction: 8.5,
  implementationYear: 2020,
  costEstimate: 150,
  description: "Feed-in tariff mechanism for renewable energy generators",
  instruments: ["economic", "regulatory"],
  impactAssessment: {
    directReduction: 8.5,
    indirectReduction: 2.1,
    cobenefits: ["Job creation", "Energy security", "Air quality"],
    confidence: "high",
  },
  createdAt: "2025-01-10T00:00:00Z",
  updatedAt: "2025-06-15T00:00:00Z",
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    return NextResponse.json({
      success: true,
      data: { ...mockPolicy, id },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch policy" },
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

    const updated = {
      ...mockPolicy,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update policy" },
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
    return NextResponse.json({
      success: true,
      data: { id, deleted: true },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete policy" },
      { status: 500 }
    );
  }
}
