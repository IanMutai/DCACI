"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OrganizationalCategories from "./organizational-categories"

export default function Step4SponsorDetails() {
  return (
    <div className="space-y-8">
      {/* Details of Upfront Buyer */}
      <section>
        <h2 className="text-lg font-semibold text-[#008037] mb-4">
          Details of the upfront buyer financing the project
        </h2>

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
                placeholder="please enter your telephone number"
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

      {/* Sponsor Organizational Categories */}
      <OrganizationalCategories title="Sponsor Organizational Categories" />
    </div>
  )
}
