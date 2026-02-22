"use client";

interface SubmoduleItem {
  id: string;
  label: string;
  enabled: boolean;
}

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  color: "emerald" | "blue" | "amber";
  enabled: boolean;
  onToggle: () => void;
  submodules: SubmoduleItem[];
  onToggleSubmodule: (submoduleId: string) => void;
}

const colorMap = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    activeBorder: "border-emerald-500",
    icon: "bg-emerald-100 text-emerald-700",
    toggle: "bg-emerald-600",
    checkbox: "text-emerald-700",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    activeBorder: "border-blue-500",
    icon: "bg-blue-100 text-blue-700",
    toggle: "bg-blue-600",
    checkbox: "text-blue-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    activeBorder: "border-amber-500",
    icon: "bg-amber-100 text-amber-700",
    toggle: "bg-amber-600",
    checkbox: "text-amber-700",
  },
};

export default function ModuleCard({
  id,
  title,
  description,
  color,
  enabled,
  onToggle,
  submodules,
  onToggleSubmodule,
}: ModuleCardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={`rounded-xl border-2 p-6 transition-colors ${
        enabled ? `${colors.bg} ${colors.activeBorder}` : "border-slate-200 bg-white"
      }`}
    >
      {/* Module Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.icon}`}
          >
            <span className="text-sm font-bold">
              {id === "mrv" ? "MRV" : id === "ndc" ? "NDC" : "REG"}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
            enabled ? colors.toggle : "bg-slate-200"
          }`}
          role="switch"
          aria-checked={enabled}
          aria-label={`Toggle ${title}`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Submodules */}
      {enabled && (
        <div className="mt-4 space-y-2 border-t border-slate-200/50 pt-4">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            Sub-modules
          </p>
          {submodules.map((sub) => (
            <label
              key={sub.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={sub.enabled}
                onChange={() => onToggleSubmodule(sub.id)}
                className={`h-4 w-4 rounded border-slate-300 ${colors.checkbox} focus:ring-teal-500`}
              />
              <span className="text-sm text-slate-700">{sub.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
