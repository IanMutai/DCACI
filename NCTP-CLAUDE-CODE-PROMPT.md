# NCTP Platform Build Prompt for Claude Code

## Project Overview

You are building the **National Climate Transparency Platform (NCTP)** - an integrated suite of three climate transparency systems for countries to meet their Paris Agreement obligations. The architecture follows a **microservices pattern with API-based communication** (no shared database).

## Architecture Philosophy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NCTP PORTAL (Gateway)                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  Dashboard  │  │  Onboarding │  │   Module    │  │  Unified Settings   │ │
│  │   Unified   │  │    Wizard   │  │  Selector   │  │   & User Mgmt       │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
          │                    │                    │
          │ REST/GraphQL       │ REST/GraphQL       │ REST/GraphQL
          ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   MRV SERVICE   │  │  NDC SERVICE    │  │ REGISTRY SERVICE│
│                 │  │                 │  │                 │
│  ┌───────────┐  │  │  ┌───────────┐  │  │  ┌───────────┐  │
│  │ Inventory │  │  │  │  Targets  │  │  │  │ Projects  │  │
│  │  Module   │  │  │  │  Module   │  │  │  │  Module   │  │
│  ├───────────┤  │  │  ├───────────┤  │  │  ├───────────┤  │
│  │   QA/QC   │  │  │  │ Progress  │  │  │  │  Credits  │  │
│  │  Module   │  │  │  │  Module   │  │  │  │  Module   │  │
│  ├───────────┤  │  │  ├───────────┤  │  │  ├───────────┤  │
│  │ Reporting │  │  │  │ Policies  │  │  │  │   ITMO    │  │
│  │  Module   │  │  │  │  Module   │  │  │  │  Module   │  │
│  └───────────┘  │  │  └───────────┘  │  │  └───────────┘  │
│                 │  │                 │  │                 │
│  ┌───────────┐  │  │  ┌───────────┐  │  │  ┌───────────┐  │
│  │ PostgreSQL│  │  │  │ PostgreSQL│  │  │  │ PostgreSQL│  │
│  │  (Own DB) │  │  │  │  (Own DB) │  │  │  │  (Own DB) │  │
│  └───────────┘  │  │  └───────────┘  │  │  └───────────┘  │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Target Folder Structure

Transform the current folder into this monorepo structure:

