"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import RichTextEditor from "@/components/form-sections/rich-text-editor"

interface Step2Props {
  onNext: () => void
  onBack: () => void
}

export default function Step2EligibilityCriteria({ onNext, onBack }: Step2Props) {
  const [mechanism, setMechanism] = useState<string | null>(null)
  const [showMechanismDropdown, setShowMechanismDropdown] = useState(false)

  const mechanisms = ["Article 6.2", "Article 6.4 Mechanism", "Voluntary Carbon Markets", "Other Mechanisms"]

  return (
    <div className="space-y-6">
      {/* Kenya's Whitelist Alignment */}
      <div>
        <label className="block text-sm text-[#373737] mb-2">
          Please specify how the carbon project aligns to Kenya&apos;s whitelist
        </label>
        <RichTextEditor compact />
      </div>

      {/* Share of Carbon Credits for Domestic Use */}
      <div>
        <label className="block text-sm text-[#373737] mb-2">
          Specify the share of carbon Credit that will be reserved for domestic use
        </label>
        <RichTextEditor compact />
      </div>

      {/* Authorization Period */}
      <div>
        <label className="block text-sm text-[#373737] mb-2">
          Specify the period for which authorisation is being requested (start date – end date)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Indicate the start date"
              className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm pr-10"
            />
            <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828282]" />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Indicate the end date"
              className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm pr-10"
            />
            <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828282]" />
          </div>
        </div>
      </div>

      {/* Carbon Mechanism Type */}
      <div>
        <label className="block text-sm text-[#373737] mb-2">
          Specify the type of carbon mechanism in which the project is or will be registered
        </label>
        <div className="relative">
          <button
            onClick={() => setShowMechanismDropdown(!showMechanismDropdown)}
            className="w-full border border-[#008037] rounded-lg p-3 text-left flex items-center justify-between"
          >
            <span className="text-xs text-[#008037] absolute -top-2 left-3 bg-white px-1">
              Please choose the relevant
            </span>
            <span className={mechanism ? "text-[#373737] text-sm" : "text-[#828282] text-sm"}>{mechanism || ""}</span>
            <ChevronDown size={16} className={`transition-transform ${showMechanismDropdown ? "rotate-180" : ""}`} />
          </button>
          {showMechanismDropdown && (
            <div className="absolute top-full left-0 right-0 bg-white border border-[#e8e8e8] rounded-lg mt-1 z-20 overflow-hidden shadow-lg">
              {mechanisms.map((mech, index) => (
                <button
                  key={mech}
                  onClick={() => {
                    setMechanism(mech)
                    setShowMechanismDropdown(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-[#e8f5e9] text-sm ${index === 0 ? "bg-[#e8f5e9]" : ""}`}
                >
                  {mech}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Environmental Integrity */}
      <div>
        <label className="block text-sm text-[#373737] mb-2">
          Specify how the carbon project ensures environmental integrity in the following aspects:
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#f5f5f5] rounded-lg p-3">
            <span className="text-xs text-[#595959]">
              Baselines are set conservatively and below &apos;business-as-usual&apos; and emission projections.
            </span>
          </div>
          <div className="bg-[#f5f5f5] rounded-lg p-3">
            <span className="text-xs text-[#595959]">The risk of non-permanence of mitigation is minimized</span>
          </div>
        </div>
      </div>

      {/* Sustainable Development Priorities */}
      <div>
        <label className="block text-sm text-[#373737] mb-2">
          Specify how the carbon project is aligned with Kenya&apos;s sustainable development priorities
        </label>
        <RichTextEditor compact />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button onClick={onBack} className="px-8 py-2.5 bg-[#f5f5f5] text-[#828282] rounded-lg text-sm font-medium">
          GO BACK
        </button>
        <button onClick={onNext} className="px-8 py-2.5 bg-[#008037] text-white rounded-lg text-sm font-medium">
          SAVE AND CONTINUE
        </button>
      </div>
    </div>
  )
}
