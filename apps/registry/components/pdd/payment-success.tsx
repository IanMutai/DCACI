"use client"

import { CheckCircle, Download } from "lucide-react"

interface PaymentSuccessProps {
  amount: string
  onContinue: () => void
}

export default function PaymentSuccess({ amount, onContinue }: PaymentSuccessProps) {
  return (
    <div className="space-y-6">
      {/* Success Icon and Message */}
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#e8f5e9] rounded-full mb-4">
          <CheckCircle className="w-10 h-10 text-[#008037]" />
        </div>
        <h2 className="text-2xl font-semibold text-[#008037] mb-2">Payment Success!</h2>
        <p className="text-3xl font-bold text-[#373737]">{amount}</p>
      </div>

      {/* Payment Details */}
      <div className="bg-[#f9f9f9] rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-medium text-[#373737]">Payment Details</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-[#828282]">Ref Number</span>
            <p className="font-medium text-[#373737]">000085752257</p>
          </div>
          <div>
            <span className="text-[#828282]">Payment Time</span>
            <p className="font-medium text-[#373737]">25-02-2023, 13:22:16</p>
          </div>
          <div>
            <span className="text-[#828282]">Payment Method</span>
            <p className="font-medium text-[#373737]">Bank Transfer</p>
          </div>
          <div>
            <span className="text-[#828282]">Sender Name</span>
            <p className="font-medium text-[#373737]">Antonio Roberto</p>
          </div>
          <div>
            <span className="text-[#828282]">Amount</span>
            <p className="font-medium text-[#373737]">{amount}</p>
          </div>
          <div>
            <span className="text-[#828282]">Admin Fee</span>
            <p className="font-medium text-[#373737]">{amount}</p>
          </div>
          <div>
            <span className="text-[#828282]">Payment Status</span>
            <p className="font-medium text-[#008037]">Success</p>
          </div>
        </div>
      </div>

      {/* Download Receipt */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 text-[#008037] hover:underline">
          <Download size={16} />
          <span className="text-sm font-medium">Download Receipt</span>
        </button>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pt-4">
        <button onClick={onContinue} className="px-8 py-2.5 bg-[#008037] text-white rounded-lg text-sm font-medium">
          CONTINUE TO PDD SUBMISSION
        </button>
      </div>
    </div>
  )
}
