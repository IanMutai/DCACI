"use client"

import { Button } from "@/components/ui/button"
import { Check, Info } from "lucide-react"

interface SubmissionSuccessProps {
  onViewReports: () => void
}

export default function SubmissionSuccess({ onViewReports }: SubmissionSuccessProps) {
  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="flex items-start gap-2 p-4 bg-[#f0f9f4] border border-[#c8e6c9] rounded-lg">
        <Info size={18} className="text-[#008037] mt-0.5" />
        <span className="text-sm text-[#595959]">
          Dear Naima Salim, you have successfully submitted your annual report for year one. You have 6 pending annual
          reports submission, please submit before 12/9/2024.
        </span>
      </div>

      {/* Success Card */}
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-16 h-16 bg-[#e8f5e9] rounded-full flex items-center justify-center">
          <Check size={32} className="text-[#008037]" />
        </div>
        <h3 className="text-xl font-semibold text-[#373737]">Thank You For Your Submission!</h3>
        <p className="text-sm text-[#595959] text-center max-w-md">
          You have successfully submitted your letter of declaration and submitted your annual report for year one.
        </p>
        <Button onClick={onViewReports} className="bg-[#008037] hover:bg-[#006b2d] text-white px-6">
          View annual reports
        </Button>
      </div>
    </div>
  )
}
