import { NextRequest, NextResponse } from "next/server";

const mockFinance = {
  needs: {
    total: 2745,
    mitigation: 2015,
    adaptation: 730,
    bySector: [
      { sector: "Energy", mitigation: 850, adaptation: 200, total: 1050 },
      { sector: "Transport", mitigation: 420, adaptation: 80, total: 500 },
      { sector: "Industry", mitigation: 380, adaptation: 50, total: 430 },
      { sector: "Agriculture", mitigation: 150, adaptation: 280, total: 430 },
      { sector: "LULUCF", mitigation: 120, adaptation: 90, total: 210 },
      { sector: "Waste", mitigation: 95, adaptation: 30, total: 125 },
    ],
  },
  tracked: {
    total: 860,
    international: 365,
    domestic: 145,
    private: 350,
    flows: [
      { id: "f-1", source: "Green Climate Fund", type: "international", amount: 120, sector: "Energy", year: 2024, status: "disbursed" },
      { id: "f-2", source: "National Budget", type: "domestic", amount: 85, sector: "Transport", year: 2024, status: "committed" },
      { id: "f-3", source: "World Bank", type: "international", amount: 200, sector: "Industry", year: 2024, status: "disbursed" },
      { id: "f-4", source: "Private Sector", type: "private", amount: 350, sector: "Energy", year: 2024, status: "committed" },
    ],
  },
  gap: {
    total: 1885,
    percentFunded: 31.3,
  },
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockFinance,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch finance records" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newRecord = {
      id: `finance-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newRecord },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create finance record" },
      { status: 500 }
    );
  }
}
