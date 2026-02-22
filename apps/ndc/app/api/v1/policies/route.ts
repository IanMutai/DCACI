import { NextRequest, NextResponse } from "next/server";

const mockPolicies = [
  {
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
    createdAt: "2025-01-10T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-2",
    name: "Vehicle Emission Standards",
    type: "mitigation",
    sector: "Transport",
    status: "implemented",
    estimatedReduction: 3.2,
    implementationYear: 2021,
    costEstimate: 45,
    description: "Mandatory vehicle emission standards for new vehicles",
    instruments: ["regulatory"],
    createdAt: "2025-01-10T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get("sector");
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    let filtered = mockPolicies;
    if (sector) filtered = filtered.filter((p) => p.sector === sector);
    if (status) filtered = filtered.filter((p) => p.status === status);
    if (type) filtered = filtered.filter((p) => p.type === type);

    return NextResponse.json({
      success: true,
      data: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch policies" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newPolicy = {
      id: `policy-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newPolicy },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create policy" },
      { status: 500 }
    );
  }
}
