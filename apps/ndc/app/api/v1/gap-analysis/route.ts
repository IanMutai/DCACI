import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const gapAnalysis = {
      analysisDate: new Date().toISOString(),
      targetYear: 2030,
      overallGap: {
        currentTrajectory: 118,
        bauProjection2030: 143,
        conditionalTarget: 97.2,
        gap: 20.8,
        gapPercent: 17.5,
      },
      sectoralGaps: [
        { sector: "Energy", currentTrajectory: 62, target: 42, gap: 20, priority: "high" },
        { sector: "Transport", currentTrajectory: 32, target: 22, gap: 10, priority: "high" },
        { sector: "Industry", currentTrajectory: 25, target: 16, gap: 9, priority: "medium" },
        { sector: "Agriculture", currentTrajectory: 16, target: 12, gap: 4, priority: "medium" },
        { sector: "Waste", currentTrajectory: 18, target: 12, gap: 6, priority: "medium" },
        { sector: "LULUCF", currentTrajectory: -6, target: -12, gap: 6, priority: "low" },
      ],
      recommendations: [
        "Accelerate renewable energy deployment to close the energy sector gap",
        "Implement electric vehicle incentives to address transport sector shortfall",
        "Scale up industrial energy efficiency programs",
        "Enhance LULUCF measures through expanded reforestation",
      ],
    };

    return NextResponse.json({
      success: true,
      data: gapAnalysis,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch gap analysis" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newAnalysis = {
      id: `gap-${Date.now()}`,
      ...body,
      analysisDate: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: newAnalysis },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create gap analysis" },
      { status: 500 }
    );
  }
}
