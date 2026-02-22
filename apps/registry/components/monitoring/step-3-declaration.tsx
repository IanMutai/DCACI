"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Info, FileText } from "lucide-react"

interface Step3Props {
  onSubmit: () => void
  onBack: () => void
}

export default function Step3Declaration({ onSubmit, onBack }: Step3Props) {
  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="flex items-center gap-2 p-3 bg-[#fff8e6] border border-[#f0d78e] rounded-lg">
        <Info size={18} className="text-[#b8860b]" />
        <span className="text-sm text-[#595959]">
          Please download a declaration form, once signed please upload it below:{" "}
          <a href="#" className="text-[#008037] font-medium hover:underline">
            Download
          </a>
        </span>
      </div>

      {/* Upload Section */}
      <div className="bg-[#f9f9f9] rounded-lg p-6 space-y-4">
        <Label className="text-sm font-medium text-[#373737]">Please upload a signed declaration</Label>

        <div className="border-2 border-dashed border-[#d1d1d1] rounded-lg p-8 text-center hover:border-[#008037] transition-colors cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-[#e8f5e9] rounded-lg flex items-center justify-center">
              <FileText size={24} className="text-[#008037]" />
            </div>
            <div>
              <span className="text-[#008037] font-medium cursor-pointer hover:underline">Click to upload</span>
              <span className="text-[#828282]"> or drag and drop</span>
            </div>
            <span className="text-xs text-[#828282]">PDF, DOCX (max. 3MB)</span>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="px-8 bg-transparent">
          GO BACK
        </Button>
        <Button onClick={onSubmit} className="bg-[#008037] hover:bg-[#006b2d] text-white px-8">
          SUBMIT AND CONTINUE
        </Button>
      </div>
    </div>
  )
}
