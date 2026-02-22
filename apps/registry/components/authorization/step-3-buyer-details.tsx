"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"

interface Step3Props {
  onNext: () => void
  onBack: () => void
}

export default function Step3BuyerDetails({ onNext, onBack }: Step3Props) {
  const [buyerIdentified, setBuyerIdentified] = useState<string | null>(null)
  const [showBuyerDropdown, setShowBuyerDropdown] = useState(false)
  const [buyerType, setBuyerType] = useState<string | null>(null)
  const [showBuyerTypeDropdown, setShowBuyerTypeDropdown] = useState(false)
  const [selectedUses, setSelectedUses] = useState<string[]>(["Other international mitigation purposes"])
  const [showUsesDropdown, setShowUsesDropdown] = useState(false)
  const [frameworkAgreement, setFrameworkAgreement] = useState<string | null>(null)
  const [showFrameworkDropdown, setShowFrameworkDropdown] = useState(false)

  const useOptions = ["Use towards the achievement of an NDC", "CORSIA", "Other international mitigation purposes"]

  const toggleUse = (use: string) => {
    setSelectedUses((prev) => (prev.includes(use) ? prev.filter((u) => u !== use) : [...prev, use]))
  }

  return (
    <div className="space-y-6">
      {/* Buyer Identified */}
      <div>
        <label className="block text-sm text-[#373737] mb-2">
          Has a buyer for the ITMOs/authorised carbon Credit been identified?
        </label>
        <div className="relative">
          <button
            onClick={() => setShowBuyerDropdown(!showBuyerDropdown)}
            className="w-full max-w-md border border-[#008037] rounded-lg p-3 text-left flex items-center justify-between"
          >
            <span className="text-xs text-[#008037] absolute -top-2 left-3 bg-white px-1">
              Please choose the relevant
            </span>
            <span className={buyerIdentified ? "text-[#373737] text-sm" : "text-[#828282] text-sm"}>
              {buyerIdentified === "yes" ? "Yes" : buyerIdentified === "no" ? "No" : ""}
            </span>
            <ChevronDown size={16} className={`transition-transform ${showBuyerDropdown ? "rotate-180" : ""}`} />
          </button>
          {showBuyerDropdown && (
            <div className="absolute top-full left-0 max-w-md w-full bg-white border border-[#e8e8e8] rounded-lg mt-1 z-20 overflow-hidden shadow-lg">
              <button
                onClick={() => {
                  setBuyerIdentified("yes")
                  setShowBuyerDropdown(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-[#e8f5e9] text-sm bg-[#e8f5e9]"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setBuyerIdentified("no")
                  setShowBuyerDropdown(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-[#e8f5e9] text-sm"
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Buyer Type */}
      {buyerIdentified === "yes" && (
        <>
          <div>
            <label className="block text-sm text-[#373737] mb-2">Choose type of buyer</label>
            <div className="relative">
              <button
                onClick={() => setShowBuyerTypeDropdown(!showBuyerTypeDropdown)}
                className="w-full max-w-md border border-[#008037] rounded-lg p-3 text-left flex items-center justify-between"
              >
                <span className="text-xs text-[#008037] absolute -top-2 left-3 bg-white px-1">
                  Please choose the relevant
                </span>
                <span className={buyerType ? "text-[#373737] text-sm" : "text-[#828282] text-sm"}>
                  {buyerType || ""}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showBuyerTypeDropdown ? "rotate-180" : ""}`}
                />
              </button>
              {showBuyerTypeDropdown && (
                <div className="absolute top-full left-0 max-w-md w-full bg-white border border-[#e8e8e8] rounded-lg mt-1 z-20 overflow-hidden shadow-lg">
                  <button
                    onClick={() => {
                      setBuyerType("National Government (or authorised representative)")
                      setShowBuyerTypeDropdown(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#e8f5e9] text-sm bg-[#e8f5e9]"
                  >
                    National Government (or authorised representative)
                  </button>
                  <button
                    onClick={() => {
                      setBuyerType("Other Buyer")
                      setShowBuyerTypeDropdown(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#e8f5e9] text-sm"
                  >
                    Other Buyer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Buyer Details */}
          <div>
            <label className="block text-sm text-[#373737] mb-2">Details of the buyer</label>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <input
                type="text"
                placeholder="Enter the name of the buyer"
                className="border border-[#e8e8e8] rounded-lg p-3 text-sm"
              />
              <input
                type="text"
                placeholder="Contact details"
                className="border border-[#e8e8e8] rounded-lg p-3 text-sm"
              />
            </div>
          </div>
        </>
      )}

      {/* Use of Carbon Credits */}
      <div>
        <label className="block text-sm text-[#373737] mb-2">
          Specify the use of carbon Credit for which authorisation is being requested.
        </label>
        <div className="relative max-w-md">
          <button
            onClick={() => setShowUsesDropdown(!showUsesDropdown)}
            className="w-full border border-[#008037] rounded-lg p-3 text-left flex items-center justify-between"
          >
            <span className="text-xs text-[#008037] absolute -top-2 left-3 bg-white px-1">
              Please select all options that applies
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {selectedUses.map((use) => (
                <span
                  key={use}
                  className="inline-flex items-center gap-1 bg-[#e8f5e9] text-[#008037] px-2 py-1 rounded text-xs"
                >
                  {use}
                  <X
                    size={12}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleUse(use)
                    }}
                  />
                </span>
              ))}
            </div>
            <ChevronDown size={16} className={`transition-transform ${showUsesDropdown ? "rotate-180" : ""}`} />
          </button>
          {showUsesDropdown && (
            <div className="absolute top-full left-0 w-full bg-white border border-[#e8e8e8] rounded-lg mt-1 z-20 overflow-hidden shadow-lg">
              {useOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleUse(option)}
                  className={`w-full px-4 py-3 text-left hover:bg-[#e8f5e9] text-sm ${
                    selectedUses.includes(option) ? "bg-[#e8f5e9]" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* If Other */}
      {selectedUses.includes("Other international mitigation purposes") && (
        <div>
          <label className="block text-sm text-[#373737] mb-2">If Other</label>
          <input
            type="text"
            placeholder="please provide details and if use is more than one set out apportioned carbon Credit for each use type)"
            className="w-full max-w-md border border-[#e8e8e8] rounded-lg p-3 text-sm"
          />
        </div>
      )}

      {/* Framework Agreement */}
      <div>
        <label className="block text-sm text-[#373737] mb-2">
          Has the country in which the buyer is based entered into a framework agreement for Article 6.2 cooperation
          with the Republic of Kenya?
        </label>
        <div className="relative max-w-md">
          <button
            onClick={() => setShowFrameworkDropdown(!showFrameworkDropdown)}
            className="w-full border border-[#008037] rounded-lg p-3 text-left flex items-center justify-between"
          >
            <span className="text-xs text-[#008037] absolute -top-2 left-3 bg-white px-1">
              Please choose the relevant
            </span>
            <span className={frameworkAgreement ? "text-[#373737] text-sm" : "text-[#828282] text-sm"}>
              {frameworkAgreement === "yes" ? "Yes" : frameworkAgreement === "no" ? "No" : ""}
            </span>
            <ChevronDown size={16} className={`transition-transform ${showFrameworkDropdown ? "rotate-180" : ""}`} />
          </button>
          {showFrameworkDropdown && (
            <div className="absolute top-full left-0 w-full bg-white border border-[#e8e8e8] rounded-lg mt-1 z-20 overflow-hidden shadow-lg">
              <button
                onClick={() => {
                  setFrameworkAgreement("yes")
                  setShowFrameworkDropdown(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-[#e8f5e9] text-sm bg-[#e8f5e9]"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setFrameworkAgreement("no")
                  setShowFrameworkDropdown(false)
                }}
                className="w-full px-4 py-3 text-left hover:bg-[#e8f5e9] text-sm"
              >
                No
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Country Name */}
      {frameworkAgreement === "yes" && (
        <div>
          <label className="block text-sm text-[#373737] mb-2">If yes, please specify the country name</label>
          <input
            type="text"
            placeholder="Please enter the country name"
            className="w-full max-w-md border border-[#e8e8e8] rounded-lg p-3 text-sm"
          />
        </div>
      )}

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
