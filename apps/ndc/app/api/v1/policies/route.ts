import { NextRequest, NextResponse } from "next/server";

const mockPolicies = [
  {
    id: "policy-cca-2016",
    name: "Climate Change Act 2016 (amended 2023)",
    type: "cross-cutting",
    sector: "Cross-cutting",
    status: "implemented",
    estimatedReduction: null,
    implementationYear: 2016,
    costEstimate: null,
    description: "Foundational climate legislation establishing the National Climate Change Council, Climate Change Directorate, and Climate Change Fund. The 2023 amendment strengthened carbon markets provisions and county-level climate action planning.",
    instruments: ["regulatory", "institutional"],
    createdAt: "2016-05-27T00:00:00Z",
    updatedAt: "2023-12-01T00:00:00Z",
  },
  {
    id: "policy-nccap3",
    name: "NCCAP III (2023-2027)",
    type: "cross-cutting",
    sector: "Cross-cutting",
    status: "implemented",
    estimatedReduction: 86.5,
    implementationYear: 2023,
    costEstimate: 62000,
    description: "Third National Climate Change Action Plan providing the implementation framework for Kenya's Updated NDC. Covers mitigation (86.5 MtCO2e potential) and adaptation across all sectors. Total cost: $62B, with 87% requiring international support.",
    instruments: ["regulatory", "planning"],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-energy-act",
    name: "Energy Act 2019",
    type: "mitigation",
    sector: "Energy",
    status: "implemented",
    estimatedReduction: 48.1,
    implementationYear: 2019,
    costEstimate: 25000,
    description: "Consolidated energy legislation establishing EPRA, promoting renewable energy, energy efficiency, and rural electrification. Mandates feed-in tariffs and net metering. Supports the 48.1 MtCO2e energy sector mitigation target.",
    instruments: ["regulatory", "economic"],
    createdAt: "2019-03-12T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-forest-act",
    name: "Forest Conservation & Management Act 2016",
    type: "mitigation",
    sector: "LULUCF",
    status: "implemented",
    estimatedReduction: 20.8,
    implementationYear: 2016,
    costEstimate: 8000,
    description: "Legal framework for sustainable forest management targeting 10% national tree cover by 2030. Supports LULUCF mitigation potential of 20.8 MtCO2e by 2030 through afforestation, reforestation, and reduced deforestation.",
    instruments: ["regulatory"],
    createdAt: "2016-09-01T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-carbon-markets",
    name: "Carbon Markets Regulations 2024",
    type: "mitigation",
    sector: "Market",
    status: "implemented",
    estimatedReduction: null,
    implementationYear: 2024,
    costEstimate: null,
    description: "Regulatory framework for carbon trading under Article 6 of the Paris Agreement. Establishes 25% benefit-sharing with local communities, national registry, and corresponding adjustments mechanism.",
    instruments: ["market", "regulatory"],
    createdAt: "2024-07-01T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-lt-leds",
    name: "LT-LEDS 2022 (Net-Zero by 2050)",
    type: "cross-cutting",
    sector: "Cross-cutting",
    status: "adopted",
    estimatedReduction: null,
    implementationYear: 2022,
    costEstimate: null,
    description: "Kenya's Long-Term Low Emission Development Strategy targeting net-zero GHG emissions by 2050. Outlines pathways for deep decarbonization across energy, transport, industry, and enhanced natural carbon sinks.",
    instruments: ["planning", "regulatory"],
    createdAt: "2022-11-01T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-clean-cooking",
    name: "National Clean Cooking Strategy (2019)",
    type: "mitigation",
    sector: "Energy",
    status: "implemented",
    estimatedReduction: 3.6,
    implementationYear: 2019,
    costEstimate: 2500,
    description: "Targets transition from traditional biomass to LPG, bioethanol, electric, and improved cookstoves. Addresses health impacts from indoor air pollution and deforestation from charcoal production.",
    instruments: ["information", "economic"],
    createdAt: "2019-05-01T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-csa",
    name: "Climate-Smart Agriculture Strategy (2023)",
    type: "mitigation",
    sector: "Agriculture",
    status: "adopted",
    estimatedReduction: 9.7,
    implementationYear: 2023,
    costEstimate: 10500,
    description: "Promotes CSA practices including improved livestock feed management, agroforestry, soil carbon management, and water-efficient rice cultivation. Targets 9.7 MtCO2e agriculture sector mitigation by 2030.",
    instruments: ["voluntary", "information"],
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-transport",
    name: "Integrated National Transport Policy (2023)",
    type: "mitigation",
    sector: "Transport",
    status: "adopted",
    estimatedReduction: 4.7,
    implementationYear: 2023,
    costEstimate: 10000,
    description: "Policy framework for low-carbon transport including BRT systems, fuel efficiency standards, NMT promotion, and railway modernization. Supports the 4.7 MtCO2e transport sector mitigation target.",
    instruments: ["regulatory", "economic"],
    createdAt: "2023-11-01T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-waste",
    name: "National Solid Waste Management Strategy (2022)",
    type: "mitigation",
    sector: "Waste",
    status: "adopted",
    estimatedReduction: 0.8,
    implementationYear: 2022,
    costEstimate: 1500,
    description: "Framework for landfill gas capture, composting, and waste-to-energy. Targets 0.8 MtCO2e waste sector mitigation by 2030. Includes extended producer responsibility and circular economy principles.",
    instruments: ["regulatory"],
    createdAt: "2022-03-01T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-nap",
    name: "Kenya National Adaptation Plan (2015-2030)",
    type: "adaptation",
    sector: "Adaptation",
    status: "implemented",
    estimatedReduction: null,
    implementationYear: 2015,
    costEstimate: 40000,
    description: "Long-term adaptation planning framework addressing climate risks in agriculture, water resources, health, infrastructure, and ecosystems. Adaptation cost estimated at $40B over 2020-2030.",
    instruments: ["regulatory", "planning"],
    createdAt: "2015-07-01T00:00:00Z",
    updatedAt: "2025-06-15T00:00:00Z",
  },
  {
    id: "policy-refit",
    name: "Feed-in Tariff / REFIT Policy (revised 2021)",
    type: "mitigation",
    sector: "Energy",
    status: "implemented",
    estimatedReduction: 8.2,
    implementationYear: 2012,
    costEstimate: 5000,
    description: "Guaranteed purchase tariffs for electricity from solar, wind, biomass, geothermal, and small hydro. Revised in 2021 to include auction-based pricing. Contributed to Lake Turkana Wind (310 MW) and other IPP projects.",
    instruments: ["economic", "regulatory"],
    createdAt: "2012-01-01T00:00:00Z",
    updatedAt: "2021-06-15T00:00:00Z",
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
