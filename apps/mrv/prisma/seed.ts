import { PrismaClient, Prisma, GHGType, QAQCType } from "../node_modules/.prisma/mrv-client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding MRV database...");

  // ── 1. Tenant Config ──────────────────────────────────────────────────
  const tenant = await prisma.tenantConfig.upsert({
    where: { portalTenantId: "default" },
    update: {},
    create: {
      portalTenantId: "default",
      countryCode: "KE",
      countryName: "Kenya",
      baseYear: 2015,
      defaultTier: 1,
      gwpSource: "AR5",
    },
  });

  console.log(`  TenantConfig created: ${tenant.id}`);

  // ── 2. Inventories ────────────────────────────────────────────────────
  const inventory2022 = await prisma.inventory.upsert({
    where: {
      tenantConfigId_year: { tenantConfigId: tenant.id, year: 2022 },
    },
    update: {},
    create: {
      tenantConfigId: tenant.id,
      year: 2022,
      status: "APPROVED",
      totalEmissions: 94520.45,
      totalRemovals: -12340.12,
      netEmissions: 82180.33,
      submittedAt: new Date("2023-06-15"),
      approvedAt: new Date("2023-09-01"),
    },
  });

  const inventory2023 = await prisma.inventory.upsert({
    where: {
      tenantConfigId_year: { tenantConfigId: tenant.id, year: 2023 },
    },
    update: {},
    create: {
      tenantConfigId: tenant.id,
      year: 2023,
      status: "DRAFT",
      totalEmissions: 97830.6,
      totalRemovals: -11980.55,
      netEmissions: 85850.05,
    },
  });

  console.log(
    `  Inventories created: ${inventory2022.id}, ${inventory2023.id}`
  );

  // ── 3. Sector definitions ─────────────────────────────────────────────
  const sectorDefs = [
    {
      sectorCode: "1",
      sectorName: "Energy",
      co2: 42150.2,
      ch4: 1820.5,
      n2o: 310.8,
    },
    {
      sectorCode: "2",
      sectorName: "Industrial Processes and Product Use",
      co2: 8920.1,
      ch4: 45.3,
      n2o: 120.6,
    },
    {
      sectorCode: "3",
      sectorName: "Agriculture, Forestry and Other Land Use",
      co2: 1250.0,
      ch4: 18400.0,
      n2o: 5620.0,
    },
    {
      sectorCode: "3B",
      sectorName: "Land Use, Land-Use Change and Forestry",
      co2: -12340.12,
      ch4: 0,
      n2o: 0,
    },
    {
      sectorCode: "4",
      sectorName: "Waste",
      co2: 520.4,
      ch4: 6340.2,
      n2o: 182.5,
    },
  ];

  // Create sector data for both inventories
  for (const inv of [inventory2022, inventory2023]) {
    const multiplier = inv.year === 2023 ? 1.035 : 1; // ~3.5 % growth for 2023

    for (const s of sectorDefs) {
      const co2 = +(s.co2 * multiplier).toFixed(2);
      const ch4 = +(s.ch4 * multiplier).toFixed(2);
      const n2o = +(s.n2o * multiplier).toFixed(2);
      // AR5 GWPs: CH4 = 28, N2O = 265
      const totalCO2eq = +(co2 + ch4 * 28 + n2o * 265).toFixed(2);

      await prisma.sectorData.upsert({
        where: {
          inventoryId_sectorCode: {
            inventoryId: inv.id,
            sectorCode: s.sectorCode,
          },
        },
        update: {},
        create: {
          inventoryId: inv.id,
          sectorCode: s.sectorCode,
          sectorName: s.sectorName,
          co2Emissions: co2,
          ch4Emissions: ch4,
          n2oEmissions: n2o,
          totalCO2eq,
        },
      });
    }
  }

  console.log("  SectorData created for both inventories");

  // ── 4. Category, Activity Data & Emission Factors ─────────────────────
  // Grab the Energy sector for 2022 to attach detailed sub-data
  const energySector2022 = await prisma.sectorData.findUnique({
    where: {
      inventoryId_sectorCode: {
        inventoryId: inventory2022.id,
        sectorCode: "1",
      },
    },
  });

  if (!energySector2022) throw new Error("Energy sector not found");

  // Category: 1.A.1 - Energy Industries (electricity & heat production)
  const catEnergyIndustries = await prisma.categoryData.upsert({
    where: {
      sectorDataId_categoryCode: {
        sectorDataId: energySector2022.id,
        categoryCode: "1.A.1",
      },
    },
    update: {},
    create: {
      sectorDataId: energySector2022.id,
      categoryCode: "1.A.1",
      categoryName: "Energy Industries",
      tier: 1,
      methodology: "IPCC 2006 Guidelines, Volume 2, Chapter 2",
      co2Emissions: 28500.0,
      ch4Emissions: 120.0,
      n2oEmissions: 45.0,
      totalCO2eq: +(28500 + 120 * 28 + 45 * 265).toFixed(2),
      uncertaintyLower: -15,
      uncertaintyUpper: 15,
      dataSource: "Kenya Power and Lighting Company annual reports",
      assumptions: "Grid emission factor based on national generation mix",
    },
  });

  // Category: 1.A.3 - Transport
  const catTransport = await prisma.categoryData.upsert({
    where: {
      sectorDataId_categoryCode: {
        sectorDataId: energySector2022.id,
        categoryCode: "1.A.3",
      },
    },
    update: {},
    create: {
      sectorDataId: energySector2022.id,
      categoryCode: "1.A.3",
      categoryName: "Transport",
      tier: 1,
      methodology: "IPCC 2006 Guidelines, Volume 2, Chapter 3",
      co2Emissions: 10250.5,
      ch4Emissions: 1540.3,
      n2oEmissions: 210.6,
      totalCO2eq: +(10250.5 + 1540.3 * 28 + 210.6 * 265).toFixed(2),
      uncertaintyLower: -20,
      uncertaintyUpper: 25,
      dataSource: "Kenya National Bureau of Statistics; Kenya Revenue Authority fuel import data",
      assumptions:
        "All imported fuel assumed consumed domestically; no international bunkers separation",
    },
  });

  // Activity Data: Electricity generation
  const adElectricity = await prisma.activityData.create({
    data: {
      categoryDataId: catEnergyIndustries.id,
      name: "Grid Electricity Generation",
      value: 11700,
      unit: "GWh",
      dataSource: "Kenya Power and Lighting Company",
      collectionMethod: "Direct measurement from utility records",
      uncertainty: 5.0,
      startDate: new Date("2022-01-01"),
      endDate: new Date("2022-12-31"),
    },
  });

  // Activity Data: Diesel consumption for transport
  const adDiesel = await prisma.activityData.create({
    data: {
      categoryDataId: catTransport.id,
      name: "Diesel Fuel Consumption - Road Transport",
      value: 3250000,
      unit: "m3",
      dataSource: "Kenya Revenue Authority; Petroleum Institute of East Africa",
      collectionMethod: "Fuel sales statistics and import records",
      uncertainty: 10.0,
      startDate: new Date("2022-01-01"),
      endDate: new Date("2022-12-31"),
    },
  });

  // Activity Data: Gasoline consumption for transport
  const adGasoline = await prisma.activityData.create({
    data: {
      categoryDataId: catTransport.id,
      name: "Gasoline Fuel Consumption - Road Transport",
      value: 1820000,
      unit: "m3",
      dataSource: "Kenya Revenue Authority; Petroleum Institute of East Africa",
      collectionMethod: "Fuel sales statistics and import records",
      uncertainty: 10.0,
      startDate: new Date("2022-01-01"),
      endDate: new Date("2022-12-31"),
    },
  });

  console.log("  ActivityData created");

  // ── 5. Emission Factors ───────────────────────────────────────────────
  const efGridCO2 = await prisma.emissionFactor.create({
    data: {
      tenantConfigId: tenant.id,
      isDefault: false,
      code: "EF-KE-GRID-CO2",
      name: "Kenya Grid Electricity CO2 Emission Factor",
      categoryCode: "1.A.1",
      gas: GHGType.CO2,
      value: 0.4326,
      unit: "tCO2/MWh",
      source: "UNFCCC CDM - Kenya grid emission factor",
      reference: "Kenya standardized baseline, 2022",
      year: 2022,
      uncertaintyLower: -8,
      uncertaintyUpper: 8,
    },
  });

  const efDieselCO2 = await prisma.emissionFactor.create({
    data: {
      tenantConfigId: tenant.id,
      isDefault: true,
      code: "EF-DIESEL-CO2",
      name: "Diesel Combustion CO2 Emission Factor",
      categoryCode: "1.A.3",
      gas: GHGType.CO2,
      value: 2.676,
      unit: "tCO2/m3",
      source: "IPCC 2006 Guidelines - Volume 2, Table 3.2.1",
      reference: "IPCC default for gas/diesel oil",
      year: 2006,
      uncertaintyLower: -3,
      uncertaintyUpper: 3,
    },
  });

  const efDieselCH4 = await prisma.emissionFactor.create({
    data: {
      tenantConfigId: tenant.id,
      isDefault: true,
      code: "EF-DIESEL-CH4",
      name: "Diesel Combustion CH4 Emission Factor",
      categoryCode: "1.A.3",
      gas: GHGType.CH4,
      value: 0.003861,
      unit: "tCH4/m3",
      source: "IPCC 2006 Guidelines - Volume 2, Table 3.2.2",
      reference: "IPCC default for gas/diesel oil",
      year: 2006,
      uncertaintyLower: -50,
      uncertaintyUpper: 100,
    },
  });

  const efGasolineCO2 = await prisma.emissionFactor.create({
    data: {
      tenantConfigId: tenant.id,
      isDefault: true,
      code: "EF-GASOLINE-CO2",
      name: "Gasoline Combustion CO2 Emission Factor",
      categoryCode: "1.A.3",
      gas: GHGType.CO2,
      value: 2.296,
      unit: "tCO2/m3",
      source: "IPCC 2006 Guidelines - Volume 2, Table 3.2.1",
      reference: "IPCC default for motor gasoline",
      year: 2006,
      uncertaintyLower: -3,
      uncertaintyUpper: 3,
    },
  });

  console.log("  EmissionFactors created");

  // ── 6. Emission Calculations ──────────────────────────────────────────
  // Grid electricity: 11700 GWh = 11,700,000 MWh * 0.4326 tCO2/MWh
  await prisma.emissionCalculation.create({
    data: {
      activityDataId: adElectricity.id,
      emissionFactorId: efGridCO2.id,
      rawEmission: +(11700000 * 0.4326).toFixed(2),
      gwpFactor: 1, // CO2 GWP = 1
      co2eqEmission: +(11700000 * 0.4326).toFixed(2),
      tier: 1,
      equation: "Emissions = Activity Data (MWh) x EF (tCO2/MWh)",
    },
  });

  // Diesel transport CO2: 3,250,000 m3 * 2.676 tCO2/m3
  await prisma.emissionCalculation.create({
    data: {
      activityDataId: adDiesel.id,
      emissionFactorId: efDieselCO2.id,
      rawEmission: +(3250000 * 2.676).toFixed(2),
      gwpFactor: 1,
      co2eqEmission: +(3250000 * 2.676).toFixed(2),
      tier: 1,
      equation: "Emissions = Fuel Consumed (m3) x EF (tCO2/m3)",
    },
  });

  // Diesel transport CH4: 3,250,000 m3 * 0.003861 tCH4/m3 => CO2eq * 28
  const dieselCH4Raw = +(3250000 * 0.003861).toFixed(2);
  await prisma.emissionCalculation.create({
    data: {
      activityDataId: adDiesel.id,
      emissionFactorId: efDieselCH4.id,
      rawEmission: dieselCH4Raw,
      gwpFactor: 28,
      co2eqEmission: +(dieselCH4Raw * 28).toFixed(2),
      tier: 1,
      equation:
        "Emissions = Fuel Consumed (m3) x EF (tCH4/m3); CO2eq = raw x GWP(CH4)",
    },
  });

  // Gasoline transport CO2: 1,820,000 m3 * 2.296 tCO2/m3
  await prisma.emissionCalculation.create({
    data: {
      activityDataId: adGasoline.id,
      emissionFactorId: efGasolineCO2.id,
      rawEmission: +(1820000 * 2.296).toFixed(2),
      gwpFactor: 1,
      co2eqEmission: +(1820000 * 2.296).toFixed(2),
      tier: 1,
      equation: "Emissions = Fuel Consumed (m3) x EF (tCO2/m3)",
    },
  });

  console.log("  EmissionCalculations created");

  // ── 7. QA/QC Records ──────────────────────────────────────────────────
  await prisma.qAQCRecord.createMany({
    data: [
      {
        inventoryId: inventory2022.id,
        checkType: QAQCType.TIER1_GENERAL,
        category: null,
        status: "PASSED",
        findings: {
          summary: "General Tier 1 QC checks completed for all sectors",
          checksPerformed: [
            "Arithmetic verification of all calculations",
            "Cross-check of activity data against original sources",
            "Emission factor source verification",
            "Unit consistency check across all categories",
          ],
        },
        issues: Prisma.DbNull,
        recommendations: {
          items: [
            "Consider upgrading to Tier 2 for Energy Industries given data availability",
          ],
        },
        reviewedBy: "Dr. Alice Wanjiku",
        reviewedAt: new Date("2023-07-10"),
        comments: "All Tier 1 general checks passed successfully.",
      },
      {
        inventoryId: inventory2022.id,
        checkType: QAQCType.TIER1_CATEGORY,
        category: "1.A.1 - Energy Industries",
        status: "PASSED_WITH_COMMENTS",
        findings: {
          summary: "Category-specific QC for Energy Industries",
          checksPerformed: [
            "Activity data comparison with prior year",
            "Emission factor applicability review",
            "Outlier detection on monthly generation data",
          ],
        },
        issues: {
          items: [
            {
              severity: "low",
              description:
                "Minor discrepancy (0.3%) between utility-reported generation and grid dispatch data",
              resolution: "Accepted - within measurement uncertainty bounds",
            },
          ],
        },
        recommendations: {
          items: [
            "Reconcile utility reports with dispatch data annually before inventory compilation",
          ],
        },
        reviewedBy: "Eng. James Otieno",
        reviewedAt: new Date("2023-07-15"),
        comments:
          "Minor discrepancy noted but within acceptable Tier 1 uncertainty.",
      },
      {
        inventoryId: inventory2022.id,
        checkType: QAQCType.COMPLETENESS,
        category: null,
        status: "PASSED",
        findings: {
          summary: "Completeness check across all IPCC source categories",
          coveredCategories: [
            "1.A.1",
            "1.A.2",
            "1.A.3",
            "1.A.4",
            "2.A",
            "2.B",
            "3.A",
            "3.B",
            "4.A",
            "4.D",
          ],
          notEstimated: ["2.F - ODS Substitutes (data not available)"],
        },
        issues: Prisma.DbNull,
        recommendations: {
          items: [
            "Initiate data collection for ODS substitute gases for next inventory cycle",
          ],
        },
        reviewedBy: "Dr. Alice Wanjiku",
        reviewedAt: new Date("2023-08-01"),
        comments: null,
      },
      {
        inventoryId: inventory2023.id,
        checkType: QAQCType.TIER1_GENERAL,
        category: null,
        status: "PENDING",
        findings: Prisma.DbNull,
        issues: Prisma.DbNull,
        recommendations: Prisma.DbNull,
        reviewedBy: null,
        reviewedAt: null,
        comments: "Awaiting completion of 2023 inventory compilation.",
      },
      {
        inventoryId: inventory2023.id,
        checkType: QAQCType.CONSISTENCY,
        category: null,
        status: "IN_PROGRESS",
        findings: {
          summary:
            "Time-series consistency check between 2022 and 2023 inventories",
          checksPerformed: [
            "Year-over-year trend analysis for all sectors",
            "Implied emission factor consistency",
          ],
        },
        issues: {
          items: [
            {
              severity: "medium",
              description:
                "LULUCF sector shows 3% decrease in removals - needs justification",
              resolution: "Under investigation",
            },
          ],
        },
        recommendations: Prisma.DbNull,
        reviewedBy: "Dr. Grace Muthoni",
        reviewedAt: null,
        comments: "Initial consistency checks in progress.",
      },
    ],
  });

  console.log("  QAQCRecords created");
  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
