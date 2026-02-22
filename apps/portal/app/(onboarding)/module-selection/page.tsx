"use client";

import Link from "next/link";
import { useState } from "react";
import ModuleCard from "@/components/onboarding/module-card";

interface ModuleState {
  enabled: boolean;
  submodules: Record<string, boolean>;
}

export default function ModuleSelectionPage() {
  const [modules, setModules] = useState<Record<string, ModuleState>>({
    mrv: {
      enabled: true,
      submodules: {
        ghgInventory: true,
        activityData: true,
        emissionFactors: true,
        qaqc: true,
        reporting: true,
      },
    },
    ndc: {
      enabled: true,
      submodules: {
        targetTracking: true,
        mitigationActions: true,
        adaptationMeasures: false,
        supportReceived: false,
        progressIndicators: true,
      },
    },
    registry: {
      enabled: false,
      submodules: {
        projectManagement: true,
        creditIssuance: true,
        creditTransfer: true,
        creditRetirement: true,
        itmoTracking: false,
      },
    },
  });

  function toggleModule(moduleId: string) {
    setModules((prev) => {
      const current = prev[moduleId] ?? { enabled: false, submodules: {} };
      return {
        ...prev,
        [moduleId]: {
          enabled: !current.enabled,
          submodules: current.submodules,
        },
      };
    });
  }

  function toggleSubmodule(moduleId: string, submoduleId: string) {
    setModules((prev) => {
      const current = prev[moduleId] ?? { enabled: false, submodules: {} };
      return {
        ...prev,
        [moduleId]: {
          enabled: current.enabled,
          submodules: {
            ...current.submodules,
            [submoduleId]: !current.submodules[submoduleId],
          },
        },
      };
    });
  }

  const mrv = modules.mrv ?? { enabled: false, submodules: {} };
  const ndc = modules.ndc ?? { enabled: false, submodules: {} };
  const registry = modules.registry ?? { enabled: false, submodules: {} };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Select Modules</h1>
        <p className="mt-2 text-sm text-slate-600">
          Choose which modules to enable for your platform. You can configure
          sub-modules within each one. Modules can be enabled or disabled later.
        </p>
      </div>

      <div className="space-y-6">
        {/* MRV Module */}
        <ModuleCard
          id="mrv"
          title="MRV System"
          description="Measurement, Reporting, and Verification of greenhouse gas emissions. Manage your national GHG inventory with IPCC-compliant methodologies."
          color="emerald"
          enabled={mrv.enabled}
          onToggle={() => toggleModule("mrv")}
          submodules={[
            { id: "ghgInventory", label: "GHG Inventory Management", enabled: !!mrv.submodules.ghgInventory },
            { id: "activityData", label: "Activity Data Collection", enabled: !!mrv.submodules.activityData },
            { id: "emissionFactors", label: "Emission Factor Database", enabled: !!mrv.submodules.emissionFactors },
            { id: "qaqc", label: "QA/QC Workflows", enabled: !!mrv.submodules.qaqc },
            { id: "reporting", label: "Reporting & Export", enabled: !!mrv.submodules.reporting },
          ]}
          onToggleSubmodule={(subId) => toggleSubmodule("mrv", subId)}
        />

        {/* NDC Module */}
        <ModuleCard
          id="ndc"
          title="NDC Tracker"
          description="Track progress on Nationally Determined Contributions, manage mitigation actions, and monitor adaptation measures."
          color="blue"
          enabled={ndc.enabled}
          onToggle={() => toggleModule("ndc")}
          submodules={[
            { id: "targetTracking", label: "Target Tracking & Analytics", enabled: !!ndc.submodules.targetTracking },
            { id: "mitigationActions", label: "Mitigation Actions", enabled: !!ndc.submodules.mitigationActions },
            { id: "adaptationMeasures", label: "Adaptation Measures", enabled: !!ndc.submodules.adaptationMeasures },
            { id: "supportReceived", label: "Support Received / Needed", enabled: !!ndc.submodules.supportReceived },
            { id: "progressIndicators", label: "Progress Indicators", enabled: !!ndc.submodules.progressIndicators },
          ]}
          onToggleSubmodule={(subId) => toggleSubmodule("ndc", subId)}
        />

        {/* Registry Module */}
        <ModuleCard
          id="registry"
          title="Carbon Registry"
          description="Manage carbon credit projects, issuances, transfers, and retirements. Supports Article 6 compliance and ITMO tracking."
          color="amber"
          enabled={registry.enabled}
          onToggle={() => toggleModule("registry")}
          submodules={[
            { id: "projectManagement", label: "Project Management", enabled: !!registry.submodules.projectManagement },
            { id: "creditIssuance", label: "Credit Issuance", enabled: !!registry.submodules.creditIssuance },
            { id: "creditTransfer", label: "Credit Transfer", enabled: !!registry.submodules.creditTransfer },
            { id: "creditRetirement", label: "Credit Retirement", enabled: !!registry.submodules.creditRetirement },
            { id: "itmoTracking", label: "ITMO Tracking (Article 6)", enabled: !!registry.submodules.itmoTracking },
          ]}
          onToggleSubmodule={(subId) => toggleSubmodule("registry", subId)}
        />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link href="/country-profile" className="btn-secondary">
          Back
        </Link>
        <Link
          href={mrv.enabled ? "/mrv-setup" : ndc.enabled ? "/ndc-setup" : registry.enabled ? "/registry-setup" : "/complete"}
          className="btn-primary"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
