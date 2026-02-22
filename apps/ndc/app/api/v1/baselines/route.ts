import { NextRequest, NextResponse } from "next/server";

const mockBaselines = [
  {
    id: "baseline-bau-2030",
    name: "Business As Usual — Updated NDC (2030)",
    type: "BAU",
    baseYear: 2015,
    projections: {
      2015: 73, 2018: 91, 2020: 107, 2022: 118, 2025: 130, 2028: 138, 2030: 143,
    },
    assumptions: [
      "GDP growth 5.5% annually (Vision 2030 trajectory)",
      "No additional climate policies beyond pre-2015",
      "Population growth 2.3% per annum (KNBS projections)",
      "BAU of 143 MtCO2e by 2030 excluding LULUCF (Updated NDC 2020)",
      "Fossil fuel share maintained for industrial and transport growth",
    ],
    lastUpdated: "2020-12-24T00:00:00Z",
  },
  {
    id: "baseline-bau-2035",
    name: "Business As Usual — Second NDC (2035)",
    type: "BAU",
    baseYear: 2020,
    projections: {
      2020: 107, 2023: 122, 2025: 140, 2028: 170, 2030: 185, 2033: 200, 2035: 215,
    },
    assumptions: [
      "GDP growth 5.5-6% annually",
      "Population reaching 65M by 2035",
      "Urbanization rate increasing to 35%",
      "BAU of 215 MtCO2e by 2035 (Second NDC, April 2025)",
      "No additional climate policies beyond 2020 baseline",
    ],
    lastUpdated: "2025-04-01T00:00:00Z",
  },
  {
    id: "baseline-wem",
    name: "With Existing Measures (WEM)",
    type: "WEM",
    baseYear: 2015,
    projections: {
      2015: 73, 2018: 88, 2020: 100, 2022: 110, 2025: 122, 2028: 130, 2030: 133,
    },
    assumptions: [
      "Existing renewable energy policies fully implemented (Energy Act 2019)",
      "NCCAP III baseline measures executed",
      "Forest Conservation Act 2016 enforcement maintained",
      "Domestically funded mitigation measures in place",
      "Target: 133 MtCO2e by 2030 with existing measures",
    ],
    lastUpdated: "2025-08-20T00:00:00Z",
  },
  {
    id: "baseline-wam",
    name: "With Additional Measures (WAM — 32% below BAU)",
    type: "WAM",
    baseYear: 2015,
    projections: {
      2015: 73, 2018: 85, 2020: 95, 2022: 102, 2025: 105, 2028: 100, 2030: 97.2,
    },
    assumptions: [
      "Full 32% reduction below BAU by 2030 (requires international support)",
      "Full mitigation potential of 86.5 MtCO2e realized across all sectors",
      "Energy: 48.1 MtCO2e, LULUCF: 20.8, Agriculture: 9.7, Transport: 4.7, IPPU: 2.4, Waste: 0.8",
      "87% of $62B total cost covered by international climate finance",
      "Carbon Markets Regulations 2024 fully operational",
      "Target: 97.2 MtCO2e by 2030 (143 * 0.68)",
    ],
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
