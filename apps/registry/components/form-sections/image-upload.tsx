"use client"

import { Upload } from "lucide-react"

export default function ImageUpload() {
  return (
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
  )
}
