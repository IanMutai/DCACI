import { NextRequest, NextResponse } from "next/server";

const mockBaselines = [
  {
    id: "baseline-1",
    name: "Business As Usual (BAU)",
    type: "BAU",
    baseYear: 2015,
    projections: {
      2020: 155, 2025: 165, 2030: 185,
    },
    assumptions: ["GDP growth 4.5% annually", "No new climate policies", "Population growth 2.3%"],
    lastUpdated: "2025-06-15T00:00:00Z",
  },
  {
    id: "baseline-2",
    name: "With Existing Measures (WEM)",
    type: "WEM",
    baseYear: 2015,
    projections: {
      2020: 148, 2025: 140, 2030: 130,
    },
    assumptions: ["Current policies fully implemented", "Renewable energy targets met"],
    lastUpdated: "2025-08-20T00:00:00Z",
  },
  {
    id: "baseline-3",
    name: "With Additional Measures (WAM)",
    type: "WAM",
    baseYear: 2015,
    projections: {
      2020: 148, 2025: 128, 2030: 102,
    },
    assumptions: ["All planned policies implemented", "Enhanced renewable targets", "Carbon pricing"],
    lastUpdated: "2025-10-01T00:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const filtered = type
      ? mockBaselines.filter((b) => b.type === type)
      : mockBaselines;

    return NextResponse.json({
      success: true,
      data: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch baselines" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newBaseline = {
      id: `baseline-${Date.now()}`,
      ...body,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newBaseline },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create baseline" },
      { status: 500 }
    );
  }
}
