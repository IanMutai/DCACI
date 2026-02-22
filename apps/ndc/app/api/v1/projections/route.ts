import { NextRequest, NextResponse } from "next/server";

const mockProjections = [
  { year: 2025, bau: 165, wem: 140, wam: 120, target: 126, sector: "all" },
  { year: 2026, bau: 170, wem: 138, wam: 115, target: 121, sector: "all" },
  { year: 2027, bau: 175, wem: 136, wam: 112, target: 116, sector: "all" },
  { year: 2028, bau: 178, wem: 134, wam: 108, target: 111, sector: "all" },
  { year: 2029, bau: 182, wem: 132, wam: 105, target: 107, sector: "all" },
  { year: 2030, bau: 185, wem: 130, wam: 102, target: 102, sector: "all" },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get("sector");
    const fromYear = searchParams.get("fromYear");
    const toYear = searchParams.get("toYear");

    let filtered = mockProjections;
    if (sector && sector !== "all") {
      filtered = filtered.filter((p) => p.sector === sector);
    }
    if (fromYear) {
      filtered = filtered.filter((p) => p.year >= parseInt(fromYear));
    }
    if (toYear) {
      filtered = filtered.filter((p) => p.year <= parseInt(toYear));
    }

    return NextResponse.json({
      success: true,
      data: filtered,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projections" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newProjection = {
      id: `projection-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newProjection },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create projection" },
      { status: 500 }
    );
  }
}
