-- CreateEnum
CREATE TYPE "InventoryStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'APPROVED', 'SUBMITTED', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "GHGType" AS ENUM ('CO2', 'CH4', 'N2O', 'HFCs', 'PFCs', 'SF6', 'NF3');

-- CreateEnum
CREATE TYPE "QAQCType" AS ENUM ('TIER1_GENERAL', 'TIER1_CATEGORY', 'TIER2_CATEGORY', 'KEY_CATEGORY', 'UNCERTAINTY', 'COMPLETENESS', 'CONSISTENCY', 'COMPARABILITY', 'ACCURACY', 'TRANSPARENCY');

-- CreateEnum
CREATE TYPE "QAQCStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'PASSED', 'FAILED', 'PASSED_WITH_COMMENTS');

-- CreateEnum
CREATE TYPE "RecalculationReason" AS ENUM ('METHODOLOGY_CHANGE', 'EMISSION_FACTOR_UPDATE', 'ACTIVITY_DATA_REVISION', 'ERROR_CORRECTION', 'CATEGORY_REALLOCATION', 'NEW_DATA_SOURCE');

-- CreateTable
CREATE TABLE "TenantConfig" (
    "id" TEXT NOT NULL,
    "portalTenantId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "baseYear" INTEGER NOT NULL,
    "defaultTier" INTEGER NOT NULL DEFAULT 1,
    "gwpSource" TEXT NOT NULL DEFAULT 'AR5',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "status" "InventoryStatus" NOT NULL DEFAULT 'DRAFT',
    "totalEmissions" DOUBLE PRECISION,
    "totalRemovals" DOUBLE PRECISION,
    "netEmissions" DOUBLE PRECISION,
    "submittedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectorData" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "sectorCode" TEXT NOT NULL,
    "sectorName" TEXT NOT NULL,
    "co2Emissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ch4Emissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "n2oEmissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hfcEmissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pfcEmissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sf6Emissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "nf3Emissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCO2eq" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryData" (
    "id" TEXT NOT NULL,
    "sectorDataId" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "categoryName" TEXT NOT NULL,
    "tier" INTEGER NOT NULL DEFAULT 1,
    "methodology" TEXT,
    "co2Emissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ch4Emissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "n2oEmissions" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCO2eq" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "uncertaintyLower" DOUBLE PRECISION,
    "uncertaintyUpper" DOUBLE PRECISION,
    "dataSource" TEXT,
    "assumptions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityData" (
    "id" TEXT NOT NULL,
    "categoryDataId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "dataSource" TEXT,
    "collectionMethod" TEXT,
    "uncertainty" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionFactor" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryCode" TEXT NOT NULL,
    "gas" "GHGType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "reference" TEXT,
    "year" INTEGER,
    "uncertaintyLower" DOUBLE PRECISION,
    "uncertaintyUpper" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmissionFactor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmissionCalculation" (
    "id" TEXT NOT NULL,
    "activityDataId" TEXT NOT NULL,
    "emissionFactorId" TEXT NOT NULL,
    "rawEmission" DOUBLE PRECISION NOT NULL,
    "gwpFactor" DOUBLE PRECISION NOT NULL,
    "co2eqEmission" DOUBLE PRECISION NOT NULL,
    "tier" INTEGER NOT NULL,
    "equation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmissionCalculation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QAQCRecord" (
    "id" TEXT NOT NULL,
    "inventoryId" TEXT NOT NULL,
    "checkType" "QAQCType" NOT NULL,
    "category" TEXT,
    "status" "QAQCStatus" NOT NULL DEFAULT 'PENDING',
    "findings" JSONB,
    "issues" JSONB,
    "recommendations" JSONB,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QAQCRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyCategoryAnalysis" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "levelResults" JSONB NOT NULL,
    "trendResults" JSONB NOT NULL,
    "keyCategories" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeyCategoryAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recalculation" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "originalYear" INTEGER NOT NULL,
    "affectedYears" JSONB NOT NULL,
    "reason" "RecalculationReason" NOT NULL,
    "description" TEXT NOT NULL,
    "methodologyChanges" JSONB,
    "efChanges" JSONB,
    "adChanges" JSONB,
    "impactAssessment" JSONB NOT NULL,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recalculation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantConfig_portalTenantId_key" ON "TenantConfig"("portalTenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_tenantConfigId_year_key" ON "Inventory"("tenantConfigId", "year");

-- CreateIndex
CREATE UNIQUE INDEX "SectorData_inventoryId_sectorCode_key" ON "SectorData"("inventoryId", "sectorCode");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryData_sectorDataId_categoryCode_key" ON "CategoryData"("sectorDataId", "categoryCode");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_tenantConfigId_fkey" FOREIGN KEY ("tenantConfigId") REFERENCES "TenantConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectorData" ADD CONSTRAINT "SectorData_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryData" ADD CONSTRAINT "CategoryData_sectorDataId_fkey" FOREIGN KEY ("sectorDataId") REFERENCES "SectorData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityData" ADD CONSTRAINT "ActivityData_categoryDataId_fkey" FOREIGN KEY ("categoryDataId") REFERENCES "CategoryData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmissionFactor" ADD CONSTRAINT "EmissionFactor_tenantConfigId_fkey" FOREIGN KEY ("tenantConfigId") REFERENCES "TenantConfig"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmissionCalculation" ADD CONSTRAINT "EmissionCalculation_activityDataId_fkey" FOREIGN KEY ("activityDataId") REFERENCES "ActivityData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmissionCalculation" ADD CONSTRAINT "EmissionCalculation_emissionFactorId_fkey" FOREIGN KEY ("emissionFactorId") REFERENCES "EmissionFactor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QAQCRecord" ADD CONSTRAINT "QAQCRecord_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
