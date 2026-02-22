import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const btrChapter3 = {
      reportId: "btr-ch3-2025",
      title: "BTR Chapter 3: NDC Progress",
      version: "1.0",
      status: "in-progress",
      sections: [
        {
          number: "3.1",
          title: "NDC Description and Updates",
          status: "complete",
          content: {
            ndcVersion: "2.0",
            targetType: "economy-wide",
            baseYear: 2010,
            targetYear: 2030,
            unconditionalTarget: "15% below 2010 levels",
            conditionalTarget: "32% below 2010 levels",
          },
        },
        {
          number: "3.2",
          title: "Progress in Implementing the NDC",
          status: "in-progress",
          content: {
            overallProgress: 46.1,
            baselineEmissions: 150.5,
            latestEmissions: 128.3,
            reductionAchieved: 14.8,
          },
        },
        {
          number: "3.3",
          title: "Mitigation Policies and Measures",
          status: "in-progress",
          content: {
            totalPolicies: 6,
            implemented: 3,
            planned: 2,
            totalEstimatedReduction: 36.0,
          },
        },
        {
          number: "3.4",
          title: "Projections",
          status: "not-started",
          content: null,
        },
        {
          number: "3.5",
          title: "Summary of GHG Emissions and Removals",
          status: "not-started",
          content: null,
        },
      ],
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: btrChapter3,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch BTR Chapter 3 report" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newReport = {
      reportId: `btr-ch3-${Date.now()}`,
      ...body,
      status: "draft",
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newReport },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create BTR Chapter 3 report" },
      { status: 500 }
    );
  }
}
