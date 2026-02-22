"use client"

import { Button } from "@/components/ui/button"
import { FileText, Download, Check, Plus } from "lucide-react"

interface AnnualReport {
  id: string
  name: string
  size: string
  status: "complete" | "pending"
}

const annualReports: AnnualReport[] = [
  { id: "1", name: "Annual Report for year one.pdf", size: "100kb", status: "complete" },
  { id: "2", name: "Annual Report for year two.pdf", size: "100kb", status: "complete" },
  { id: "3", name: "Annual Report for year two.pdf", size: "100kb", status: "complete" },
]

interface AnnualReportsViewProps {
  onUploadNew: () => void
}

export default function AnnualReportsView({ onUploadNew }: AnnualReportsViewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#008037]">Annual Reports</h2>
        <Button onClick={onUploadNew} className="bg-[#008037] hover:bg-[#006b2d] text-white">
          Upload New Annual Report <Plus size={16} className="ml-2" />
        </Button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {annualReports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between p-4 bg-white border border-[#e8e8e8] rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f0f0f0] rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-[#828282]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#373737]">{report.name}</p>
                <p className="text-xs text-[#828282]">{report.size} • Complete</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-[#f9f9f9] rounded-lg">
                <Download size={18} className="text-[#595959]" />
              </button>
              <div className="w-6 h-6 bg-[#008037] rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
