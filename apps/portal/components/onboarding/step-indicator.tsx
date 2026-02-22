"use client";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="mb-4 flex items-center gap-1">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              index <= currentStep ? "bg-teal-700" : "bg-slate-200"
            }`}
          />
        ))}
      </div>

      {/* Step Labels (visible on larger screens) */}
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${
              index <= currentStep ? "text-teal-700" : "text-slate-400"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                index < currentStep
                  ? "bg-teal-700 text-white"
                  : index === currentStep
                    ? "border-2 border-teal-700 text-teal-700"
                    : "border border-slate-300 text-slate-400"
              }`}
            >
              {index < currentStep ? (
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </span>
            <span className="text-xs font-medium">{step}</span>
          </div>
        ))}
      </div>

      {/* Mobile: Current Step Label */}
      <div className="sm:hidden flex items-center justify-between">
        <span className="text-sm font-medium text-teal-700">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm text-slate-500">{steps[currentStep]}</span>
      </div>
    </div>
  );
}
