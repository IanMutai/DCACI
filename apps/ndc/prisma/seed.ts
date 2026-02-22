import { PrismaClient } from "../node_modules/.prisma/ndc-client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding NDC database...");

  // ── 1. Tenant Config ──────────────────────────────────────────────
  const tenant = await prisma.tenantConfig.upsert({
    where: { portalTenantId: "default" },
    update: {},
    create: {
      portalTenantId: "default",
      countryCode: "KE",
      countryName: "Kenya",
      ndcCycle: 2,
    },
  });
  console.log("  Created TenantConfig:", tenant.id);

  // ── 2. NDC Record ─────────────────────────────────────────────────
  const ndc = await prisma.nDC.create({
    data: {
      tenantConfigId: tenant.id,
      version: "Kenya Updated NDC 2020",
      status: "ACTIVE",
      submissionDate: new Date("2020-12-24"),
      unfcccRef: "NDC-KE-2020-002",
      documentUrl:
        "https://unfccc.int/sites/default/files/NDC/2022-Kenya_Updated_NDC.pdf",
    },
  });

  // Link the current NDC to the tenant
  await prisma.tenantConfig.update({
    where: { id: tenant.id },
    data: { currentNDCId: ndc.id },
  });
  console.log("  Created NDC:", ndc.version);

  // ── 3. Targets ────────────────────────────────────────────────────
  // Absolute emission reduction target (unconditional)
  const absoluteTarget = await prisma.target.create({
    data: {
      ndcId: ndc.id,
      name: "Economy-wide GHG emission reduction (unconditional)",
      sector: "Economy-wide",
      targetType: "EMISSION_REDUCTION",
      referenceType: "BAU",
      baseYear: 2015,
      baseValue: 73.0, // MtCO2e
      baseUnit: "MtCO2e",
      targetYear: 2030,
      targetValue: 32.0, // 32% reduction below BAU
      targetUnit: "% below BAU",
      isConditional: false,
    },
  });

  // Conditional target
  const conditionalTarget = await prisma.target.create({
    data: {
      ndcId: ndc.id,
      name: "Economy-wide GHG emission reduction (conditional)",
      sector: "Economy-wide",
      targetType: "EMISSION_REDUCTION",
      referenceType: "BAU",
      baseYear: 2015,
      baseValue: 73.0,
      baseUnit: "MtCO2e",
      targetYear: 2030,
      targetValue: 32.0,
      targetUnit: "% below BAU",
      isConditional: true,
      conditionDescription:
        "Conditional upon receiving international support in the form of finance, technology transfer, and capacity building.",
    },
  });

  // Emission intensity target
  const intensityTarget = await prisma.target.create({
    data: {
      ndcId: ndc.id,
      name: "GHG intensity reduction per unit GDP",
      sector: "Economy-wide",
      targetType: "EMISSION_INTENSITY",
      referenceType: "INTENSITY",
      baseYear: 2015,
      baseValue: 0.52, // tCO2e per 1000 USD GDP
      baseUnit: "tCO2e / 1000 USD GDP",
      targetYear: 2030,
      targetValue: 0.31,
      targetUnit: "tCO2e / 1000 USD GDP",
      isConditional: false,
    },
  });

  // Renewable energy share target
  const renewableTarget = await prisma.target.create({
    data: {
      ndcId: ndc.id,
      name: "Renewable energy share in electricity generation",
      sector: "Energy",
      targetType: "RENEWABLE_SHARE",
      referenceType: "ABSOLUTE",
      baseYear: 2015,
      baseValue: 70.0,
      baseUnit: "%",
      targetYear: 2030,
      targetValue: 100.0,
      targetUnit: "% of electricity mix",
      isConditional: false,
    },
  });

  // Forest cover target
  const forestTarget = await prisma.target.create({
    data: {
      ndcId: ndc.id,
      name: "Increase national tree cover to 10%",
      sector: "Forestry",
      targetType: "FOREST_COVER",
      referenceType: "ABSOLUTE",
      baseYear: 2019,
      baseValue: 7.4,
      baseUnit: "% of land area",
      targetYear: 2030,
      targetValue: 10.0,
      targetUnit: "% of land area",
      isConditional: true,
      conditionDescription:
        "Subject to availability of international climate finance and technical assistance.",
    },
  });
  console.log("  Created 5 Targets");

  // ── 4. Baselines ──────────────────────────────────────────────────
  const bauBaseline = await prisma.baseline.create({
    data: {
      tenantConfigId: tenant.id,
      name: "Business as Usual (BAU) Baseline",
      type: "BAU",
      sector: "Economy-wide",
      baseYear: 2015,
      endYear: 2030,
      dataPoints: [
        { year: 2015, value: 73.0 },
        { year: 2018, value: 80.2 },
        { year: 2020, value: 85.5 },
        { year: 2022, value: 91.3 },
        { year: 2025, value: 100.8 },
        { year: 2028, value: 110.6 },
        { year: 2030, value: 118.0 },
      ],
      methodology:
        "IPCC 2006 Guidelines; extrapolation from 2015 national GHG inventory using sector growth rates.",
      assumptions: {
        gdpGrowthRate: "5.5% per annum",
        populationGrowthRate: "2.3% per annum",
        deforestationRate: "5,000 ha/year",
        energyDemandGrowth: "6.2% per annum",
      },
      isActive: true,
      approvedAt: new Date("2021-03-15"),
    },
  });

  const wemBaseline = await prisma.baseline.create({
    data: {
      tenantConfigId: tenant.id,
      name: "With Existing Measures (WEM) Scenario",
      type: "WITH_MEASURES",
      sector: "Economy-wide",
      baseYear: 2015,
      endYear: 2030,
      dataPoints: [
        { year: 2015, value: 73.0 },
        { year: 2018, value: 78.1 },
        { year: 2020, value: 80.7 },
        { year: 2022, value: 83.5 },
        { year: 2025, value: 89.2 },
        { year: 2028, value: 94.1 },
        { year: 2030, value: 97.0 },
      ],
      methodology:
        "BAU adjusted for policies implemented before Dec 2020, including geothermal expansion and cookstove programmes.",
      assumptions: {
        geothermalCapacity: "1,600 MW by 2025",
        cookstoveDistribution: "4M improved cookstoves by 2028",
        fuelSubsidyReform: "Partial phase-out by 2025",
      },
      isActive: true,
      approvedAt: new Date("2021-03-15"),
    },
  });

  const wamBaseline = await prisma.baseline.create({
    data: {
      tenantConfigId: tenant.id,
      name: "With Additional Measures (WAM) Scenario",
      type: "WITH_ADDITIONAL_MEASURES",
      sector: "Economy-wide",
      baseYear: 2015,
      endYear: 2030,
      dataPoints: [
        { year: 2015, value: 73.0 },
        { year: 2018, value: 76.5 },
        { year: 2020, value: 77.2 },
        { year: 2022, value: 77.8 },
        { year: 2025, value: 78.5 },
        { year: 2028, value: 79.2 },
        { year: 2030, value: 80.2 },
      ],
      methodology:
        "WEM scenario plus planned policies in the Updated NDC, including full renewable transition and REDD+ implementation.",
      assumptions: {
        fullRenewableTransition: "By 2030",
        reddPlusImplementation: "Full scale from 2023",
        electricMobility: "15% BEV share of new sales by 2030",
        ccsDeployment: "Pilot phase by 2028",
      },
      isActive: true,
      approvedAt: new Date("2021-06-10"),
    },
  });
  console.log("  Created 3 Baselines (BAU, WEM, WAM)");

  // ── 5. Progress Records with Target Progress ─────────────────────
  const progressYears = [
    {
      year: 2020,
      overallProgress: 12.5,
      onTrack: true,
      mrvDataYear: 2020,
      notes: "Post-COVID recovery year; geothermal expansion on schedule.",
      absolute: { current: 81.2, progressPct: 15.0, gap: -3.2, onTrack: true },
      intensity: { current: 0.48, progressPct: 19.0, gap: 0.17, onTrack: true },
    },
    {
      year: 2021,
      overallProgress: 22.0,
      onTrack: true,
      mrvDataYear: 2021,
      notes:
        "Strong rebound in renewable energy investment; forest restoration programmes launched.",
      absolute: { current: 83.0, progressPct: 25.0, gap: -2.8, onTrack: true },
      intensity: { current: 0.46, progressPct: 28.6, gap: 0.15, onTrack: true },
    },
    {
      year: 2022,
      overallProgress: 30.0,
      onTrack: true,
      mrvDataYear: 2022,
      notes:
        "Cookstove programme exceeding targets; transport sector lagging behind.",
      absolute: { current: 84.5, progressPct: 32.0, gap: -2.5, onTrack: true },
      intensity: {
        current: 0.44,
        progressPct: 38.1,
        gap: 0.13,
        onTrack: true,
      },
    },
    {
      year: 2023,
      overallProgress: 40.0,
      onTrack: true,
      mrvDataYear: 2023,
      notes:
        "New geothermal plants commissioned; EV policy framework adopted.",
      absolute: { current: 85.8, progressPct: 41.0, gap: -2.0, onTrack: true },
      intensity: {
        current: 0.42,
        progressPct: 47.6,
        gap: 0.11,
        onTrack: true,
      },
    },
    {
      year: 2024,
      overallProgress: 48.0,
      onTrack: false,
      mrvDataYear: 2024,
      notes:
        "Drought impacts on agriculture sector; LULUCF sink reduced. Finance gap widening.",
      absolute: {
        current: 88.0,
        progressPct: 45.0,
        gap: -5.2,
        onTrack: false,
      },
      intensity: {
        current: 0.41,
        progressPct: 52.4,
        gap: 0.1,
        onTrack: true,
      },
    },
  ];

  for (const p of progressYears) {
    const record = await prisma.progressRecord.create({
      data: {
        ndcId: ndc.id,
        year: p.year,
        overallProgress: p.overallProgress,
        onTrack: p.onTrack,
        mrvDataYear: p.mrvDataYear,
        lastSyncedAt: new Date(),
        notes: p.notes,
      },
    });

    // Absolute target progress
    await prisma.targetProgress.create({
      data: {
        progressRecordId: record.id,
        targetId: absoluteTarget.id,
        currentValue: p.absolute.current,
        currentUnit: "MtCO2e",
        progressPercent: p.absolute.progressPct,
        gapToTarget: p.absolute.gap,
        projectedValue: p.absolute.current * 1.02,
        projectedYear: 2030,
        onTrack: p.absolute.onTrack,
      },
    });

    // Intensity target progress
    await prisma.targetProgress.create({
      data: {
        progressRecordId: record.id,
        targetId: intensityTarget.id,
        currentValue: p.intensity.current,
        currentUnit: "tCO2e / 1000 USD GDP",
        progressPercent: p.intensity.progressPct,
        gapToTarget: p.intensity.gap,
        projectedValue: p.intensity.current * 0.95,
        projectedYear: 2030,
        onTrack: p.intensity.onTrack,
      },
    });
  }
  console.log("  Created 5 ProgressRecords with TargetProgress");

  // ── 6. Policy Measures ────────────────────────────────────────────
  const renewablePolicy = await prisma.policyMeasure.create({
    data: {
      tenantConfigId: tenant.id,
      name: "National Renewable Energy Scale-Up Programme",
      description:
        "Expansion of geothermal, wind, and solar capacity to achieve 100% renewable electricity by 2030. Includes feed-in tariffs, tax incentives for IPPs, and grid modernisation investments.",
      type: "MITIGATION",
      sector: "Energy",
      instrument: "Economic / Fiscal / Feed-in Tariff",
      status: "IMPLEMENTED",
      startDate: new Date("2019-01-01"),
      endDate: new Date("2030-12-31"),
      expectedImpact: 12.5, // MtCO2e avoided by 2030
      actualImpact: 5.8,
      estimatedCost: 2400.0,
      actualCost: 980.0,
      costUnit: "USD million",
      legalBasis: "Energy Act 2019; National Energy Policy 2018",
      documentUrl:
        "https://energy.go.ke/renewable-energy-scale-up-programme",
    },
  });

  const forestPolicy = await prisma.policyMeasure.create({
    data: {
      tenantConfigId: tenant.id,
      name: "National Forest Conservation and Restoration Strategy",
      description:
        "Restore 5.1 million hectares of degraded forest landscapes and increase national tree cover to 10% by 2030. Includes REDD+ programme, community forest management, and payment for ecosystem services.",
      type: "CROSS_CUTTING",
      sector: "Forestry",
      instrument: "Regulatory / REDD+ / PES",
      status: "IMPLEMENTED",
      startDate: new Date("2020-06-01"),
      endDate: new Date("2030-12-31"),
      expectedImpact: 8.2,
      actualImpact: 2.9,
      estimatedCost: 1800.0,
      actualCost: 520.0,
      costUnit: "USD million",
      legalBasis: "Forest Conservation and Management Act 2016",
      documentUrl:
        "https://environment.go.ke/forest-landscape-restoration",
    },
  });

  const transportPolicy = await prisma.policyMeasure.create({
    data: {
      tenantConfigId: tenant.id,
      name: "Green Transport and Electric Mobility Strategy",
      description:
        "Promotion of electric vehicles, Bus Rapid Transit in Nairobi, and non-motorised transport infrastructure. Includes import duty exemptions for EVs and charging infrastructure rollout.",
      type: "MITIGATION",
      sector: "Transport",
      instrument: "Economic / Regulatory / Infrastructure",
      status: "ADOPTED",
      startDate: new Date("2022-03-01"),
      endDate: new Date("2035-12-31"),
      expectedImpact: 4.3,
      actualImpact: 0.6,
      estimatedCost: 3100.0,
      costUnit: "USD million",
      legalBasis:
        "National Sustainable Transport Policy 2022; Finance Act 2023 (EV duty exemptions)",
    },
  });

  const cookstovePolicy = await prisma.policyMeasure.create({
    data: {
      tenantConfigId: tenant.id,
      name: "National Clean Cooking Programme",
      description:
        "Distribution of 4 million improved cookstoves and transition to LPG/biogas/electric cooking to reduce biomass consumption and indoor air pollution.",
      type: "CROSS_CUTTING",
      sector: "Energy",
      instrument: "Subsidy / Awareness / Market-based",
      status: "IMPLEMENTED",
      startDate: new Date("2018-01-01"),
      endDate: new Date("2028-12-31"),
      expectedImpact: 3.8,
      actualImpact: 2.1,
      estimatedCost: 450.0,
      actualCost: 210.0,
      costUnit: "USD million",
      legalBasis: "Kenya National Clean Cooking Strategy 2019",
    },
  });

  const climateSmartAgPolicy = await prisma.policyMeasure.create({
    data: {
      tenantConfigId: tenant.id,
      name: "Climate-Smart Agriculture Programme",
      description:
        "Promotion of agroforestry, conservation agriculture, and livestock feed improvement to reduce agricultural emissions and increase carbon sequestration in soils.",
      type: "CROSS_CUTTING",
      sector: "Agriculture",
      instrument: "Technical Assistance / Subsidy",
      status: "ADOPTED",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2030-12-31"),
      expectedImpact: 5.6,
      actualImpact: 1.2,
      estimatedCost: 850.0,
      actualCost: 190.0,
      costUnit: "USD million",
      legalBasis: "National Climate-Smart Agriculture Strategy 2017",
    },
  });
  console.log("  Created 5 PolicyMeasures");

  // ── Link Policies to Targets ──────────────────────────────────────
  await prisma.policyTarget.createMany({
    data: [
      {
        policyId: renewablePolicy.id,
        targetId: absoluteTarget.id,
        contributionPercent: 35.0,
      },
      {
        policyId: renewablePolicy.id,
        targetId: renewableTarget.id,
        contributionPercent: 80.0,
      },
      {
        policyId: forestPolicy.id,
        targetId: absoluteTarget.id,
        contributionPercent: 20.0,
      },
      {
        policyId: forestPolicy.id,
        targetId: forestTarget.id,
        contributionPercent: 90.0,
      },
      {
        policyId: transportPolicy.id,
        targetId: absoluteTarget.id,
        contributionPercent: 12.0,
      },
      {
        policyId: cookstovePolicy.id,
        targetId: absoluteTarget.id,
        contributionPercent: 10.0,
      },
      {
        policyId: climateSmartAgPolicy.id,
        targetId: absoluteTarget.id,
        contributionPercent: 15.0,
      },
    ],
  });
  console.log("  Linked Policies to Targets");

  // ── Policy Impact Records ─────────────────────────────────────────
  await prisma.policyImpact.createMany({
    data: [
      // Renewable energy impacts
      { policyId: renewablePolicy.id, year: 2020, emissionReduction: 1.2, renewableAdded: 310.0, isVerified: true, verificationSource: "EPRA Annual Report 2021" },
      { policyId: renewablePolicy.id, year: 2021, emissionReduction: 2.0, renewableAdded: 480.0, isVerified: true, verificationSource: "EPRA Annual Report 2022" },
      { policyId: renewablePolicy.id, year: 2022, emissionReduction: 3.1, renewableAdded: 620.0, isVerified: true, verificationSource: "EPRA Annual Report 2023" },
      { policyId: renewablePolicy.id, year: 2023, emissionReduction: 4.4, renewableAdded: 810.0, isVerified: false },
      { policyId: renewablePolicy.id, year: 2024, emissionReduction: 5.8, renewableAdded: 950.0, isVerified: false },
      // Forest conservation impacts
      { policyId: forestPolicy.id, year: 2021, emissionReduction: 0.5, isVerified: true, verificationSource: "KFS Annual Report 2022" },
      { policyId: forestPolicy.id, year: 2022, emissionReduction: 1.2, isVerified: true, verificationSource: "KFS Annual Report 2023" },
      { policyId: forestPolicy.id, year: 2023, emissionReduction: 2.0, isVerified: false },
      { policyId: forestPolicy.id, year: 2024, emissionReduction: 2.9, isVerified: false },
      // Cookstove impacts
      { policyId: cookstovePolicy.id, year: 2020, emissionReduction: 0.6, energySaved: 1200.0, isVerified: true, verificationSource: "Ministry of Energy Report 2021" },
      { policyId: cookstovePolicy.id, year: 2022, emissionReduction: 1.4, energySaved: 2800.0, isVerified: true, verificationSource: "Ministry of Energy Report 2023" },
      { policyId: cookstovePolicy.id, year: 2024, emissionReduction: 2.1, energySaved: 4100.0, isVerified: false },
    ],
  });
  console.log("  Created PolicyImpact records");

  // ── 7. Gap Analysis ───────────────────────────────────────────────
  await prisma.gapAnalysis.create({
    data: {
      tenantConfigId: tenant.id,
      analysisDate: new Date("2024-06-15"),
      targetYear: 2030,
      currentEmissions: 88.0,
      projectedBAU: 118.0,
      targetEmissions: 80.2, // WAM target
      absoluteGap: 7.8,
      percentageGap: 9.7,
      sectorGaps: [
        { sector: "Energy", currentGap: 3.2, unit: "MtCO2e", status: "Moderate" },
        { sector: "Transport", currentGap: 2.8, unit: "MtCO2e", status: "Critical" },
        { sector: "Agriculture", currentGap: 1.1, unit: "MtCO2e", status: "On Track" },
        { sector: "Forestry", currentGap: 0.4, unit: "MtCO2e", status: "On Track" },
        { sector: "Industry", currentGap: 0.3, unit: "MtCO2e", status: "Moderate" },
      ],
      recommendations: [
        "Accelerate electric mobility transition with stronger fiscal incentives for EVs and charging infrastructure.",
        "Scale up REDD+ implementation and enforce forestry regulations to close the LULUCF gap.",
        "Mobilise additional climate finance: USD 1.2B needed for conditional measures by 2027.",
        "Strengthen MRV capacity in the transport and industrial sectors to improve data quality.",
        "Consider carbon pricing mechanisms to drive private sector emission reductions.",
      ],
    },
  });

  await prisma.gapAnalysis.create({
    data: {
      tenantConfigId: tenant.id,
      analysisDate: new Date("2023-06-20"),
      targetYear: 2030,
      currentEmissions: 85.8,
      projectedBAU: 118.0,
      targetEmissions: 80.2,
      absoluteGap: 5.6,
      percentageGap: 7.0,
      sectorGaps: [
        { sector: "Energy", currentGap: 2.1, unit: "MtCO2e", status: "On Track" },
        { sector: "Transport", currentGap: 2.0, unit: "MtCO2e", status: "Moderate" },
        { sector: "Agriculture", currentGap: 0.9, unit: "MtCO2e", status: "On Track" },
        { sector: "Forestry", currentGap: 0.3, unit: "MtCO2e", status: "On Track" },
        { sector: "Industry", currentGap: 0.3, unit: "MtCO2e", status: "Moderate" },
      ],
      recommendations: [
        "Maintain momentum on renewable energy scale-up; ensure grid integration for new capacity.",
        "Finalise and implement the Green Transport Strategy before 2024.",
        "Increase domestic climate finance allocation in the national budget.",
      ],
    },
  });
  console.log("  Created 2 GapAnalysis records");

  // ── 8. Finance Needs ──────────────────────────────────────────────
  await prisma.financeNeed.createMany({
    data: [
      {
        tenantConfigId: tenant.id,
        sector: "Energy",
        category: "Mitigation",
        totalNeed: 6200.0,
        currency: "USD",
        timeframe: "2020-2030",
        domestic: 1800.0,
        international: 4400.0,
        secured: 2100.0,
        gap: 4100.0,
      },
      {
        tenantConfigId: tenant.id,
        sector: "Transport",
        category: "Mitigation",
        totalNeed: 3100.0,
        currency: "USD",
        timeframe: "2022-2035",
        domestic: 600.0,
        international: 2500.0,
        secured: 380.0,
        gap: 2720.0,
      },
      {
        tenantConfigId: tenant.id,
        sector: "Forestry",
        category: "Cross-cutting",
        totalNeed: 1800.0,
        currency: "USD",
        timeframe: "2020-2030",
        domestic: 400.0,
        international: 1400.0,
        secured: 520.0,
        gap: 1280.0,
      },
      {
        tenantConfigId: tenant.id,
        sector: "Agriculture",
        category: "Adaptation",
        totalNeed: 2400.0,
        currency: "USD",
        timeframe: "2021-2030",
        domestic: 500.0,
        international: 1900.0,
        secured: 310.0,
        gap: 2090.0,
      },
      {
        tenantConfigId: tenant.id,
        sector: "Water and Sanitation",
        category: "Adaptation",
        totalNeed: 1500.0,
        currency: "USD",
        timeframe: "2020-2030",
        domestic: 350.0,
        international: 1150.0,
        secured: 220.0,
        gap: 1280.0,
      },
      {
        tenantConfigId: tenant.id,
        sector: "Health",
        category: "Adaptation",
        totalNeed: 800.0,
        currency: "USD",
        timeframe: "2022-2030",
        domestic: 250.0,
        international: 550.0,
        secured: 90.0,
        gap: 710.0,
      },
    ],
  });
  console.log("  Created 6 FinanceNeed records");

  console.log("\nSeed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
