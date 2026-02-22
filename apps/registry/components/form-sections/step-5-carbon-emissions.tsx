"use client"

import { Calendar, Upload, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RichTextEditor from "./rich-text-editor"

export default function Step5CarbonEmissions() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-[#008037] mb-4">Carbon Emission Details</h2>

        {/* Greenhouse Gases Rich Text */}
        <div className="mb-6">
          <Label className="text-sm text-[#373737] mb-2 block">
            Please provide details of the Greenhouse Gases targeted by the Project
          </Label>
          <RichTextEditor />
        </div>

        {/* GHG Quantities and Project Management */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Label className="text-sm text-[#373737] mb-2 block">
              Please provide details of the Greenhouse Gas quantities to be
              <br />
              reduced or removed by the Project
            </Label>
            <Input
              placeholder="Please enter the amount in tonnes"
              className="bg-white border-[#e8e8e8] h-12 rounded-md"
            />
          </div>
          <div>
            <Label className="text-sm text-[#373737] mb-2 block">
              Upload a Proposed Project Management and Governance Structure
            </Label>
            <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-4 bg-white">
              <div className="flex flex-col items-center justify-center text-center">
                <Upload size={20} className="text-[#828282] mb-1" />
                <p className="text-xs text-[#373737]">
                  <span className="text-[#008037] underline cursor-pointer">Click to upload</span> or drag and drop
                </p>
                <p className="text-[10px] text-[#828282]">PDF, DOCX (max. 3MB)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeframe */}
        <div className="mb-6">
          <Label className="text-sm text-[#373737] mb-2 block">Timeframe</Label>
          <div className="grid grid-cols-3 gap-4">
            <div className="relative">
              <Input placeholder="Expected Start Date" className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10" />
              <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#008037]" />
            </div>
            <div className="relative">
              <Input
                placeholder="Base Year of the first expected carbon Credit"
                className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10"
              />
              <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#008037]" />
            </div>
            <div className="relative">
              <Input placeholder="Project lifetime" className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10" />
              <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#008037]" />
            </div>
          </div>
        </div>

        {/* Baseline Scenario */}
        <div className="mb-6">
          <Label className="text-sm text-[#373737] mb-2 block">
            <span className="font-medium">Baseline Scenario</span> (Please enter the description of the current status
            if the emission removal or reduction activities are not implemented)
          </Label>
          <RichTextEditor />
        </div>

        {/* Expected Carbon Credits and Environment Benefits */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Expected Carbon Credits per annum</Label>
              <Input
                placeholder="Please enter the amount in tonnes"
                className="bg-white border-[#e8e8e8] h-12 rounded-md"
              />
            </div>
            <div>
              <Input placeholder="Projected Proceeds" className="bg-white border-[#e8e8e8] h-12 rounded-md" />
            </div>
          </div>
          <div>
            <Label className="text-sm text-[#373737] mb-2 block">
              Expected Environment and socio-economic benefits
            </Label>
            <RichTextEditor compact />
          </div>
        </div>

        {/* Carbon Standards */}
        <div className="mb-6">
          <Label className="text-sm text-[#373737] mb-2 block">Carbon Standard(s) to be used</Label>
          <Select>
            <SelectTrigger className="bg-white border-[#008037] h-12 rounded-md">
              <SelectValue placeholder="Choose a Carbon Standard to be used by your project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vcs">Verra - Verified Carbon Standard (VCS)</SelectItem>
              <SelectItem value="gold">Gold Standard</SelectItem>
              <SelectItem value="car">Climate Action Reserve (CAR)</SelectItem>
              <SelectItem value="acr">American Carbon Registry (ACR)</SelectItem>
              <SelectItem value="planvivo">Plan Vivo</SelectItem>
              <SelectItem value="puro">Puro.earth</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Project Costs */}
        <div className="mb-6">
          <Label className="text-sm text-[#373737] mb-4 block font-medium">Project Costs</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Input
                placeholder="Preparation costs ($0.00)"
                className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10"
              />
              <Info size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828282]" />
            </div>
            <div className="relative">
              <Input
                placeholder="Establishment Costs ($0.00)"
                className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10"
              />
              <Info size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828282]" />
            </div>
            <div className="relative">
              <Input
                placeholder="Other costs (Please Explain)"
                className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10"
              />
              <Info size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828282]" />
            </div>
            <div className="relative">
              <Input
                placeholder="Total project costs ($0.00)"
                className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10"
              />
              <Info size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#828282]" />
            </div>
          </div>
        </div>

        {/* Environmental Impact Assessment */}
        <div className="mb-6">
          <Label className="text-sm text-[#373737] mb-2 block">
            Attach Project's Environmental and Social Impact Assessment Report
          </Label>
          <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-8 bg-white">
            <div className="flex flex-col items-center justify-center text-center">
              <Upload size={24} className="text-[#828282] mb-2" />
              <p className="text-sm text-[#373737]">
                <span className="text-[#008037] underline cursor-pointer">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-[#828282] mt-1">PDF, DOCX (max. 3MB)</p>
            </div>
          </div>
        </div>

        {/* Reduced Emissions Report */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm text-[#373737]">
              Please upload Reduced Emissions from Deforestation and Forest Degradation Safeguards Standards
              <br />
              Assessment Report as required under Section 23D of the Climate Change Act.
            </Label>
            <span className="text-sm text-[#828282]">If applicable</span>
          </div>
          <div className="border-2 border-dashed border-[#e8e8e8] rounded-lg p-8 bg-white">
            <div className="flex flex-col items-center justify-center text-center">
              <Upload size={24} className="text-[#828282] mb-2" />
              <p className="text-sm text-[#373737]">
                <span className="text-[#008037] underline cursor-pointer">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-[#828282] mt-1">PDF, DOCX (max. 3MB)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