```
NCTP/
├── README.md                          # Monorepo overview
├── docker-compose.yml                 # Run all services locally
├── docker-compose.dev.yml             # Development overrides
├── package.json                       # Root workspace config
├── turbo.json                         # Turborepo config (optional)
├── .env.example                       # Environment template
│
├── apps/
│   ├── portal/                        # NEW: Unified Gateway/Interface
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── prisma/
│   │   │   └── schema.prisma          # Portal-specific (users, tenants, modules)
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               # Landing/Marketing page
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── forgot-password/
│   │   │   ├── (onboarding)/
│   │   │   │   ├── welcome/
│   │   │   │   ├── country-profile/
│   │   │   │   ├── module-selection/
│   │   │   │   ├── mrv-setup/
│   │   │   │   ├── ndc-setup/
│   │   │   │   ├── registry-setup/
│   │   │   │   └── complete/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── layout.tsx         # Authenticated layout
│   │   │   │   ├── page.tsx           # Unified dashboard
│   │   │   │   ├── mrv/               # MRV module wrapper
│   │   │   │   ├── ndc/               # NDC module wrapper
│   │   │   │   ├── registry/          # Registry module wrapper
│   │   │   │   ├── integration/       # Cross-system views
│   │   │   │   ├── reports/           # Unified reporting (BTR)
│   │   │   │   └── settings/
│   │   │   └── api/
│   │   │       ├── auth/
│   │   │       ├── proxy/             # API proxy to services
│   │   │       │   ├── mrv/
│   │   │       │   ├── ndc/
│   │   │       │   └── registry/
│   │   │       └── webhooks/          # Receive events from services
│   │   ├── components/
│   │   │   ├── onboarding/
│   │   │   ├── dashboard/
│   │   │   ├── module-cards/
│   │   │   └── integration/
│   │   └── lib/
│   │       ├── api-clients/           # Typed clients for each service
│   │       │   ├── mrv-client.ts
│   │       │   ├── ndc-client.ts
│   │       │   └── registry-client.ts
│   │       └── hooks/
│   │
│   ├── mrv/                           # NEW: MRV System Service
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── prisma/
│   │   │   └── schema.prisma          # MRV data models
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── (modules)/
│   │   │   │   ├── inventory/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [year]/
│   │   │   │   │   ├── data-entry/
│   │   │   │   │   ├── calculations/
│   │   │   │   │   └── review/
│   │   │   │   ├── sectors/
│   │   │   │   │   ├── energy/
│   │   │   │   │   ├── ippu/
│   │   │   │   │   ├── agriculture/
│   │   │   │   │   ├── lulucf/
│   │   │   │   │   └── waste/
│   │   │   │   ├── emission-factors/
│   │   │   │   ├── activity-data/
│   │   │   │   ├── qaqc/
│   │   │   │   │   ├── checks/
│   │   │   │   │   ├── reviews/
│   │   │   │   │   └── documentation/
│   │   │   │   ├── uncertainty/
│   │   │   │   ├── key-categories/
│   │   │   │   ├── recalculations/
│   │   │   │   └── reporting/
│   │   │   │       ├── nir/
│   │   │   │       ├── btr/
│   │   │   │       └── exports/
│   │   │   └── api/
│   │   │       ├── v1/
│   │   │       │   ├── inventory/
│   │   │       │   ├── emissions/
│   │   │       │   ├── sectors/
│   │   │       │   ├── activity-data/
│   │   │       │   ├── emission-factors/
│   │   │       │   ├── qaqc/
│   │   │       │   └── reports/
│   │   │       └── webhooks/
│   │   │           └── route.ts       # Emit events to portal
│   │   ├── components/
│   │   │   ├── inventory/
│   │   │   ├── data-entry/
│   │   │   ├── calculations/
│   │   │   ├── qaqc/
│   │   │   └── reporting/
│   │   └── lib/
│   │       ├── calculations/          # IPCC calculation engine
│   │       │   ├── tier1.ts
│   │       │   ├── tier2.ts
│   │       │   └── tier3.ts
│   │       ├── emission-factors/
│   │       └── validators/
│   │
│   ├── ndc/                           # NEW: NDC Tools Service
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── prisma/
│   │   │   └── schema.prisma          # NDC data models
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── (modules)/
│   │   │   │   ├── targets/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── configure/
│   │   │   │   │   ├── [targetId]/
│   │   │   │   │   └── scenarios/
│   │   │   │   ├── progress/
│   │   │   │   │   ├── dashboard/
│   │   │   │   │   ├── tracking/
│   │   │   │   │   └── projections/
│   │   │   │   ├── policies/
│   │   │   │   │   ├── measures/
│   │   │   │   │   ├── impact-analysis/
│   │   │   │   │   └── cost-benefit/
│   │   │   │   ├── baselines/
│   │   │   │   │   ├── scenarios/
│   │   │   │   │   └── projections/
│   │   │   │   ├── gap-analysis/
│   │   │   │   ├── finance/
│   │   │   │   │   ├── needs/
│   │   │   │   │   ├── tracking/
│   │   │   │   │   └── reporting/
│   │   │   │   └── reporting/
│   │   │   │       ├── btr-chapter3/
│   │   │   │       └── ndc-updates/
│   │   │   └── api/
│   │   │       ├── v1/
│   │   │       │   ├── targets/
│   │   │       │   ├── progress/
│   │   │       │   ├── policies/
│   │   │       │   ├── baselines/
│   │   │       │   ├── projections/
│   │   │       │   └── reports/
│   │   │       └── webhooks/
│   │   ├── components/
│   │   │   ├── targets/
│   │   │   ├── progress/
│   │   │   ├── policies/
│   │   │   └── visualizations/
│   │   └── lib/
│   │       ├── calculations/
│   │       │   ├── progress-calculator.ts
│   │       │   ├── gap-analyzer.ts
│   │       │   └── projection-engine.ts
│   │       └── scenarios/
│   │
│   └── registry/                      # EXISTING: Carbon Registry (move here)
│       ├── ... (existing structure)
│       └── app/
│           └── api/
│               ├── v1/                # Add versioned API
│               │   ├── projects/
│               │   ├── credits/
│               │   ├── transactions/
│               │   ├── itmo/
│               │   └── compliance/
│               └── webhooks/
│
├── packages/                          # Shared packages
│   ├── ui/                            # Shared UI components
│   │   ├── package.json
│   │   ├── components/
│   │   │   ├── buttons/
│   │   │   ├── forms/
│   │   │   ├── tables/
│   │   │   ├── charts/
│   │   │   ├── cards/
│   │   │   └── layouts/
│   │   └── index.ts
│   │
│   ├── api-types/                     # Shared TypeScript types
│   │   ├── package.json
│   │   ├── mrv/
│   │   │   ├── inventory.ts
│   │   │   ├── emissions.ts
│   │   │   └── index.ts
│   │   ├── ndc/
│   │   │   ├── targets.ts
│   │   │   ├── policies.ts
│   │   │   └── index.ts
│   │   ├── registry/
│   │   │   ├── projects.ts
│   │   │   ├── credits.ts
│   │   │   └── index.ts
│   │   ├── common/
│   │   │   ├── user.ts
│   │   │   ├── organization.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── api-client/                    # API client library
│   │   ├── package.json
│   │   ├── mrv-client.ts
│   │   ├── ndc-client.ts
│   │   ├── registry-client.ts
│   │   └── index.ts
│   │
│   ├── config/                        # Shared configs
│   │   ├── eslint/
│   │   ├── typescript/
│   │   └── tailwind/
│   │
│   └── utils/                         # Shared utilities
│       ├── package.json
│       ├── date.ts
│       ├── format.ts
│       ├── validation.ts
│       └── index.ts
│
├── docs/                              # EXISTING: Documentation
│   ├── PLATFORM_OVERVIEW.md
│   ├── INTEGRATION_SPEC.md
│   ├── VALUE_PROPOSITION.md
│   ├── National_MRV_System_Technical_Specification.docx
│   └── NDC_Tools_Technical_Specification.docx
│
├── skills/                            # EXISTING: Claude skills
├── prompts/                           # EXISTING: Prompt library
├── guides/                            # EXISTING: User guides
├── architecture/                      # EXISTING: Architecture diagrams
└── templates/                         # EXISTING: Data templates
```

---

## PHASE 1: Monorepo Setup & Portal Foundation

### Step 1.1: Initialize Monorepo Structure

```bash
# Create the monorepo structure
mkdir -p apps/{portal,mrv,ndc}
mkdir -p packages/{ui,api-types,api-client,config,utils}

# Move existing registry
mv registry apps/registry

# Initialize root package.json with workspaces
```

Create root `package.json`:

```json
{
  "name": "nctp",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "dev:portal": "npm run dev --workspace=apps/portal",
    "dev:mrv": "npm run dev --workspace=apps/mrv",
    "dev:ndc": "npm run dev --workspace=apps/ndc",
    "dev:registry": "npm run dev --workspace=apps/registry",
    "db:migrate": "turbo run db:migrate",
    "db:seed": "turbo run db:seed"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

### Step 1.2: Create Portal Application

The Portal is the unified entry point. Initialize with:

```bash
cd apps/portal
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false
```

Portal's key responsibilities:
1. **Authentication & User Management** (single sign-on for all services)
2. **Onboarding Wizard** (modular setup flow)
3. **Unified Dashboard** (aggregated view from all services)
4. **API Gateway** (proxy requests to individual services)
5. **Module Management** (enable/disable features per tenant)

### Step 1.3: Portal Database Schema

```prisma
// apps/portal/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("PORTAL_DATABASE_URL")
}

