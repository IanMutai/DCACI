"use client";

import { usePathname } from "next/navigation";
import StepIndicator from "@/components/onboarding/step-indicator";

const ONBOARDING_STEPS = [
  { path: "/welcome", label: "Welcome" },
  { path: "/country-profile", label: "Country Profile" },
  { path: "/module-selection", label: "Select Modules" },
  { path: "/mrv-setup", label: "MRV Setup" },
  { path: "/ndc-setup", label: "NDC Setup" },
  { path: "/registry-setup", label: "Registry Setup" },
  { path: "/complete", label: "Complete" },
];

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentStepIndex = ONBOARDING_STEPS.findIndex((step) =>
    pathname.endsWith(step.path)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-teal-700 flex items-center justify-center">
                <span className="text-white font-bold text-sm">NC</span>
              </div>
              <span className="text-lg font-bold text-slate-900">DCACI</span>
              <span className="ml-2 rounded-full bg-teal-50 px-3 py-0.5 text-xs font-medium text-teal-700">
                Setup
              </span>
            </div>
            <button className="text-sm text-slate-500 hover:text-slate-700">
              Save & Exit
            </button>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <StepIndicator
          steps={ONBOARDING_STEPS.map((s) => s.label)}
          currentStep={currentStepIndex >= 0 ? currentStepIndex : 0}
        />
      </div>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 pb-16 sm:px-6">{children}</main>
    </div>
  );
}
