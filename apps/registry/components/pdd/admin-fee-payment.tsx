"use client"

import { useState } from "react"

interface AdminFeePaymentProps {
  projectName: string
  projectType: string
  feeAmount: string
  citizenship: "citizen" | "non-citizen" | null
  creditSelection: "15k-or-less" | "more-than-15k" | null
  onProceed: () => void
  onBack: () => void
}

export default function AdminFeePayment({
  projectName,
  projectType,
  feeAmount,
  citizenship,
  creditSelection,
  onProceed,
  onBack,
}: AdminFeePaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"ecitizen" | "ussd">("ussd")

  const getPaymentDescription = () => {
    const creditText = creditSelection === "more-than-15k" ? "more than 15,000" : "15,000 or less"
    return `Payment of KES ${feeAmount} for ${creditText} carbon credits per annum.`
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#008037]">
        {citizenship === "citizen" ? "Administrative Fee" : "Carbon Project Design Document Fee"}
      </h2>

      {/* Please Note */}
      <div className="text-sm text-[#595959]">
        <span className="font-medium">Please Note</span>
        <p className="mt-1">
          Before proceeding with the payment for the <span className="font-medium">{projectName}</span>, please note
          that A carbon project application for a {citizenship === "citizen" ? "citizen" : "non-citizen"} is charged{" "}
          {citizenship === "citizen" && creditSelection === "15k-or-less"
            ? "10,000"
            : citizenship === "citizen" && creditSelection === "more-than-15k"
              ? "100,000"
              : creditSelection === "15k-or-less"
                ? "100,000"
                : "200,000"}{" "}
          Kshs.
        </p>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#373737]">Payment Details</h3>
        <div className="flex gap-4">
          <div className="bg-[#f9f9f9] rounded-lg p-4 flex-1">
            <div className="text-xs text-[#828282]">Project Name</div>
            <div className="text-sm font-medium text-[#373737] mt-1">{projectName}</div>
          </div>
          <div className="bg-[#f9f9f9] rounded-lg p-4 flex-1">
            <div className="text-xs text-[#828282]">Project Type</div>
            <div className="text-sm font-medium text-[#373737] mt-1">{projectType}</div>
          </div>
        </div>
      </div>

      {/* Payment Description */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[#373737]">Payment Description</h3>
        <p className="text-sm text-[#595959]">
          Payment of <span className="font-medium">KES {feeAmount}</span> for the{" "}
          <span className="font-medium">{projectName}</span>.
        </p>
      </div>

      {/* Summary */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-[#373737]">Summary</h3>
        <div className="flex gap-4">
          <div className="bg-[#f9f9f9] rounded-lg p-4 flex-1">
            <div className="text-xs text-[#828282]">Project fee</div>
            <div className="text-sm font-medium text-[#373737] mt-1">KES {feeAmount}</div>
          </div>
          <div className="bg-[#f9f9f9] rounded-lg p-4 flex-1">
            <div className="text-xs text-[#828282]">Transaction Fee</div>
            <div className="text-sm font-medium text-[#373737] mt-1">KES 0</div>
          </div>
          <div className="bg-[#f9f9f9] rounded-lg p-4 flex-1">
            <div className="text-xs text-[#828282]">Total Amount</div>
            <div className="text-sm font-medium text-[#373737] mt-1">KES {feeAmount}</div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-[#373737]">Payment method</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={paymentMethod === "ecitizen"}
              onChange={() => setPaymentMethod("ecitizen")}
              className="w-4 h-4 rounded border-[#e8e8e8]"
            />
            <span className="text-sm text-[#595959]">Pay via e-Citizen portal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-4 h-4 rounded flex items-center justify-center ${
                paymentMethod === "ussd" ? "bg-[#008037]" : "border border-[#e8e8e8]"
              }`}
              onClick={() => setPaymentMethod("ussd")}
            >
              {paymentMethod === "ussd" && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-[#595959]">Pay via USSD</span>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button onClick={onBack} className="px-8 py-2.5 bg-[#f5f5f5] text-[#828282] rounded-lg text-sm font-medium">
          GO BACK
        </button>
        <button onClick={onProceed} className="px-8 py-2.5 bg-[#008037] text-white rounded-lg text-sm font-medium">
          PROCEED TO PAYMENTS
        </button>
      </div>
    </div>
  )
}
