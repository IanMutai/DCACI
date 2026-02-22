-- CreateEnum
CREATE TYPE "NDCStatus" AS ENUM ('DRAFT', 'INTERNAL_REVIEW', 'SUBMITTED', 'ACTIVE', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "TargetType" AS ENUM ('EMISSION_REDUCTION', 'EMISSION_INTENSITY', 'RENEWABLE_SHARE', 'ENERGY_EFFICIENCY', 'FOREST_COVER', 'CARBON_SINK', 'NET_ZERO', 'SECTORAL_TARGET');

-- CreateEnum
CREATE TYPE "ReferenceType" AS ENUM ('ABSOLUTE', 'BAU', 'BASE_YEAR', 'INTENSITY', 'PEAKING');

-- CreateEnum
CREATE TYPE "BaselineType" AS ENUM ('BAU', 'WITH_MEASURES', 'WITH_ADDITIONAL_MEASURES', 'HISTORICAL');

-- CreateEnum
CREATE TYPE "PolicyType" AS ENUM ('MITIGATION', 'ADAPTATION', 'CROSS_CUTTING');

-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('PLANNED', 'ADOPTED', 'IMPLEMENTED', 'COMPLETED', 'DISCONTINUED');

-- CreateTable
CREATE TABLE "TenantConfig" (
    "id" TEXT NOT NULL,
    "portalTenantId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "countryName" TEXT NOT NULL,
    "ndcCycle" INTEGER NOT NULL DEFAULT 1,
    "currentNDCId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NDC" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" "NDCStatus" NOT NULL DEFAULT 'DRAFT',
    "submissionDate" TIMESTAMP(3),
    "unfcccRef" TEXT,
    "documentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NDC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Target" (
    "id" TEXT NOT NULL,
    "ndcId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT,
    "targetType" "TargetType" NOT NULL,
    "referenceType" "ReferenceType" NOT NULL,
    "baseYear" INTEGER,
    "baseValue" DOUBLE PRECISION,
    "baseUnit" TEXT,
    "targetYear" INTEGER NOT NULL,
    "targetValue" DOUBLE PRECISION NOT NULL,
    "targetUnit" TEXT NOT NULL,
    "isConditional" BOOLEAN NOT NULL DEFAULT false,
    "conditionDescription" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressRecord" (
    "id" TEXT NOT NULL,
    "ndcId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "overallProgress" DOUBLE PRECISION,
    "onTrack" BOOLEAN,
    "mrvDataYear" INTEGER,
    "lastSyncedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgressRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TargetProgress" (
    "id" TEXT NOT NULL,
    "progressRecordId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "currentValue" DOUBLE PRECISION NOT NULL,
    "currentUnit" TEXT NOT NULL,
    "progressPercent" DOUBLE PRECISION NOT NULL,
    "gapToTarget" DOUBLE PRECISION NOT NULL,
    "projectedValue" DOUBLE PRECISION,
    "projectedYear" INTEGER,
    "onTrack" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TargetProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Baseline" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BaselineType" NOT NULL,
    "sector" TEXT,
    "baseYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "dataPoints" JSONB NOT NULL,
    "methodology" TEXT,
    "assumptions" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Baseline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projection" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "scenario" TEXT NOT NULL,
    "sector" TEXT,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "dataPoints" JSONB NOT NULL,
    "model" TEXT,
    "assumptions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyMeasure" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "PolicyType" NOT NULL,
    "sector" TEXT NOT NULL,
    "instrument" TEXT NOT NULL,
    "status" "PolicyStatus" NOT NULL DEFAULT 'PLANNED',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "expectedImpact" DOUBLE PRECISION,
    "actualImpact" DOUBLE PRECISION,
    "estimatedCost" DOUBLE PRECISION,
    "actualCost" DOUBLE PRECISION,
    "costUnit" TEXT,
    "legalBasis" TEXT,
    "documentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PolicyMeasure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyTarget" (
    "id" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "contributionPercent" DOUBLE PRECISION,

    CONSTRAINT "PolicyTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyImpact" (
    "id" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "emissionReduction" DOUBLE PRECISION,
    "energySaved" DOUBLE PRECISION,
    "renewableAdded" DOUBLE PRECISION,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationSource" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PolicyImpact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GapAnalysis" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "analysisDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "targetYear" INTEGER NOT NULL,
    "currentEmissions" DOUBLE PRECISION NOT NULL,
    "projectedBAU" DOUBLE PRECISION NOT NULL,
    "targetEmissions" DOUBLE PRECISION NOT NULL,
    "absoluteGap" DOUBLE PRECISION NOT NULL,
    "percentageGap" DOUBLE PRECISION NOT NULL,
    "sectorGaps" JSONB NOT NULL,
    "recommendations" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GapAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceNeed" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "totalNeed" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "domestic" DOUBLE PRECISION,
    "international" DOUBLE PRECISION,
    "secured" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gap" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinanceNeed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantConfig_portalTenantId_key" ON "TenantConfig"("portalTenantId");

-- CreateIndex
CREATE UNIQUE INDEX "PolicyTarget_policyId_targetId_key" ON "PolicyTarget"("policyId", "targetId");

-- CreateIndex
CREATE UNIQUE INDEX "PolicyImpact_policyId_year_key" ON "PolicyImpact"("policyId", "year");

-- AddForeignKey
ALTER TABLE "NDC" ADD CONSTRAINT "NDC_tenantConfigId_fkey" FOREIGN KEY ("tenantConfigId") REFERENCES "TenantConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_ndcId_fkey" FOREIGN KEY ("ndcId") REFERENCES "NDC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressRecord" ADD CONSTRAINT "ProgressRecord_ndcId_fkey" FOREIGN KEY ("ndcId") REFERENCES "NDC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetProgress" ADD CONSTRAINT "TargetProgress_progressRecordId_fkey" FOREIGN KEY ("progressRecordId") REFERENCES "ProgressRecord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TargetProgress" ADD CONSTRAINT "TargetProgress_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Baseline" ADD CONSTRAINT "Baseline_tenantConfigId_fkey" FOREIGN KEY ("tenantConfigId") REFERENCES "TenantConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyMeasure" ADD CONSTRAINT "PolicyMeasure_tenantConfigId_fkey" FOREIGN KEY ("tenantConfigId") REFERENCES "TenantConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyTarget" ADD CONSTRAINT "PolicyTarget_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "PolicyMeasure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyTarget" ADD CONSTRAINT "PolicyTarget_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Target"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyImpact" ADD CONSTRAINT "PolicyImpact_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "PolicyMeasure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
