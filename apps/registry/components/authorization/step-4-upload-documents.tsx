"use client"

import { Upload, Info } from "lucide-react"

interface Step4Props {
  onNext: () => void
  onBack: () => void
  isRenewal?: boolean
}

export default function Step4UploadDocuments({ onNext, onBack, isRenewal = false }: Step4Props) {
  return (
    <div className="space-y-6">
      {/* Proponent Contact Details */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-[#828282] mb-1">Name of Project Proponent</label>
          <div className="bg-[#f5f5f5] rounded-lg p-3">
            <span className="text-sm text-[#373737]">Naima Salim</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#828282] mb-1">Email Address</label>
          <div className="bg-[#f5f5f5] rounded-lg p-3">
            <span className="text-sm text-[#373737]">nsalim@verst.earth</span>
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#828282] mb-1">Phone Number</label>
          <div className="bg-[#f5f5f5] rounded-lg p-3">
            <span className="text-sm text-[#373737]">(+254) 769 523 085</span>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="bg-[#f9f9f9] rounded-lg p-4 flex gap-3">
        <Info size={16} className="text-[#828282] mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#595959]">
          NOTE: The following supporting documentation must be submitted in conjunction with this request for a Letter
          of Authorisation
        </p>
      </div>

      {/* Upload Letter of Approval */}
      <div>
        <label className="block text-sm text-[#008037] font-medium mb-2">Please Upload Letter of Approval</label>
        <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Upload size={24} className="text-[#828282]" />
            <div className="text-sm">
              <span className="text-[#008037] cursor-pointer">Click to upload</span>
              <span className="text-[#828282]"> or drag and drop</span>
            </div>
            <div className="text-xs text-[#828282]">PDF, DOCX (max. 3MB)</div>
          </div>
        </div>
      </div>

      {/* Upload Prior Letters of Authorization (Renewal Only) */}
      {isRenewal && (
        <div>
          <label className="block text-sm text-[#008037] font-medium mb-2">
            Please Upload Prior Letter/s of Authorisation (only applicable if requesting the renewal of an authorisation
            period)
          </label>
          <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Upload size={24} className="text-[#828282]" />
              <div className="text-sm">
                <span className="text-[#008037] cursor-pointer">Click to upload</span>
                <span className="text-[#828282]"> or drag and drop</span>
              </div>
              <div className="text-xs text-[#828282]">PDF, DOCX (max. 3MB)</div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Agreement Document */}
      <div>
        <label className="block text-sm text-[#008037] font-medium mb-2">
          Please upload agreement document entered into with buyer for the authorized carbon Credit (where existing)
        </label>
        <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Upload size={24} className="text-[#828282]" />
            <div className="text-sm">
              <span className="text-[#008037] cursor-pointer">Click to upload</span>
              <span className="text-[#828282]"> or drag and drop</span>
            </div>
            <div className="text-xs text-[#828282]">PDF, DOCX (max. 3MB)</div>
          </div>
        </div>
      </div>

      {/* Upload Project Design Document */}
      <div>
        <label className="block text-sm text-[#008037] font-medium mb-2">Please upload project design document</label>
        <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <Upload size={24} className="text-[#828282]" />
            <div className="text-sm">
              <span className="text-[#008037] cursor-pointer">Click to upload</span>
              <span className="text-[#828282]"> or drag and drop</span>
            </div>
            <div className="text-xs text-[#828282]">PDF, DOCX (max. 3MB)</div>
          </div>
        </div>
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
