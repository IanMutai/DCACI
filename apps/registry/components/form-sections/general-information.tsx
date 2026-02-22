"use client"

import { Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GeneralInformation() {
  return (
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
  )
}
