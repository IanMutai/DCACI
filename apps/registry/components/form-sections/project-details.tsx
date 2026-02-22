"use client"

import { Calendar, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProjectDetails() {
  return (
    <section>
      <h2 className="text-lg font-semibold text-[#008037] mb-4">Project Details</h2>

      <div className="space-y-4">
        {/* Project Description */}
        <div>
          <Label className="text-sm text-[#373737] mb-2 block">Project Description</Label>
          <Textarea
            placeholder="Please enter your project description"
            className="bg-white border-[#e8e8e8] min-h-[120px] rounded-md resize-none"
          />
        </div>

        {/* Location */}
        <div>
          <Label className="text-sm text-[#373737] mb-2 block">Location</Label>
          <div className="relative">
            <Input
              placeholder="Please choose appropriately"
              className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10"
            />
            <MapPin size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#008037]" />
          </div>
        </div>

        {/* Site and Land Size */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-[#373737] mb-2 block">Site</Label>
            <Input
              placeholder="Please enter your precise GPS Coordinates"
              className="bg-white border-[#e8e8e8] h-12 rounded-md"
            />
          </div>
          <div>
            <Label className="text-sm text-[#373737] mb-2 block">Land size</Label>
            <Select>
              <SelectTrigger className="bg-white border-[#e8e8e8] h-12 rounded-md text-[#828282] text-sm">
                <SelectValue placeholder="land area for land-based projects and No. of Units for non land-based Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (0-100 hectares)</SelectItem>
                <SelectItem value="medium">Medium (100-1000 hectares)</SelectItem>
                <SelectItem value="large">Large (1000+ hectares)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Objectives and Proposed Activities */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-[#373737] mb-2 block">Objectives</Label>
            <Input
              placeholder="please enter the objectives of your project"
              className="bg-white border-[#e8e8e8] h-12 rounded-md"
            />
          </div>
          <div>
            <Label className="text-sm text-[#373737] mb-2 block">Proposed Activities</Label>
            <Input
              placeholder="please enter the proposed activities of your project"
              className="bg-white border-[#e8e8e8] h-12 rounded-md"
            />
          </div>
        </div>

        {/* Timeline and Budget */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-[#373737] mb-2 block">Timeline</Label>
            <div className="relative">
              <Input
                placeholder="please enter the timeline of your project"
                className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10"
              />
              <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#008037]" />
            </div>
          </div>
          <div>
            <Label className="text-sm text-[#373737] mb-2 block">Budget</Label>
            <Input placeholder="$0.00" className="bg-white border-[#e8e8e8] h-12 rounded-md" />
          </div>
        </div>

        {/* Linkage to National Priorities */}
        <div>
          <Label className="text-sm text-[#373737] mb-2 block">Linkage to national priorities</Label>
          <Select>
            <SelectTrigger className="bg-white border-[#e8e8e8] h-12 rounded-md">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ecological">Ecological</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="cultural">Cultural</SelectItem>
              <SelectItem value="economic">Economic Safeguards</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Safeguards Dropdown Preview */}
        <div className="bg-white border border-[#e8e8e8] rounded-md shadow-lg p-2 max-w-[200px] ml-auto">
          <div className="py-2 px-3 text-sm text-[#595959] hover:bg-[#f9f9f9] cursor-pointer rounded">Ecological</div>
          <div className="py-2 px-3 text-sm text-[#595959] hover:bg-[#f9f9f9] cursor-pointer rounded flex items-center justify-between">
            Social
            <div className="w-4 h-4 bg-[#008037] rounded-full" />
          </div>
          <div className="py-2 px-3 text-sm text-[#595959] hover:bg-[#f9f9f9] cursor-pointer rounded">Cultural</div>
          <div className="py-2 px-3 text-sm text-[#595959] hover:bg-[#f9f9f9] cursor-pointer rounded">
            Economic Safeguards
          </div>
        </div>
      </div>
    </section>
  )
}
