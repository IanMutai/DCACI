import { NextRequest, NextResponse } from "next/server";

const mockProjections = [
  /* ── Historical (actual emissions excl LULUCF) ── */
  { year: 2015, bau: 73, wem: 73, wam: 73, target: null, sector: "all" },
  { year: 2018, bau: 91, wem: 88, wam: 85, target: null, sector: "all" },
  { year: 2020, bau: 107, wem: 100, wam: 95, target: null, sector: "all" },
  { year: 2022, bau: 118, wem: 110, wam: 102, target: null, sector: "all" },
  /* ── Projections: BAU 143 MtCO2e by 2030 (Updated NDC) ── */
  { year: 2025, bau: 130, wem: 122, wam: 105, target: 97.2, sector: "all" },
  { year: 2026, bau: 133, wem: 124, wam: 104, target: 97.2, sector: "all" },
  { year: 2027, bau: 135, wem: 126, wam: 102, target: 97.2, sector: "all" },
  { year: 2028, bau: 138, wem: 130, wam: 100, target: 97.2, sector: "all" },
  { year: 2029, bau: 140, wem: 132, wam: 99, target: 97.2, sector: "all" },
  { year: 2030, bau: 143, wem: 133, wam: 97.2, target: 97.2, sector: "all" },
  /* ── Second NDC Projections: BAU 215 MtCO2e by 2035 ── */
  { year: 2031, bau: 155, wem: 140, wam: 100, target: 139.8, sector: "all" },
  { year: 2032, bau: 170, wem: 150, wam: 105, target: 139.8, sector: "all" },
  { year: 2033, bau: 185, wem: 160, wam: 115, target: 139.8, sector: "all" },
  { year: 2034, bau: 200, wem: 170, wam: 125, target: 139.8, sector: "all" },
  { year: 2035, bau: 215, wem: 180, wam: 139.8, target: 139.8, sector: "all" },
  /* ── Sector: Energy (48.1 MtCO2e mitigation by 2030) ── */
  { year: 2025, bau: 55, wem: 48, wam: 38, target: 30, sector: "energy" },
  { year: 2030, bau: 68, wem: 55, wam: 19.9, target: 19.9, sector: "energy" },
  /* ── Sector: LULUCF (20.8 MtCO2e mitigation by 2030) ── */
  { year: 2025, bau: -8, wem: -12, wam: -18, target: -28.8, sector: "lulucf" },
  { year: 2030, bau: -8, wem: -15, wam: -28.8, target: -28.8, sector: "lulucf" },
  /* ── Sector: Agriculture (9.7 MtCO2e mitigation by 2030) ── */
  { year: 2025, bau: 35, wem: 33, wam: 29, target: 22.3, sector: "agriculture" },
  { year: 2030, bau: 40, wem: 35, wam: 22.3, target: 22.3, sector: "agriculture" },
  /* ── Sector: Transport (4.7 MtCO2e mitigation by 2030) ── */
  { year: 2025, bau: 14, wem: 13, wam: 11, target: 9.3, sector: "transport" },
  { year: 2030, bau: 18, wem: 15, wam: 9.3, target: 9.3, sector: "transport" },
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