// Multi-tenant support
model Tenant {
  id                String   @id @default(cuid())
  name              String   // Country or organization name
  slug              String   @unique
  countryCode       String?  // ISO 3166-1 alpha-3
  countryName       String?
  logo              String?

  // Module activation
  mrvEnabled        Boolean  @default(false)
  ndcEnabled        Boolean  @default(false)
  registryEnabled   Boolean  @default(false)

  // Sub-module activation (JSON for flexibility)
  mrvModules        Json     @default("{}")
  ndcModules        Json     @default("{}")
  registryModules   Json     @default("{}")

  // Service endpoints (if services run separately)
  mrvEndpoint       String?
  ndcEndpoint       String?
  registryEndpoint  String?

  // Onboarding status
  onboardingComplete Boolean @default(false)
  onboardingStep     Int     @default(0)

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  users             User[]
  apiKeys           ApiKey[]
  webhooks          Webhook[]
}

model User {
  id                String   @id @default(cuid())
  email             String   @unique
  name              String?
  passwordHash      String?

  // OAuth providers
  googleId          String?  @unique
  microsoftId       String?  @unique

  // Role and permissions
  role              UserRole @default(USER)
  permissions       Json     @default("[]")

  // Module-specific roles
  mrvRole           String?
  ndcRole           String?
  registryRole      String?

  tenantId          String
  tenant            Tenant   @relation(fields: [tenantId], references: [id])

  isActive          Boolean  @default(true)
  emailVerified     DateTime?
  lastLogin         DateTime?

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  sessions          Session[]
  auditLogs         AuditLog[]
}

enum UserRole {
  SUPER_ADMIN      // Platform admin
  TENANT_ADMIN     // Country/org admin
  MANAGER          // Department manager
  USER             // Regular user
  VIEWER           // Read-only
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires      DateTime
}

model ApiKey {
  id          String    @id @default(cuid())
  name        String
  key         String    @unique
  tenantId    String
  tenant      Tenant    @relation(fields: [tenantId], references: [id])

  // Permissions
  scopes      Json      @default("[]")

  lastUsed    DateTime?
  expiresAt   DateTime?
  isActive    Boolean   @default(true)

  createdAt   DateTime  @default(now())
}

model Webhook {
  id          String   @id @default(cuid())
  name        String
  url         String
  secret      String

  tenantId    String
  tenant      Tenant   @relation(fields: [tenantId], references: [id])

  // Events to subscribe to
  events      Json     @default("[]")

  isActive    Boolean  @default(true)
  lastTriggered DateTime?

  createdAt   DateTime @default(now())
}

model AuditLog {
  id          String   @id @default(cuid())
  action      String
  entity      String
  entityId    String?
  details     Json?

  userId      String?
  user        User?    @relation(fields: [userId], references: [id])

  ipAddress   String?
  userAgent   String?

  createdAt   DateTime @default(now())
}

// Module configuration templates
model ModuleConfig {
  id          String   @id @default(cuid())
  service     String   // mrv, ndc, registry
  module      String   // inventory, targets, projects, etc.
  name        String
  description String?

  // Default configuration
  defaultConfig Json   @default("{}")

  // Dependencies on other modules
  dependencies  Json   @default("[]")

  isCore      Boolean  @default(false) // Cannot be disabled

  createdAt   DateTime @default(now())
}
```

---

## PHASE 2: MRV System Scaffold

### Step 2.1: Initialize MRV Application

```bash
cd apps/mrv
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false
npm install prisma @prisma/client
npm install zod @tanstack/react-query axios
```

### Step 2.2: MRV Database Schema

```prisma
// apps/mrv/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("MRV_DATABASE_URL")
}

// Tenant reference (synced from Portal)
model TenantConfig {
  id              String   @id @default(cuid())
  portalTenantId  String   @unique
  countryCode     String
  countryName     String
  baseYear        Int

  // MRV-specific settings
  defaultTier     Int      @default(1)
  gwpSource       String   @default("AR5")

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  inventories     Inventory[]
  emissionFactors EmissionFactor[]
}

// ==================== INVENTORY ====================

model Inventory {
  id              String   @id @default(cuid())
  tenantConfigId  String
  tenantConfig    TenantConfig @relation(fields: [tenantConfigId], references: [id])

  year            Int
  status          InventoryStatus @default(DRAFT)

  // Totals (calculated)
  totalEmissions  Float?
  totalRemovals   Float?
  netEmissions    Float?

  // Metadata
  submittedAt     DateTime?
  approvedAt      DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  sectorData      SectorData[]
  qaqcRecords     QAQCRecord[]

  @@unique([tenantConfigId, year])
}

enum InventoryStatus {
  DRAFT
  IN_REVIEW
  APPROVED
  SUBMITTED
  PUBLISHED
}

model SectorData {
  id              String   @id @default(cuid())
  inventoryId     String
  inventory       Inventory @relation(fields: [inventoryId], references: [id])

  sectorCode      String   // 1, 2, 3, 4, 5
  sectorName      String   // Energy, IPPU, Agriculture, LULUCF, Waste

  // Aggregated emissions by gas
  co2Emissions    Float    @default(0)
  ch4Emissions    Float    @default(0)
  n2oEmissions    Float    @default(0)
  hfcEmissions    Float    @default(0)
  pfcEmissions    Float    @default(0)
  sf6Emissions    Float    @default(0)
  nf3Emissions    Float    @default(0)

  // Total in CO2eq
  totalCO2eq      Float    @default(0)

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  categories      CategoryData[]

  @@unique([inventoryId, sectorCode])
}

