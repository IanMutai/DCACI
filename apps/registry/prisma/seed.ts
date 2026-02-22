import { PrismaClient } from "../node_modules/.prisma/registry-client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding registry database...");

  // Create a tenant config
  const tenant = await prisma.tenantConfig.upsert({
    where: { portalTenantId: "ug-portal-001" },
    update: {},
    create: {
      portalTenantId: "ug-portal-001",
      countryCode: "UG",
      registryName: "Uganda Carbon Credit Registry",
      settings: {
        currency: "UGX",
        language: "en",
        requiresArticle6Approval: true,
      },
    },
  });
  console.log("Created tenant:", tenant.registryName);

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      tenantConfigId: tenant.id,
      title: "Lake Victoria Cookstove Distribution Programme",
      description:
        "Distribution of efficient cookstoves to households in the Lake Victoria basin to reduce biomass fuel consumption and associated emissions.",
      methodology: "AMS-II.G: Energy efficiency measures in thermal applications of non-renewable biomass",
      sector: "Energy",
      projectType: "Cookstove Distribution",
      status: "ACTIVE",
      startDate: new Date("2023-01-15"),
      endDate: new Date("2033-01-14"),
      creditingPeriodStart: new Date("2023-06-01"),
      creditingPeriodEnd: new Date("2030-05-31"),
      location: "Lake Victoria Basin, Uganda",
      coordinates: { lat: 0.3476, lng: 32.5825 },
      proponentName: "Uganda Clean Energy Initiative",
      proponentContact: "info@ugandacleanenergy.org",
      estimatedReductions: 250000,
      verifiedReductions: 48500,
      isArticle6: true,
      correspondingAdjustment: true,
    },
  });
  console.log("Created project:", project1.title);

  const project2 = await prisma.project.create({
    data: {
      tenantConfigId: tenant.id,
      title: "Murchison Falls Reforestation Project",
      description:
        "Large-scale reforestation of degraded lands in the Murchison Falls National Park buffer zone using native tree species.",
      methodology: "AR-ACM0003: Afforestation and reforestation of lands",
      sector: "Forestry",
      projectType: "Reforestation",
      status: "REGISTERED",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2054-02-28"),
      creditingPeriodStart: new Date("2024-03-01"),
      creditingPeriodEnd: new Date("2044-02-28"),
      location: "Murchison Falls, Northern Uganda",
      coordinates: { lat: 2.2833, lng: 31.6833 },
      proponentName: "Uganda Forestry Authority",
      proponentContact: "projects@nfa.go.ug",
      estimatedReductions: 500000,
      isArticle6: false,
      correspondingAdjustment: false,
    },
  });
  console.log("Created project:", project2.title);

  // Create credits for project 1
  const credits = [];
  for (let i = 1; i <= 5; i++) {
    const credit = await prisma.credit.create({
      data: {
        projectId: project1.id,
        serialNumber: `UG-LVC-2024-${String(i).padStart(5, "0")}`,
        vintage: 2024,
        quantity: 1000,
        unit: "tCO2e",
        status: i <= 3 ? "ACTIVE" : i === 4 ? "TRANSFERRED" : "RETIRED",
        currentHolder:
          i <= 3
            ? "Uganda Clean Energy Initiative"
            : i === 4
              ? "Kenya Carbon Fund"
              : undefined,
        isItmo: i <= 2,
        correspondingAdjustmentApplied: i <= 2,
        retiredAt: i === 5 ? new Date("2024-11-15") : undefined,
        metadata: {
          verificationBody: "Bureau Veritas",
          verificationDate: "2024-06-15",
          monitoringPeriod: "2024-H1",
        },
      },
    });
    credits.push(credit);
  }
  console.log(`Created ${credits.length} credits`);

  // Create transfers
  const transfer1 = await prisma.transfer.create({
    data: {
      creditId: credits[3].id, // The TRANSFERRED credit
      fromEntity: "Uganda Clean Energy Initiative",
      toEntity: "Kenya Carbon Fund",
      quantity: 1000,
      transferType: "INTERNATIONAL_TRANSFER",
      reason: "Bilateral agreement under Article 6.2",
      executedAt: new Date("2024-09-01"),
    },
  });
  console.log("Created transfer:", transfer1.id);

  const transfer2 = await prisma.transfer.create({
    data: {
      creditId: credits[4].id, // The RETIRED credit
      fromEntity: "Uganda Clean Energy Initiative",
      toEntity: "Uganda NDC Account",
      quantity: 1000,
      transferType: "RETIREMENT",
      reason: "Voluntary cancellation for NDC contribution",
      executedAt: new Date("2024-11-15"),
    },
  });
  console.log("Created transfer:", transfer2.id);

  // Create a monitoring report
  await prisma.monitoringReport.create({
    data: {
      projectId: project1.id,
      reportingPeriodStart: new Date("2024-01-01"),
      reportingPeriodEnd: new Date("2024-06-30"),
      verifiedReductions: 24500,
      reportUrl: "https://registry.example.com/reports/lvc-2024-h1.pdf",
      verifierName: "Bureau Veritas",
      verificationDate: new Date("2024-08-15"),
      status: "VERIFIED",
    },
  });
  console.log("Created monitoring report");

  console.log("Seeding completed.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
