"use client"

import { useState } from "react"

interface Step5Props {
  onSubmit: () => void
  onBack: () => void
}

export default function Step5Declaration({ onSubmit, onBack }: Step5Props) {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#008037]">Declaration</h3>

      <div className="bg-[#f9f9f9] rounded-lg p-6 space-y-4">
        <p className="text-sm text-[#595959]">I/We, the undersigned, hereby declare that:</p>
        <ol className="list-decimal list-inside space-y-3 text-sm text-[#595959]">
          <li>
            All information provided in this application form is true, accurate, and complete to the best of my/our
            knowledge.
          </li>
          <li>
            The carbon project complies with all applicable laws, regulations, and guidelines of the Republic of Kenya.
          </li>
          <li>
            I/We understand that any false or misleading information may result in the rejection of this application or
            revocation of any authorization granted.
          </li>
          <li>I/We agree to comply with all conditions attached to the Letter of Authorisation, if granted.</li>
          <li>
            I/We undertake to notify the Designated National Authority of any material changes to the information
            provided in this application.
          </li>
          <li>
            I/We authorize the Designated National Authority to verify the information provided and to share relevant
            details with relevant government agencies and international bodies as necessary.
          </li>
        </ol>

        <div className="pt-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 rounded border-[#008037] text-[#008037] focus:ring-[#008037] mt-0.5"
            />
            <span className="text-sm text-[#373737]">
              I/We have read, understood, and agree to the above declarations and undertakings.
            </span>
          </label>
        </div>
      </div>

      {/* Signature Fields */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#373737] mb-2">Name of Authorized Signatory</label>
          <input type="text" className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-[#373737] mb-2">Designation/Title</label>
          <input type="text" className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-[#373737] mb-2">Date</label>
          <input type="date" className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-[#373737] mb-2">Digital Signature (if applicable)</label>
          <input type="text" className="w-full border border-[#e8e8e8] rounded-lg p-3 text-sm" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <button onClick={onBack} className="px-8 py-2.5 bg-[#f5f5f5] text-[#828282] rounded-lg text-sm font-medium">
          GO BACK
        </button>
        <button
          onClick={onSubmit}
          disabled={!agreed}
          className="px-8 py-2.5 bg-[#008037] text-white rounded-lg text-sm font-medium disabled:opacity-50"
        >
          SUBMIT APPLICATION
        </button>
      </div>
    </div>
  )
}