model CategoryData {
  id              String   @id @default(cuid())
  sectorDataId    String
  sectorData      SectorData @relation(fields: [sectorDataId], references: [id])

  categoryCode    String   // e.g., 1A1a, 3A1
  categoryName    String

  // Methodology
  tier            Int      @default(1)
  methodology     String?

  // Emissions by gas
  co2Emissions    Float    @default(0)
  ch4Emissions    Float    @default(0)
  n2oEmissions    Float    @default(0)

  totalCO2eq      Float    @default(0)

  // Uncertainty
  uncertaintyLower Float?
  uncertaintyUpper Float?

  // Documentation
  dataSource      String?
  assumptions     String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  activityData    ActivityData[]

  @@unique([sectorDataId, categoryCode])
}

// ==================== ACTIVITY DATA ====================

model ActivityData {
  id              String   @id @default(cuid())
  categoryDataId  String
  categoryData    CategoryData @relation(fields: [categoryDataId], references: [id])

  name            String
  value           Float
  unit            String

  // Data quality
  dataSource      String?
  collectionMethod String?
  uncertainty     Float?

  // Temporal
  startDate       DateTime?
  endDate         DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  calculations    EmissionCalculation[]
}

// ==================== EMISSION FACTORS ====================

model EmissionFactor {
  id              String   @id @default(cuid())
  tenantConfigId  String?
  tenantConfig    TenantConfig? @relation(fields: [tenantConfigId], references: [id])

  // If tenantConfigId is null, this is a default/IPCC factor
  isDefault       Boolean  @default(false)

  code            String
  name            String

  categoryCode    String   // IPCC category
  gas             GHGType

  value           Float
  unit            String

  // Source
  source          String   // IPCC, National, Research
  reference       String?
  year            Int?

  // Uncertainty
  uncertaintyLower Float?
  uncertaintyUpper Float?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  calculations    EmissionCalculation[]
}

enum GHGType {
  CO2
  CH4
  N2O
  HFCs
  PFCs
  SF6
  NF3
}

// ==================== CALCULATIONS ====================

model EmissionCalculation {
  id              String   @id @default(cuid())

  activityDataId  String
  activityData    ActivityData @relation(fields: [activityDataId], references: [id])

  emissionFactorId String
  emissionFactor  EmissionFactor @relation(fields: [emissionFactorId], references: [id])

  // Calculation results
  rawEmission     Float
  gwpFactor       Float
  co2eqEmission   Float

  // Methodology used
  tier            Int
  equation        String?

  createdAt       DateTime @default(now())
}

// ==================== QA/QC ====================

model QAQCRecord {
  id              String   @id @default(cuid())
  inventoryId     String
  inventory       Inventory @relation(fields: [inventoryId], references: [id])

  checkType       QAQCType
  category        String?  // Specific category or 'ALL'

  status          QAQCStatus @default(PENDING)

  // Results
  findings        Json?
  issues          Json?
  recommendations Json?

  // Review
  reviewedBy      String?
  reviewedAt      DateTime?
  comments        String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum QAQCType {
  TIER1_GENERAL
  TIER1_CATEGORY
  TIER2_CATEGORY
  KEY_CATEGORY
  UNCERTAINTY
  COMPLETENESS
  CONSISTENCY
  COMPARABILITY
  ACCURACY
  TRANSPARENCY
}

enum QAQCStatus {
  PENDING
  IN_PROGRESS
  PASSED
  FAILED
  PASSED_WITH_COMMENTS
}

// ==================== KEY CATEGORIES ====================

model KeyCategoryAnalysis {
  id              String   @id @default(cuid())
  tenantConfigId  String

  year            Int

  // Level assessment
  levelResults    Json

  // Trend assessment
  trendResults    Json

  // Combined key categories
  keyCategories   Json

  createdAt       DateTime @default(now())
}

// ==================== RECALCULATIONS ====================

model Recalculation {
  id              String   @id @default(cuid())
  tenantConfigId  String

  originalYear    Int
  affectedYears   Json     // Array of years

  reason          RecalculationReason
  description     String

  // Changes
  methodologyChanges Json?
  efChanges         Json?
  adChanges         Json?

  // Impact
  impactAssessment Json

  approvedBy      String?
  approvedAt      DateTime?

  createdAt       DateTime @default(now())
}

enum RecalculationReason {
  METHODOLOGY_CHANGE
  EMISSION_FACTOR_UPDATE
  ACTIVITY_DATA_REVISION
  ERROR_CORRECTION
  CATEGORY_REALLOCATION
  NEW_DATA_SOURCE
}
```

### Step 2.3: MRV API Routes Structure

Create versioned API routes:

```typescript
// apps/mrv/app/api/v1/inventory/route.ts
// apps/mrv/app/api/v1/inventory/[year]/route.ts
// apps/mrv/app/api/v1/sectors/route.ts
// apps/mrv/app/api/v1/sectors/[code]/route.ts
// apps/mrv/app/api/v1/categories/[code]/route.ts
// apps/mrv/app/api/v1/activity-data/route.ts
// apps/mrv/app/api/v1/emission-factors/route.ts
// apps/mrv/app/api/v1/calculations/route.ts
// apps/mrv/app/api/v1/qaqc/route.ts
// apps/mrv/app/api/v1/key-categories/route.ts
// apps/mrv/app/api/v1/reports/nir/route.ts
// apps/mrv/app/api/v1/reports/btr/route.ts
```

Each API route should:
1. Validate tenant from API key or JWT
2. Return standardized response format
3. Emit webhooks for state changes

---

## PHASE 3: NDC Tools Scaffold

### Step 3.1: Initialize NDC Application

```bash
cd apps/ndc
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false
npm install prisma @prisma/client
npm install zod @tanstack/react-query axios
```

### Step 3.2: NDC Database Schema

```prisma
// apps/ndc/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("NDC_DATABASE_URL")
}

// Tenant reference (synced from Portal)
model TenantConfig {
  id              String   @id @default(cuid())
  portalTenantId  String   @unique
  countryCode     String
  countryName     String

  // NDC-specific settings
  ndcCycle        Int      @default(1)
  currentNDCId    String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  ndcs            NDC[]
  baselines       Baseline[]
  policies        PolicyMeasure[]
}

