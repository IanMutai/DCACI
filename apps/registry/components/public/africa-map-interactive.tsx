"use client"
import { useState } from "react"

interface CountryData {
  name: string
  projects: number
  credits: string
  status: "active" | "pilot" | "planning"
}

const countryData: Record<string, CountryData> = {
  KE: { name: "Kenya", projects: 24, credits: "3.2M", status: "active" },
  UG: { name: "Uganda", projects: 18, credits: "2.1M", status: "active" },
  TZ: { name: "Tanzania", projects: 15, credits: "1.8M", status: "active" },
  RW: { name: "Rwanda", projects: 12, credits: "980K", status: "active" },
  ET: { name: "Ethiopia", projects: 22, credits: "2.7M", status: "active" },
  NG: { name: "Nigeria", projects: 31, credits: "4.5M", status: "active" },
  GH: { name: "Ghana", projects: 19, credits: "2.3M", status: "active" },
  ZA: { name: "South Africa", projects: 28, credits: "3.9M", status: "active" },
  EG: { name: "Egypt", projects: 25, credits: "3.4M", status: "active" },
  MA: { name: "Morocco", projects: 21, credits: "2.9M", status: "active" },
  TN: { name: "Tunisia", projects: 16, credits: "2.1M", status: "active" },
  SN: { name: "Senegal", projects: 13, credits: "1.4M", status: "pilot" },
  CI: { name: "Ivory Coast", projects: 14, credits: "1.6M", status: "pilot" },
  CM: { name: "Cameroon", projects: 14, credits: "1.6M", status: "pilot" },
  AO: { name: "Angola", projects: 11, credits: "1.2M", status: "pilot" },
  MZ: { name: "Mozambique", projects: 12, credits: "1.2M", status: "pilot" },
  ZM: { name: "Zambia", projects: 11, credits: "1.0M", status: "pilot" },
  ZW: { name: "Zimbabwe", projects: 10, credits: "930K", status: "pilot" },
}

const getStatusColor = (status: "active" | "pilot" | "planning") => {
  switch (status) {
    case "active":
      return "#2D6A6A"
    case "pilot":
      return "#5A9090"
    case "planning":
      return "#8DBDBD"
    default:
      return "#E5E7EB"
  }
}

export default function AfricaMapInteractive() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const currentCountry = hoveredCountry ? countryData[hoveredCountry] : null

  return (
    <div className="relative w-full">
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="relative">
          <img src="/images/africa.png" alt="Africa Map" className="w-full h-auto" />

          {/* Interactive country overlays */}
          <div className="absolute inset-0">
            {Object.entries(countryData)
              .slice(0, 8)
              .map(([code, data]) => {
                const positions: Record<string, { x: string; y: string }> = {
                  KE: { x: "73%", y: "51%" }, // Kenya - East Africa
                  UG: { x: "68%", y: "49%" }, // Uganda - East Africa
                  TZ: { x: "71%", y: "55%" }, // Tanzania - East Africa
                  RW: { x: "66%", y: "50%" }, // Rwanda - East Africa
                  ET: { x: "73%", y: "38%" }, // Ethiopia - Horn of Africa
                  NG: { x: "38%", y: "38%" }, // Nigeria - West Africa
                  GH: { x: "31%", y: "40%" }, // Ghana - West Africa
                  ZA: { x: "64%", y: "78%" }, // South Africa - Southern Africa
                }

                const position = positions[code] || { x: "50%", y: "50%" }

                return (
                  <div
                    key={code}
                    className="absolute cursor-pointer transition-transform hover:scale-125 z-10"
                    style={{
                      left: position.x,
                      top: position.y,
                      transform: "translate(-50%, -50%)",
                    }}
                    onMouseEnter={() => setHoveredCountry(code)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  >
                    <div className="relative">
                      {/* Pulsing ring */}
                      <div
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{
                          backgroundColor: getStatusColor(data.status),
                          opacity: 0.4,
                        }}
                      />
                      {/* Country dot */}
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white shadow-lg transition-all"
                        style={{
                          backgroundColor: getStatusColor(data.status),
                        }}
                      />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Tooltip */}
        {currentCountry && (
          <div className="absolute top-4 left-4 bg-white border-2 border-primary rounded-lg shadow-2xl p-4 min-w-[220px] animate-fade-up z-20">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg text-primary">{currentCountry.name}</h4>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  currentCountry.status === "active"
                    ? "bg-primary text-white"
                    : currentCountry.status === "pilot"
                      ? "bg-primary/60 text-white"
                      : "bg-gray-300 text-gray-700"
                }`}
              >
                {currentCountry.status.toUpperCase()}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Projects:</span>
                <span className="font-bold text-primary">{currentCountry.projects}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Carbon Credits:</span>
                <span className="font-bold text-primary">{currentCountry.credits} tCO₂e</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "#2D6A6A" }} />
          <span className="text-sm font-medium text-gray-700">Active Registry</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "#5A9090" }} />
          <span className="text-sm font-medium text-gray-700">Pilot Program</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: "#8DBDBD" }} />
          <span className="text-sm font-medium text-gray-700">Planning Phase</span>
        </div>
      </div>
    </div>
  )
}
