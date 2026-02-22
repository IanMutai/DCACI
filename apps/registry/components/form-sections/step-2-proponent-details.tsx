"use client"

import { useState } from "react"
import { Upload, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import OrganizationalCategories from "./organizational-categories"

export default function Step2ProponentDetails() {
  const [isProprietor, setIsProprietor] = useState<string | undefined>()
  const [spansMultipleCounties, setSpansMultipleCounties] = useState(true)

  return (
    <div className="space-y-8">
      {/* Is Proponent the Proprietor Question */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <Label className="text-sm text-[#373737]">Is the project proponent the Proprietor?</Label>
          <div className="w-4 h-4 bg-[#008037] rounded-full flex items-center justify-center">
            <span className="text-white text-[10px]">i</span>
          </div>
        </div>
        <Select value={isProprietor} onValueChange={setIsProprietor}>
          <SelectTrigger className="bg-white border-[#008037] h-12 rounded-md w-full">
            <SelectValue placeholder="Kindly choose one" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes" className="bg-[#e8f5e9]">
              Yes
            </SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Proprietor Details */}
      <section>
        <h2 className="text-lg font-semibold text-[#008037] mb-4">Proprietor Details</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Name</Label>
              <Input placeholder="Please enter your name" className="bg-white border-[#e8e8e8] h-12 rounded-md" />
            </div>
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Address</Label>
              <Input placeholder="Please enter your address" className="bg-white border-[#e8e8e8] h-12 rounded-md" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Telephone</Label>
              <Input
                placeholder="please enter your please enter your web address"
                className="bg-white border-[#e8e8e8] h-12 rounded-md"
              />
            </div>
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Email Address</Label>
              <Input
                placeholder="please enter your email address"
                className="bg-white border-[#e8e8e8] h-12 rounded-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Proprietor Organizational Categories */}
      <OrganizationalCategories title="Proprietor Organizational Categories" />

      {/* Additional Information */}
      <section>
        <h2 className="text-lg font-semibold text-[#008037] mb-4">Additional Information</h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Does your project spans more than one county?</Label>
              <Select>
                <SelectTrigger className="bg-white border-[#e8e8e8] h-12 rounded-md">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2 bg-white border border-[#e8e8e8] rounded-md p-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="yes"
                    checked={spansMultipleCounties}
                    onCheckedChange={() => setSpansMultipleCounties(true)}
                    className="border-[#008037] data-[state=checked]:bg-[#008037]"
                  />
                  <label htmlFor="yes" className="text-sm text-[#595959]">
                    Yes
                  </label>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Checkbox
                    id="no"
                    checked={!spansMultipleCounties}
                    onCheckedChange={() => setSpansMultipleCounties(false)}
                    className="border-[#e8e8e8]"
                  />
                  <label htmlFor="no" className="text-sm text-[#595959]">
                    No
                  </label>
                </div>
              </div>
            </div>
            <div>
              <Label className="text-sm text-[#373737] mb-2 block">Number of Communities</Label>
              <Select>
                <SelectTrigger className="bg-white border-[#e8e8e8] h-12 rounded-md">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Community Development Agreement Upload */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-[#373737]">
                Please upload all the community development agreement for each community
                <br />
                (Upload as a zip file if you have more that 5 documents).
              </p>
              <Button className="bg-[#008037] hover:bg-[#006b2d] text-white text-xs px-4 py-2 rounded-md">
                Add Documents <Plus size={14} className="ml-1" />
              </Button>
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
        </div>
      </section>
    </div>
  )
}
