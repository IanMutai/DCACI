import { PrismaClient, UserRole } from "../node_modules/.prisma/portal-client";

const prisma = new PrismaClient();

/**
 * Pre-computed bcrypt hash for "admin123" (12 rounds).
 * Generated via: require('bcrypt').hashSync('admin123', 12)
 */
const ADMIN_PASSWORD_HASH =
  "$2b$12$LJ3m4ys3Lk0TSwHCbMquBOBZ0RoGjTUfMhPqONRcKdP1jFhSq6Dm6";

async function main() {
  console.log("Seeding portal database...");

  // ---------------------------------------------------------------
  // 1. Default Tenant
  // ---------------------------------------------------------------
  const tenant = await prisma.tenant.upsert({
    where: { slug: "kenya-climate-authority" },
    update: {},
    create: {
      name: "Kenya Climate Authority",
      slug: "kenya-climate-authority",
      countryCode: "KE",
      countryName: "Kenya",
      mrvEnabled: true,
      ndcEnabled: true,
      registryEnabled: true,
      mrvModules: {
        emissions: true,
        reporting: true,
        verification: true,
      },
      ndcModules: {
        targets: true,
        tracking: true,
        planning: true,
      },
      registryModules: {
        projects: true,
        credits: true,
        transfers: true,
      },
      onboardingComplete: true,
      onboardingStep: 5,
    },
  });

  console.log(`  Tenant created: ${tenant.name} (${tenant.id})`);

  // ---------------------------------------------------------------
  // 2. Admin User
  // ---------------------------------------------------------------
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@nctp.local" },
    update: {},
    create: {
      email: "admin@nctp.local",
      name: "Portal Admin",
      passwordHash: ADMIN_PASSWORD_HASH,
      role: UserRole.TENANT_ADMIN,
      permissions: JSON.stringify([
        "tenant:manage",
        "users:manage",
        "modules:manage",
        "audit:view",
      ]),
      mrvRole: "admin",
      ndcRole: "admin",
      registryRole: "admin",
      tenantId: tenant.id,
      isActive: true,
      emailVerified: new Date(),
      lastLogin: new Date(),
    },
  });

  console.log(`  Admin user created: ${adminUser.email} (${adminUser.id})`);

  // ---------------------------------------------------------------
  // 3. Regular User
  // ---------------------------------------------------------------
  const regularUser = await prisma.user.upsert({
    where: { email: "user@nctp.local" },
    update: {},
    create: {
      email: "user@nctp.local",
      name: "Regular User",
      role: UserRole.USER,
      permissions: JSON.stringify(["modules:read", "audit:view"]),
      mrvRole: "viewer",
      ndcRole: "viewer",
      registryRole: "viewer",
      tenantId: tenant.id,
      isActive: true,
      emailVerified: new Date(),
    },
  });

  console.log(`  Regular user created: ${regularUser.email} (${regularUser.id})`);

  // ---------------------------------------------------------------
  // 4. Module Configs – MRV, NDC, Registry
  // ---------------------------------------------------------------
  const moduleConfigs = [
    {
      service: "mrv",
      module: "emissions",
      name: "Emissions Monitoring",
      description:
        "Track and report greenhouse gas emissions across sectors and facilities.",
      defaultConfig: {
        reportingFrequency: "quarterly",
        sectors: ["energy", "transport", "agriculture", "waste", "industry"],
        units: "tCO2e",
      },
      dependencies: JSON.stringify([]),
      isCore: true,
    },
    {
      service: "mrv",
      module: "verification",
      name: "Verification & QA/QC",
      description:
        "Third-party verification workflows for submitted emission reports.",
      defaultConfig: {
        verifierApprovalRequired: true,
        qcChecks: ["completeness", "consistency", "accuracy"],
      },
      dependencies: JSON.stringify(["emissions"]),
      isCore: false,
    },
    {
      service: "ndc",
      module: "targets",
      name: "NDC Targets Management",
      description:
        "Define, track, and update nationally determined contribution targets.",
      defaultConfig: {
        baselineYear: 2015,
        targetYear: 2030,
        conditionalReduction: 32,
        unconditionalReduction: 7,
      },
      dependencies: JSON.stringify([]),
      isCore: true,
    },
    {
      service: "ndc",
      module: "tracking",
      name: "NDC Progress Tracking",
      description:
        "Monitor implementation progress of NDC actions and mitigation measures.",
      defaultConfig: {
        trackingInterval: "annual",
        indicators: ["ghg_reduction", "renewable_energy", "forest_cover"],
      },
      dependencies: JSON.stringify(["targets"]),
      isCore: false,
    },
    {
      service: "registry",
      module: "projects",
      name: "Project Registry",
      description:
        "Register and manage climate mitigation and adaptation projects.",
      defaultConfig: {
        projectTypes: ["mitigation", "adaptation", "redd+"],
        approvalWorkflow: ["submission", "review", "validation", "registration"],
      },
      dependencies: JSON.stringify([]),
      isCore: true,
    },
    {
      service: "registry",
      module: "credits",
      name: "Carbon Credits",
      description:
        "Issue, track, and retire carbon credits from registered projects.",
      defaultConfig: {
        creditTypes: ["VER", "CER", "A6.4ER"],
        vintageTracking: true,
      },
      dependencies: JSON.stringify(["projects"]),
      isCore: false,
    },
  ];

  for (const cfg of moduleConfigs) {
    const record = await prisma.moduleConfig.create({ data: cfg });
    console.log(`  ModuleConfig created: ${record.service}/${record.module}`);
  }

  // ---------------------------------------------------------------
  // 5. Sample Audit Logs
  // ---------------------------------------------------------------
  const auditEntries = [
    {
      action: "TENANT_CREATED",
      entity: "Tenant",
      entityId: tenant.id,
      details: { tenantName: tenant.name },
      userId: adminUser.id,
      ipAddress: "127.0.0.1",
      userAgent: "seed-script",
    },
    {
      action: "USER_CREATED",
      entity: "User",
      entityId: adminUser.id,
      details: { email: adminUser.email, role: "TENANT_ADMIN" },
      userId: adminUser.id,
      ipAddress: "127.0.0.1",
      userAgent: "seed-script",
    },
    {
      action: "USER_CREATED",
      entity: "User",
      entityId: regularUser.id,
      details: { email: regularUser.email, role: "USER" },
      userId: adminUser.id,
      ipAddress: "127.0.0.1",
      userAgent: "seed-script",
    },
    {
      action: "MODULE_ENABLED",
      entity: "Tenant",
      entityId: tenant.id,
      details: { modules: ["mrv", "ndc", "registry"] },
      userId: adminUser.id,
      ipAddress: "127.0.0.1",
      userAgent: "seed-script",
    },
    {
      action: "ONBOARDING_COMPLETED",
      entity: "Tenant",
      entityId: tenant.id,
      details: { completedAt: new Date().toISOString() },
      userId: adminUser.id,
      ipAddress: "127.0.0.1",
      userAgent: "seed-script",
    },
  ];

  for (const entry of auditEntries) {
    await prisma.auditLog.create({ data: entry });
  }

  console.log(`  AuditLog entries created: ${auditEntries.length}`);

  console.log("\nSeeding complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
