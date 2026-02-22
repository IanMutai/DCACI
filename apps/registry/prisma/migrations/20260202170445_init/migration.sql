-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('DRAFT', 'VALIDATION', 'REGISTERED', 'ACTIVE', 'COMPLETED', 'SUSPENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CreditStatus" AS ENUM ('ISSUED', 'ACTIVE', 'TRANSFERRED', 'RETIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "TenantConfig" (
    "id" TEXT NOT NULL,
    "portalTenantId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "registryName" TEXT,
    "settings" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TenantConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "tenantConfigId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "methodology" TEXT,
    "sector" TEXT,
    "projectType" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'DRAFT',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "creditingPeriodStart" TIMESTAMP(3),
    "creditingPeriodEnd" TIMESTAMP(3),
    "location" TEXT,
    "coordinates" JSONB,
    "proponentName" TEXT,
    "proponentContact" TEXT,
    "estimatedReductions" DOUBLE PRECISION,
    "verifiedReductions" DOUBLE PRECISION,
    "documentUrl" TEXT,
    "validationReport" TEXT,
    "isArticle6" BOOLEAN NOT NULL DEFAULT false,
    "correspondingAdjustment" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credit" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "vintage" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'tCO2e',
    "status" "CreditStatus" NOT NULL DEFAULT 'ISSUED',
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retiredAt" TIMESTAMP(3),
    "currentHolder" TEXT,
    "isItmo" BOOLEAN NOT NULL DEFAULT false,
    "correspondingAdjustmentApplied" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Credit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" TEXT NOT NULL,
    "creditId" TEXT NOT NULL,
    "fromEntity" TEXT NOT NULL,
    "toEntity" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "transferType" TEXT NOT NULL DEFAULT 'TRANSFER',
    "reason" TEXT,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonitoringReport" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "reportingPeriodStart" TIMESTAMP(3) NOT NULL,
    "reportingPeriodEnd" TIMESTAMP(3) NOT NULL,
    "verifiedReductions" DOUBLE PRECISION,
    "reportUrl" TEXT,
    "verifierName" TEXT,
    "verificationDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonitoringReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TenantConfig_portalTenantId_key" ON "TenantConfig"("portalTenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Credit_serialNumber_key" ON "Credit"("serialNumber");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_tenantConfigId_fkey" FOREIGN KEY ("tenantConfigId") REFERENCES "TenantConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credit" ADD CONSTRAINT "Credit_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonitoringReport" ADD CONSTRAINT "MonitoringReport_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
