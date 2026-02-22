export interface SubmoduleConfig {
  id: string;
  label: string;
  description: string;
  icon?: string;
  defaultEnabled: boolean;
}

export interface ModuleConfig {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
  icon: string;
  serviceUrl: string;
  submodules: SubmoduleConfig[];
}

export const MODULE_CONFIG: Record<string, ModuleConfig> = {
  mrv: {
    id: "mrv",
    label: "MRV System",
    shortLabel: "MRV",
    description:
      "Measurement, Reporting, and Verification of greenhouse gas emissions across all IPCC sectors with UNFCCC-compliant methodologies.",
    color: "emerald",
    icon: "chart-bar",
    serviceUrl: process.env.MRV_SERVICE_URL || "http://localhost:3001",
    submodules: [
      {
        id: "ghg-inventory",
        label: "GHG Inventory Management",
        description:
          "Manage national greenhouse gas inventories following IPCC 2006 Guidelines. Includes CRF/CRT table generation.",
        defaultEnabled: true,
      },
      {
        id: "activity-data",
        label: "Activity Data Collection",
        description:
          "Collect and manage activity data from various sources including institutional data providers and surveys.",
        defaultEnabled: true,
      },
      {
        id: "emission-factors",
        label: "Emission Factor Database",
        description:
          "Manage emission factors including IPCC defaults, country-specific, and facility-level factors.",
        defaultEnabled: true,
      },
      {
        id: "qaqc",
        label: "QA/QC Workflows",
        description:
          "Quality assurance and quality control workflows for inventory data with multi-level review processes.",
        defaultEnabled: true,
      },
      {
        id: "uncertainty",
        label: "Uncertainty Analysis",
        description:
          "Perform Tier 1 and Tier 2 uncertainty analysis on emissions estimates following IPCC good practice guidance.",
        defaultEnabled: false,
      },
      {
        id: "reporting",
        label: "Reporting & Export",
        description:
          "Generate NIR reports, CRF/CRT tables, and export data in various formats for UNFCCC submission.",
        defaultEnabled: true,
      },
    ],
  },
  ndc: {
    id: "ndc",
    label: "NDC Tracker",
    shortLabel: "NDC",
    description:
      "Track Nationally Determined Contributions progress, manage mitigation actions, and monitor adaptation measures against national targets.",
    color: "blue",
    icon: "chart-line",
    serviceUrl: process.env.NDC_SERVICE_URL || "http://localhost:3002",
    submodules: [
      {
        id: "target-tracking",
        label: "Target Tracking & Analytics",
        description:
          "Track progress against unconditional and conditional NDC targets with trend analysis and projections.",
        defaultEnabled: true,
      },
      {
        id: "mitigation-actions",
        label: "Mitigation Actions",
        description:
          "Register and track mitigation actions including policies, programs, and projects across all sectors.",
        defaultEnabled: true,
      },
      {
        id: "adaptation-measures",
        label: "Adaptation Measures",
        description:
          "Track climate adaptation measures, vulnerability assessments, and adaptation finance.",
        defaultEnabled: false,
      },
      {
        id: "support-tracking",
        label: "Support Received / Needed",
        description:
          "Track climate finance, technology transfer, and capacity building support received and needed.",
        defaultEnabled: false,
      },
      {
        id: "progress-indicators",
        label: "Progress Indicators",
        description:
          "Define and monitor custom indicators for tracking NDC implementation progress.",
        defaultEnabled: true,
      },
      {
        id: "projections",
        label: "Emission Projections",
        description:
          "Model future emission scenarios under different policy paths (BAU, with measures, with additional measures).",
        defaultEnabled: false,
      },
    ],
  },
  registry: {
    id: "registry",
    label: "Carbon Registry",
    shortLabel: "Registry",
    description:
      "Manage carbon credit projects, track issuances, transfers, and retirements with full Article 6 compliance and ITMOs support.",
    color: "amber",
    icon: "database",
    serviceUrl:
      process.env.REGISTRY_SERVICE_URL || "http://localhost:3003",
    submodules: [
      {
        id: "project-management",
        label: "Project Management",
        description:
          "Register and manage carbon credit projects through the full project cycle from registration to crediting.",
        defaultEnabled: true,
      },
      {
        id: "credit-issuance",
        label: "Credit Issuance",
        description:
          "Issue carbon credits based on verified emission reductions with unique serial numbers.",
        defaultEnabled: true,
      },
      {
        id: "credit-transfer",
        label: "Credit Transfer",
        description:
          "Transfer credits between accounts domestically and internationally.",
        defaultEnabled: true,
      },
      {
        id: "credit-retirement",
        label: "Credit Retirement",
        description:
          "Permanently retire credits against emissions or for voluntary purposes.",
        defaultEnabled: true,
      },
      {
        id: "itmo-tracking",
        label: "ITMO Tracking (Article 6)",
        description:
          "Track Internationally Transferred Mitigation Outcomes under Article 6 of the Paris Agreement.",
        defaultEnabled: false,
      },
      {
        id: "verification",
        label: "Verification Management",
        description:
          "Manage the verification process including VVB assignments, site visits, and verification reports.",
        defaultEnabled: false,
      },
    ],
  },
};

export function getModuleById(id: string): ModuleConfig | undefined {
  return MODULE_CONFIG[id];
}

export function getAllModules(): ModuleConfig[] {
  return Object.values(MODULE_CONFIG);
}

export function getDefaultEnabledSubmodules(moduleId: string): string[] {
  const module = MODULE_CONFIG[moduleId];
  if (!module) return [];
  return module.submodules
    .filter((s) => s.defaultEnabled)
    .map((s) => s.id);
}
