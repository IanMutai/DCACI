"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Step1Props {
  onNext: () => void
  onBack: () => void
}

export default function Step1ProjectDetails({ onNext, onBack }: Step1Props) {
  return (
    <div className="space-y-6">
      {/* Project Info Display */}
      <div className="bg-[#f9f9f9] rounded-lg p-4 border-l-4 border-[#008037]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div>
            <span className="text-sm text-[#595959]">Project Proponent Name: </span>
            <span className="text-sm font-medium text-[#373737]">Naima Salim</span>
          </div>
          <div>
            <span className="text-sm text-[#595959]">Project Name: </span>
            <span className="text-sm font-medium text-[#373737]">Kilifi Solar</span>
          </div>
          <div>
            <span className="text-sm text-[#595959]">Project Registration Number: </span>
            <span className="text-sm font-medium text-[#373737]">723ueiw823jkdw</span>
          </div>
          <div>
            <span className="text-sm text-[#595959]">Reporting period: </span>
            <span className="text-sm font-medium text-[#373737]">7years</span>
          </div>
        </div>
      </div>

      {/* Completed By Section */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-[#373737]">Completed by</Label>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input placeholder="Full Name" className="bg-[#f9f9f9] border-[#e8e8e8]" />
          </div>
          <div className="space-y-2">
            <Input placeholder="Designation" className="bg-[#f9f9f9] border-[#e8e8e8]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Input placeholder="Phone Number" className="bg-[#f9f9f9] border-[#e8e8e8]" />
          </div>
          <div className="space-y-2">
            <Input placeholder="Email Address" type="email" className="bg-[#f9f9f9] border-[#e8e8e8]" />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="px-8 bg-transparent">
          GO BACK
        </Button>
        <Button onClick={onNext} className="bg-[#008037] hover:bg-[#006b2d] text-white px-8">
          SAVE AND CONTINUE
        </Button>
      </div>
    </div>
  )
}