// ==================== NDC TARGETS ====================

model NDC {
  id              String   @id @default(cuid())
  tenantConfigId  String
  tenantConfig    TenantConfig @relation(fields: [tenantConfigId], references: [id])

  version         String   // NDC 1.0, NDC 2.0, etc.
  status          NDCStatus @default(DRAFT)

  // Submission info
  submissionDate  DateTime?
  unfcccRef       String?

  // Document
  documentUrl     String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  targets         Target[]
  progressRecords ProgressRecord[]
}

enum NDCStatus {
  DRAFT
  INTERNAL_REVIEW
  SUBMITTED
  ACTIVE
  SUPERSEDED
}

model Target {
  id              String   @id @default(cuid())
  ndcId           String
  ndc             NDC      @relation(fields: [ndcId], references: [id])

  name            String
  sector          String?  // null = economy-wide

  // Target specification
  targetType      TargetType
  referenceType   ReferenceType

  // Values
  baseYear        Int?
  baseValue       Float?
  baseUnit        String?

  targetYear      Int
  targetValue     Float
  targetUnit      String

  // Conditionality
  isConditional   Boolean  @default(false)
  conditionDescription String?

  // Status
  isActive        Boolean  @default(true)

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  progressRecords TargetProgress[]
  linkedPolicies  PolicyTarget[]
}

enum TargetType {
  EMISSION_REDUCTION
  EMISSION_INTENSITY
  RENEWABLE_SHARE
  ENERGY_EFFICIENCY
  FOREST_COVER
  CARBON_SINK
  NET_ZERO
  SECTORAL_TARGET
}

enum ReferenceType {
  ABSOLUTE
  BAU
  BASE_YEAR
  INTENSITY
  PEAKING
}

// ==================== PROGRESS TRACKING ====================

model ProgressRecord {
  id              String   @id @default(cuid())
  ndcId           String
  ndc             NDC      @relation(fields: [ndcId], references: [id])

  year            Int

  // Overall progress
  overallProgress Float?   // Percentage
  onTrack         Boolean?

  // Data source
  mrvDataYear     Int?     // Year of MRV data used
  lastSyncedAt    DateTime?

  // Notes
  notes           String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  targetProgress  TargetProgress[]
}

model TargetProgress {
  id              String   @id @default(cuid())
  progressRecordId String
  progressRecord  ProgressRecord @relation(fields: [progressRecordId], references: [id])

  targetId        String
  target          Target   @relation(fields: [targetId], references: [id])

  // Current status
  currentValue    Float
  currentUnit     String

  // Progress calculation
  progressPercent Float
  gapToTarget     Float

  // Projection
  projectedValue  Float?
  projectedYear   Int?
  onTrack         Boolean

  createdAt       DateTime @default(now())
}

// ==================== BASELINES & PROJECTIONS ====================

