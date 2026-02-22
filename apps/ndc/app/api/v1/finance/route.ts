import { NextRequest, NextResponse } from "next/server";

const mockFinance = {
  needs: {
    total: 62000,
    annualNeed: 6200,
    mitigation: 40000,
    adaptation: 22000,
    internationalSupportNeeded: 53940,
    internationalSharePercent: 87,
    timeframe: "2020-2030",
    bySector: [
      { sector: "Energy", mitigation: 22000, adaptation: 3000, total: 25000 },
      { sector: "Transport", mitigation: 8000, adaptation: 2000, total: 10000 },
      { sector: "LULUCF", mitigation: 4500, adaptation: 3500, total: 8000 },
      { sector: "Agriculture", mitigation: 2500, adaptation: 8000, total: 10500 },
      { sector: "Industry (IPPU)", mitigation: 2000, adaptation: 500, total: 2500 },
      { sector: "Waste", mitigation: 1000, adaptation: 500, total: 1500 },
      { sector: "Water & Health", mitigation: 0, adaptation: 4500, total: 4500 },
    ],
  },
  tracked: {
    total: 2400,
    referenceYear: 2018,
    international: 1600,
    domestic: 400,
    private: 400,
    flows: [
      { id: "f-1", source: "Green Climate Fund (GCF)", type: "international", amount: 990, sector: "Multi-sector", year: 2024, status: "disbursed", description: "Kenya is one of the largest GCF recipients globally, with $990M across 12 projects covering renewable energy, forestry, and adaptation" },
      { id: "f-2", source: "World Bank Group", type: "international", amount: 2000, sector: "Energy & Landscape", year: 2024, status: "committed", description: "Over $2B in climate-related lending including Kenya Off-Grid Solar Access Project, Electricity Modernization, and landscape restoration" },
      { id: "f-3", source: "Government of Kenya (National Budget)", type: "domestic", amount: 400, sector: "Cross-cutting", year: 2024, status: "committed", description: "Climate-related public expenditure tracked through Climate Budget Tagging system introduced in FY2021/22" },
      { id: "f-4", source: "African Development Bank", type: "international", amount: 350, sector: "Energy & Transport", year: 2024, status: "disbursed", description: "Support for geothermal development, Last Mile Connectivity, and Nairobi BRT" },
      { id: "f-5", source: "EU / European bilateral", type: "international", amount: 280, sector: "LULUCF & Agriculture", year: 2024, status: "disbursed", description: "EU Forest Partnership, REDD+ results-based payments, and CSA programs" },
      { id: "f-6", source: "Private Sector (IPPs & Carbon Markets)", type: "private", amount: 400, sector: "Energy", year: 2024, status: "committed", description: "Private investment in renewable energy IPPs (Lake Turkana Wind, Kipeto Wind) and voluntary carbon market revenues" },
    ],
  },
  gap: {
    total: 3800,
    annualGap: 2700,
    percentFunded: 47,
    percentGap: 53,
    gapDescription: "Kenya's annual climate finance gap is approximately $2.7B (53% of annual need), based on $6.2B/year required vs. ~$2.4B tracked flows (2018 data). The 87% international support requirement highlights the need for scaled-up multilateral and bilateral finance.",
  },
  secondNDC: {
    totalCost: 56000,
    timeframe: "2031-2035",
    description: "Second NDC (submitted 30 April 2025) estimates total implementation cost for the 35% below BAU (215 MtCO2e) by 2035 target, with 20% domestic and 80% international support",
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
