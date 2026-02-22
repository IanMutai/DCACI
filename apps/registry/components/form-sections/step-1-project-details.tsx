"use client"

import { Calendar, MapPin, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Step1ProjectDetails() {
  return (
    <div className="space-y-8">
      {/* General Information Section */}
      <section>
        <h2 className="text-lg font-semibold text-[#008037] mb-4">General Information</h2>

        <div className="space-y-4">
          {/* Row 1: Title and Reference Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Title of the Project</Label>
              <Input
                placeholder="Please enter the title of your project"
                className="bg-white border-[#e8e8e8] h-12 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Project Application Reference Number</Label>
              <div className="bg-[#efefef] h-12 rounded-md flex items-center px-4 text-[#828282] text-sm">
                QWYW67 Project X
              </div>
            </div>
          </div>

          {/* Row 2: Date and Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Date of Application</Label>
              <div className="relative">
                <Input
                  placeholder="please enter the date of application"
                  className="bg-white border-[#e8e8e8] h-12 rounded-md pr-10"
                />
                <Calendar size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#008037]" />
              </div>
            </div>
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Type of project</Label>
              <Select defaultValue="energy">
                <SelectTrigger className="bg-[#008037] text-white border-0 h-12 rounded-md">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="forestry">Forestry</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Sectoral Scope and Sub-scopes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Choose your sectoral scope</Label>
              <Select>
                <SelectTrigger className="bg-white border-[#e8e8e8] h-12 rounded-md">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scope1">Scope 1</SelectItem>
                  <SelectItem value="scope2">Scope 2</SelectItem>
                  <SelectItem value="scope3">Scope 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Choose your sub-scopes</Label>
              <Select>
                <SelectTrigger className="bg-white border-[#e8e8e8] h-12 rounded-md">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sub1">Sub-scope 1</SelectItem>
                  <SelectItem value="sub2">Sub-scope 2</SelectItem>
                  <SelectItem value="sub3">Sub-scope 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Section */}
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
        </div>
      </section>

      {/* Image Upload Section */}
      <section>
        <h2 className="text-sm font-medium text-[#008037] mb-4">Please upload a few images of your project</h2>

        <div className="border-2 border-dashed border-[#008037] rounded-lg p-12 bg-white">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-[#f9f9f9] rounded-full flex items-center justify-center mb-4">
              <Upload size={24} className="text-[#828282]" />
            </div>
            <p className="text-sm font-medium text-[#373737]">Upload your project images</p>
            <p className="text-xs text-[#828282] mt-1">
              You can either tap on this upload window or drag and
              <br />
              drop the files here
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