model Baseline {
  id              String   @id @default(cuid())
  tenantConfigId  String
  tenantConfig    TenantConfig @relation(fields: [tenantConfigId], references: [id])

  name            String
  type            BaselineType
  sector          String?

  // Parameters
  baseYear        Int
  endYear         Int

  // Data points
  dataPoints      Json     // Array of {year, value}

  // Methodology
  methodology     String?
  assumptions     Json?

  // Status
  isActive        Boolean  @default(true)
  approvedAt      DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum BaselineType {
  BAU
  WITH_MEASURES
  WITH_ADDITIONAL_MEASURES
  HISTORICAL
}

model Projection {
  id              String   @id @default(cuid())
  tenantConfigId  String

  name            String
  scenario        String   // BAU, WEM, WAM
  sector          String?

  // Projection data
  startYear       Int
  endYear         Int
  dataPoints      Json     // Array of {year, value, uncertainty}

  // Methodology
  model           String?
  assumptions     Json?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// ==================== POLICIES & MEASURES ====================

model PolicyMeasure {
  id              String   @id @default(cuid())
  tenantConfigId  String
  tenantConfig    TenantConfig @relation(fields: [tenantConfigId], references: [id])

  name            String
  description     String?

  // Classification
  type            PolicyType
  sector          String
  instrument      String   // Regulatory, Economic, Voluntary, etc.

  // Status
  status          PolicyStatus @default(PLANNED)

  // Timeline
  startDate       DateTime?
  endDate         DateTime?

  // Impact
  expectedImpact  Float?   // tCO2eq per year
  actualImpact    Float?

  // Costs
  estimatedCost   Float?
  actualCost      Float?
  costUnit        String?

  // Documentation
  legalBasis      String?
  documentUrl     String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  linkedTargets   PolicyTarget[]
  impactRecords   PolicyImpact[]
}

enum PolicyType {
  MITIGATION
  ADAPTATION
  CROSS_CUTTING
}

enum PolicyStatus {
  PLANNED
  ADOPTED
  IMPLEMENTED
  COMPLETED
  DISCONTINUED
}

model PolicyTarget {
  id              String   @id @default(cuid())
  policyId        String
  policy          PolicyMeasure @relation(fields: [policyId], references: [id])

  targetId        String
  target          Target   @relation(fields: [targetId], references: [id])

  contributionPercent Float? // How much this policy contributes to target

  @@unique([policyId, targetId])
}

model PolicyImpact {
  id              String   @id @default(cuid())
  policyId        String
  policy          PolicyMeasure @relation(fields: [policyId], references: [id])

  year            Int

  // Impact metrics
  emissionReduction Float?
  energySaved       Float?
  renewableAdded    Float?

  // Verification
  isVerified      Boolean  @default(false)
  verificationSource String?

  createdAt       DateTime @default(now())

  @@unique([policyId, year])
}

// ==================== GAP ANALYSIS ====================

model GapAnalysis {
  id              String   @id @default(cuid())
  tenantConfigId  String

  analysisDate    DateTime @default(now())
  targetYear      Int

  // Gap metrics
  currentEmissions Float
  projectedBAU     Float
  targetEmissions  Float

  // Gaps
  absoluteGap     Float
  percentageGap   Float

  // By sector
  sectorGaps      Json

  // Recommendations
  recommendations Json?

  createdAt       DateTime @default(now())
}

// ==================== FINANCE ====================

model FinanceNeed {
  id              String   @id @default(cuid())
  tenantConfigId  String

  sector          String
  category        String   // Mitigation, Adaptation

  // Need specification
  totalNeed       Float
  currency        String
  timeframe       String

  // Breakdown
  domestic        Float?
  international   Float?

  // Status
  secured         Float    @default(0)
  gap             Float?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### Step 3.3: NDC API Routes Structure

```typescript
// apps/ndc/app/api/v1/ndc/route.ts              - List/Create NDCs
// apps/ndc/app/api/v1/ndc/[id]/route.ts         - Get/Update NDC
// apps/ndc/app/api/v1/targets/route.ts          - List/Create targets
// apps/ndc/app/api/v1/targets/[id]/route.ts     - Get/Update target
// apps/ndc/app/api/v1/progress/route.ts         - Get progress overview
// apps/ndc/app/api/v1/progress/sync/route.ts    - Sync from MRV
// apps/ndc/app/api/v1/baselines/route.ts        - Baseline scenarios
// apps/ndc/app/api/v1/projections/route.ts      - Projections
// apps/ndc/app/api/v1/policies/route.ts         - Policy measures
// apps/ndc/app/api/v1/policies/[id]/route.ts    - Policy details
// apps/ndc/app/api/v1/gap-analysis/route.ts     - Gap analysis
// apps/ndc/app/api/v1/finance/route.ts          - Finance tracking
// apps/ndc/app/api/v1/reports/btr/route.ts      - BTR Chapter 3
```

---

## PHASE 4: Registry API Enhancement

### Step 4.1: Add Versioned APIs to Existing Registry

The existing registry needs standardized API routes. Add:

```typescript
// apps/registry/app/api/v1/projects/route.ts
// apps/registry/app/api/v1/projects/[id]/route.ts
// apps/registry/app/api/v1/projects/[id]/lifecycle/route.ts
// apps/registry/app/api/v1/credits/route.ts
// apps/registry/app/api/v1/credits/[serialNumber]/route.ts
// apps/registry/app/api/v1/transactions/route.ts
// apps/registry/app/api/v1/transactions/[id]/route.ts
// apps/registry/app/api/v1/itmo/route.ts
// apps/registry/app/api/v1/itmo/authorizations/route.ts
// apps/registry/app/api/v1/itmo/transfers/route.ts
// apps/registry/app/api/v1/compliance/route.ts
// apps/registry/app/api/v1/public/projects/route.ts
// apps/registry/app/api/v1/public/credits/verify/route.ts
```

---

## PHASE 5: Inter-Service Communication

### Step 5.1: API Client Package

```typescript
// packages/api-client/src/base-client.ts

export class BaseAPIClient {
  protected baseUrl: string;
  protected apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  protected async request<T>(
    method: string,
    path: string,
    data?: any
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new APIError(response.status, await response.json());
    }

    return response.json();
  }
}

// packages/api-client/src/mrv-client.ts
export class MRVClient extends BaseAPIClient {
  async getInventory(year: number) {
    return this.request<Inventory>('GET', `/api/v1/inventory/${year}`);
  }

  async getEmissions(year: number, sector?: string) {
    const params = sector ? `?sector=${sector}` : '';
    return this.request<Emissions>('GET', `/api/v1/emissions/${year}${params}`);
  }

  async getTotalEmissions(year: number) {
    return this.request<TotalEmissions>('GET', `/api/v1/emissions/${year}/total`);
  }

  // ... more methods
}

// packages/api-client/src/ndc-client.ts
export class NDCClient extends BaseAPIClient {
  async getTargets() {
    return this.request<Target[]>('GET', '/api/v1/targets');
  }

  async getProgress() {
    return this.request<Progress>('GET', '/api/v1/progress');
  }

  async syncFromMRV(mrvYear: number) {
    return this.request<SyncResult>('POST', '/api/v1/progress/sync', { mrvYear });
  }

  // ... more methods
}

// packages/api-client/src/registry-client.ts
export class RegistryClient extends BaseAPIClient {
  async getProjects(status?: string) {
    const params = status ? `?status=${status}` : '';
    return this.request<Project[]>('GET', `/api/v1/projects${params}`);
  }

  async getCreditBalance() {
    return this.request<CreditBalance>('GET', '/api/v1/credits/balance');
  }

  async getITMOSummary() {
    return this.request<ITMOSummary>('GET', '/api/v1/itmo/summary');
  }

  // ... more methods
}
```

### Step 5.2: Webhook Event System

```typescript
// packages/api-types/src/events.ts

export enum EventType {
  // MRV Events
  MRV_INVENTORY_CREATED = 'mrv.inventory.created',
  MRV_INVENTORY_UPDATED = 'mrv.inventory.updated',
  MRV_INVENTORY_APPROVED = 'mrv.inventory.approved',
  MRV_EMISSIONS_CALCULATED = 'mrv.emissions.calculated',

  // NDC Events
  NDC_TARGET_CREATED = 'ndc.target.created',
  NDC_TARGET_UPDATED = 'ndc.target.updated',
  NDC_PROGRESS_UPDATED = 'ndc.progress.updated',
  NDC_POLICY_ADDED = 'ndc.policy.added',

  // Registry Events
  REGISTRY_PROJECT_REGISTERED = 'registry.project.registered',
  REGISTRY_CREDITS_ISSUED = 'registry.credits.issued',
  REGISTRY_CREDITS_TRANSFERRED = 'registry.credits.transferred',
  REGISTRY_CREDITS_RETIRED = 'registry.credits.retired',
  REGISTRY_ITMO_AUTHORIZED = 'registry.itmo.authorized',
  REGISTRY_ITMO_TRANSFERRED = 'registry.itmo.transferred',
}

export interface WebhookEvent {
  id: string;
  type: EventType;
  timestamp: string;
  tenantId: string;
  data: Record<string, any>;
}
```

---

## PHASE 6: Portal Onboarding Flow

### Step 6.1: Onboarding Wizard Component Structure

```typescript
// apps/portal/app/(onboarding)/layout.tsx
// apps/portal/app/(onboarding)/welcome/page.tsx
// apps/portal/app/(onboarding)/country-profile/page.tsx
// apps/portal/app/(onboarding)/module-selection/page.tsx
// apps/portal/app/(onboarding)/mrv-setup/page.tsx
// apps/portal/app/(onboarding)/ndc-setup/page.tsx
// apps/portal/app/(onboarding)/registry-setup/page.tsx
// apps/portal/app/(onboarding)/integrations/page.tsx
// apps/portal/app/(onboarding)/team/page.tsx
// apps/portal/app/(onboarding)/complete/page.tsx
```

### Step 6.2: Module Selection Configuration

```typescript
// apps/portal/lib/module-config.ts

export const MODULE_CONFIG = {
  mrv: {
    name: 'MRV System',
    description: 'GHG Inventory and Monitoring, Reporting, Verification',
    icon: 'BarChart3',
    submodules: {
      inventory: {
        name: 'GHG Inventory',
        description: 'Annual greenhouse gas emission inventories',
        isCore: true,
      },
      sectors: {
        energy: { name: 'Energy Sector', isCore: true },
        ippu: { name: 'Industrial Processes', isCore: false },
        agriculture: { name: 'Agriculture', isCore: false },
        lulucf: { name: 'Land Use & Forestry', isCore: false },
        waste: { name: 'Waste', isCore: false },
      },
      qaqc: {
        name: 'QA/QC Management',
        description: 'Quality assurance and quality control workflows',
        isCore: true,
      },
      reporting: {
        nir: { name: 'National Inventory Report', isCore: true },
        btr: { name: 'BTR Chapter II', isCore: true },
        custom: { name: 'Custom Reports', isCore: false },
      },
      advanced: {
        uncertainty: { name: 'Uncertainty Analysis', isCore: false },
        keyCategories: { name: 'Key Category Analysis', isCore: false },
        recalculations: { name: 'Recalculation Tracking', isCore: false },
      },
    },
  },
  ndc: {
    name: 'NDC Tools',
    description: 'NDC Planning, Tracking, and Implementation',
    icon: 'Target',
    submodules: {
      targets: {
        name: 'Target Management',
        description: 'Configure and manage NDC targets',
        isCore: true,
      },
      progress: {
        name: 'Progress Tracking',
        description: 'Track progress against targets',
        isCore: true,
      },
      policies: {
        name: 'Policy Measures',
        description: 'Track mitigation policies and measures',
        isCore: false,
      },
      baselines: {
        name: 'Baseline Scenarios',
        description: 'BAU and alternative scenarios',
        isCore: false,
      },
      projections: {
        name: 'Projections',
        description: 'Emission projections modeling',
        isCore: false,
      },
      gapAnalysis: {
        name: 'Gap Analysis',
        description: 'Analyze gaps to targets',
        isCore: false,
      },
      finance: {
        name: 'Climate Finance',
        description: 'Track finance needs and flows',
        isCore: false,
      },
      reporting: {
        name: 'BTR Chapter III',
        description: 'NDC progress reporting',
        isCore: true,
      },
    },
  },
  registry: {
    name: 'Carbon Registry',
    description: 'Carbon Credit and ITMO Management',
    icon: 'Leaf',
    submodules: {
      projects: {
        name: 'Project Registry',
        description: 'Register and manage carbon projects',
        isCore: true,
      },
      lifecycle: {
        pcn: { name: 'Project Concept Notes', isCore: true },
        pdd: { name: 'Project Design Documents', isCore: true },
        validation: { name: 'Validation', isCore: false },
        monitoring: { name: 'Monitoring', isCore: true },
        verification: { name: 'Verification', isCore: false },
      },
      credits: {
        name: 'Credit Management',
        description: 'Issue and track carbon credits',
        isCore: true,
      },
      transactions: {
        name: 'Transactions',
        description: 'Transfers, retirements, cancellations',
        isCore: true,
      },
      itmo: {
        name: 'Article 6 / ITMO',
        description: 'ITMO authorization and tracking',
        isCore: false,
        dependencies: ['credits', 'transactions'],
      },
      compliance: {
        name: 'Compliance Tracking',
        description: 'Track compliance obligations',
        isCore: false,
      },
      publicPortal: {
        name: 'Public Portal',
        description: 'Public transparency portal',
        isCore: true,
      },
    },
  },
};
```

---

## PHASE 7: Unified Dashboard

### Step 7.1: Dashboard Data Aggregation

```typescript
// apps/portal/app/(dashboard)/page.tsx

// The dashboard aggregates data from all three services

export default async function DashboardPage() {
  // Fetch from all services in parallel
  const [mrvData, ndcData, registryData] = await Promise.all([
    fetchMRVSummary(),
    fetchNDCSummary(),
    fetchRegistrySummary(),
  ]);

  return (
    <Dashboard
      mrv={mrvData}
      ndc={ndcData}
      registry={registryData}
    />
  );
}
```

### Step 7.2: Dashboard Widget Structure

```
Dashboard Layout:
┌────────────────────────────────────────────────────────────────┐
│  Welcome, [User] | [Country Name]                    [2024]    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐ │
│  │  Total Emissions │  │  NDC Progress    │  │ Credits      │ │
│  │  123.4 MtCO2eq   │  │  45% to target   │  │ 1.2M issued  │ │
│  │  ↑ 2.3% vs 2023  │  │  On track ✓      │  │ 500K retired │ │
│  └──────────────────┘  └──────────────────┘  └──────────────┘ │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Emissions Trend & NDC Target Pathway                    │  │
│  │  [Combined Chart: Historical emissions + projections +   │  │
│  │   NDC target line + registered project reductions]       │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  ┌─────────────────────┐  ┌─────────────────────────────────┐ │
│  │  Module Status      │  │  Recent Activity                │ │
│  │  ☑ MRV    Active   │  │  • Inventory 2023 approved      │ │
│  │  ☑ NDC    Active   │  │  • 50,000 credits issued        │ │
│  │  ☑ Registry Active │  │  • NDC progress updated         │ │
│  └─────────────────────┘  └─────────────────────────────────┘ │
│                                                                │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  Quick Actions                                           │  │
│  │  [Start 2024 Inventory] [Update NDC Progress]            │  │
│  │  [Register New Project] [Generate BTR]                   │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## PHASE 8: Docker Configuration

### Step 8.1: docker-compose.yml

```yaml
version: '3.8'

services:
  # Portal Service
  portal:
    build:
      context: .
      dockerfile: apps/portal/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - PORTAL_DATABASE_URL=postgresql://postgres:postgres@portal-db:5432/portal
      - MRV_SERVICE_URL=http://mrv:3001
      - NDC_SERVICE_URL=http://ndc:3002
      - REGISTRY_SERVICE_URL=http://registry:3003
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - portal-db
      - mrv
      - ndc
      - registry

  # MRV Service
  mrv:
    build:
      context: .
      dockerfile: apps/mrv/Dockerfile
    ports:
      - "3001:3001"
    environment:
      - MRV_DATABASE_URL=postgresql://postgres:postgres@mrv-db:5432/mrv
      - PORTAL_WEBHOOK_URL=http://portal:3000/api/webhooks/mrv
    depends_on:
      - mrv-db

  # NDC Service
  ndc:
    build:
      context: .
      dockerfile: apps/ndc/Dockerfile
    ports:
      - "3002:3002"
    environment:
      - NDC_DATABASE_URL=postgresql://postgres:postgres@ndc-db:5432/ndc
      - MRV_SERVICE_URL=http://mrv:3001
      - PORTAL_WEBHOOK_URL=http://portal:3000/api/webhooks/ndc
    depends_on:
      - ndc-db

  # Registry Service
  registry:
    build:
      context: .
      dockerfile: apps/registry/Dockerfile
    ports:
      - "3003:3003"
    environment:
      - REGISTRY_DATABASE_URL=postgresql://postgres:postgres@registry-db:5432/registry
      - NDC_SERVICE_URL=http://ndc:3002
      - PORTAL_WEBHOOK_URL=http://portal:3000/api/webhooks/registry
    depends_on:
      - registry-db

  # Databases
  portal-db:
    image: postgres:15
    environment:
      - POSTGRES_DB=portal
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - portal-data:/var/lib/postgresql/data

  mrv-db:
    image: postgres:15
    environment:
      - POSTGRES_DB=mrv
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - mrv-data:/var/lib/postgresql/data

  ndc-db:
    image: postgres:15
    environment:
      - POSTGRES_DB=ndc
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - ndc-data:/var/lib/postgresql/data

  registry-db:
    image: postgres:15
    environment:
      - POSTGRES_DB=registry
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - registry-data:/var/lib/postgresql/data

volumes:
  portal-data:
  mrv-data:
  ndc-data:
  registry-data:
```

---

## Implementation Order

Execute in this order:

### Week 1: Foundation
1. ☐ Set up monorepo structure
2. ☐ Create shared packages (api-types, utils)
3. ☐ Initialize Portal app with auth
4. ☐ Set up Docker environment

### Week 2: MRV Scaffold
5. ☐ Initialize MRV app
6. ☐ Create MRV Prisma schema
7. ☐ Build MRV API routes (stubs)
8. ☐ Create MRV UI scaffolding

### Week 3: NDC Scaffold
9. ☐ Initialize NDC app
10. ☐ Create NDC Prisma schema
11. ☐ Build NDC API routes (stubs)
12. ☐ Create NDC UI scaffolding

### Week 4: Integration
13. ☐ Add API routes to existing Registry
14. ☐ Build API client package
15. ☐ Implement Portal → Service proxies
16. ☐ Set up webhook system

### Week 5: Onboarding & Dashboard
17. ☐ Build onboarding wizard
18. ☐ Implement module selection logic
19. ☐ Create unified dashboard
20. ☐ Implement cross-service data views

---

## Key Technical Decisions

1. **Separate Databases**: Each service owns its data. No shared tables.
2. **API-First**: All inter-service communication via REST APIs.
3. **Event-Driven**: Services emit webhooks for state changes.
4. **Portal as Gateway**: All user requests go through Portal.
5. **Modular Activation**: Features can be enabled/disabled per tenant.
6. **Tenant Isolation**: Each country/organization is a separate tenant.

---

## Getting Started Command

```bash
# After setting up the structure, run:
cd NCTP
npm install
npm run dev
```

This will start all services:
- Portal: http://localhost:3000
- MRV: http://localhost:3001
- NDC: http://localhost:3002
- Registry: http://localhost:3003

---

## Reference Documents

The following documents in this package provide additional context:
- `/docs/PLATFORM_OVERVIEW.md` - Integration patterns
- `/docs/INTEGRATION_SPEC.md` - Data models and APIs
- `/docs/National_MRV_System_Technical_Specification.docx` - MRV requirements
- `/docs/NDC_Tools_Technical_Specification.docx` - NDC requirements
- `/skills/` - Claude AI assistance for each module

---

**START WITH PHASE 1.** Create the monorepo structure and Portal foundation first. The existing registry code should be moved to `apps/registry/`. Build incrementally, testing each service independently before integration.
