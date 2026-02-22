"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface Country {
  name: string
  code: string
  projects: number
  credits: string
  path: string
  centerX: number
  centerY: number
}

export default function AfricaMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const countries: Country[] = [
    {
      name: "Kenya",
      code: "KE",
      projects: 24,
      credits: "2.4M tCO2e",
      path: "M520 260 L525 255 L530 258 L533 265 L530 272 L525 275 L520 273 Z",
      centerX: 527,
      centerY: 265,
    },
    {
      name: "Uganda",
      code: "UG",
      projects: 18,
      credits: "1.8M tCO2e",
      path: "M510 258 L515 255 L518 260 L517 267 L512 268 L508 264 Z",
      centerX: 513,
      centerY: 262,
    },
    {
      name: "Tanzania",
      code: "TZ",
      projects: 15,
      credits: "1.5M tCO2e",
      path: "M515 275 L522 273 L528 280 L530 290 L525 298 L518 295 L513 288 L512 280 Z",
      centerX: 520,
      centerY: 285,
    },
    {
      name: "Ethiopia",
      code: "ET",
      projects: 20,
      credits: "2.1M tCO2e",
      path: "M520 230 L530 228 L538 232 L540 240 L535 248 L528 250 L520 245 Z",
      centerX: 530,
      centerY: 240,
    },
    {
      name: "Nigeria",
      code: "NG",
      projects: 22,
      credits: "2.3M tCO2e",
      path: "M450 250 L462 248 L470 252 L472 260 L468 268 L458 270 L448 265 Z",
      centerX: 460,
      centerY: 258,
    },
    {
      name: "Ghana",
      code: "GH",
      projects: 16,
      credits: "1.6M tCO2e",
      path: "M440 260 L446 258 L450 262 L449 268 L444 270 L438 267 Z",
      centerX: 444,
      centerY: 264,
    },
    {
      name: "South Africa",
      code: "ZA",
      projects: 28,
      credits: "3.2M tCO2e",
      path: "M495 370 L510 368 L520 372 L525 380 L520 390 L508 395 L495 392 L488 385 Z",
      centerX: 508,
      centerY: 382,
    },
    {
      name: "Rwanda",
      code: "RW",
      projects: 12,
      credits: "1.2M tCO2e",
      path: "M508 268 L512 266 L515 269 L514 273 L510 274 L507 271 Z",
      centerX: 511,
      centerY: 270,
    },
  ]

  const totalProjects = countries.reduce((sum, country) => sum + country.projects, 0)

  return (
    <div className="relative w-full h-full">
      <svg viewBox="380 180 200 260" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="africaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D6A6A" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#4D8A8A" stopOpacity="0.15" />
          </linearGradient>
          <filter id="countryGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="countryGlowStrong">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Africa continent base - detailed realistic outline */}
        <path
          d="M480 200 L490 195 L505 193 L520 195 L535 200 L548 210 L555 225 
             L558 240 L560 255 L562 270 L563 285 L562 300 L560 315 L555 330
             L548 345 L540 358 L530 370 L518 380 L508 388 L498 393 L488 395
             L478 393 L468 388 L458 380 L450 370 L443 358 L438 345 L435 330
             L433 315 L432 300 L433 285 L435 270 L438 255 L442 240 L448 225
             L456 212 L468 203 Z"
          fill="url(#africaGradient)"
          stroke="#2D6A6A"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          className="transition-all duration-700"
        />

        {/* Grid lines for context */}
        <g opacity="0.08">
          <line x1="380" y1="240" x2="580" y2="240" stroke="#2D6A6A" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="380" y1="280" x2="580" y2="280" stroke="#2D6A6A" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="380" y1="320" x2="580" y2="320" stroke="#2D6A6A" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="380" y1="360" x2="580" y2="360" stroke="#2D6A6A" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="460" y1="180" x2="460" y2="440" stroke="#2D6A6A" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="500" y1="180" x2="500" y2="440" stroke="#2D6A6A" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="540" y1="180" x2="540" y2="440" stroke="#2D6A6A" strokeWidth="0.5" strokeDasharray="2 2" />
        </g>

        {/* Country polygons with hover effects */}
        {countries.map((country) => (
          <g
            key={country.code}
            className="cursor-pointer transition-all duration-300"
            onMouseEnter={() => setHoveredCountry(country.code)}
            onMouseLeave={() => setHoveredCountry(null)}
          >
            {/* Country shape */}
            <path
              d={country.path}
              fill={hoveredCountry === country.code ? "#2D6A6A" : "#3D7A7A"}
              fillOpacity={hoveredCountry === country.code ? "0.85" : "0.55"}
              stroke="#2D6A6A"
              strokeWidth={hoveredCountry === country.code ? "2" : "1"}
              strokeOpacity={hoveredCountry === country.code ? "1" : "0.6"}
              filter={hoveredCountry === country.code ? "url(#countryGlowStrong)" : "url(#countryGlow)"}
              className="transition-all duration-300"
            />

            {/* Animated pulse rings on hover */}
            {hoveredCountry === country.code && (
              <>
                <circle
                  cx={country.centerX}
                  cy={country.centerY}
                  r="8"
                  fill="none"
                  stroke="#2D6A6A"
                  strokeWidth="2"
                  strokeOpacity="0"
                  className="animate-ping"
                />
                <circle
                  cx={country.centerX}
                  cy={country.centerY}
                  r="12"
                  fill="none"
                  stroke="#2D6A6A"
                  strokeWidth="1.5"
                  strokeOpacity="0"
                  className="animate-ping"
                  style={{ animationDelay: "150ms" }}
                />
              </>
            )}

            {/* Country marker pin */}
            <circle
              cx={country.centerX}
              cy={country.centerY}
              r={hoveredCountry === country.code ? "4" : "3"}
              fill="white"
              opacity="0.95"
              className="transition-all duration-300"
              filter="url(#countryGlow)"
            />

            {/* Hover tooltip */}
            {hoveredCountry === country.code && (
              <g className="animate-fade-up">
                <rect
                  x={country.centerX - 40}
                  y={country.centerY - 45}
                  width="80"
                  height="38"
                  rx="6"
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--border))"
                  strokeWidth="1.5"
                  opacity="0.98"
                  filter="url(#countryGlow)"
                />
                <text
                  x={country.centerX}
                  y={country.centerY - 31}
                  textAnchor="middle"
                  fill="hsl(var(--foreground))"
                  fontSize="8"
                  fontWeight="700"
                  className="pointer-events-none uppercase tracking-wide"
                >
                  {country.name}
                </text>
                <text
                  x={country.centerX}
                  y={country.centerY - 22}
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  fontSize="6"
                  className="pointer-events-none"
                >
                  {country.projects} Active Projects
                </text>
                <text
                  x={country.centerX}
                  y={country.centerY - 14}
                  textAnchor="middle"
                  fill="#2D6A6A"
                  fontSize="7"
                  fontWeight="600"
                  className="pointer-events-none"
                >
                  {country.credits}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Floating legend */}
      <div className="absolute bottom-4 left-4 bg-card/98 backdrop-blur-md rounded-xl p-4 border border-border shadow-2xl max-w-[280px] animate-fade-up">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          <div className="text-xs font-bold text-foreground uppercase tracking-wide">Active Countries</div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {countries.map((country) => (
            <div
              key={country.code}
              className={`flex items-center gap-2 text-xs transition-all duration-300 cursor-pointer rounded-md p-1.5 -m-1.5 ${
                hoveredCountry === country.code ? "bg-primary/10 scale-105" : "hover:bg-muted/50"
              }`}
              onMouseEnter={() => setHoveredCountry(country.code)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  hoveredCountry === country.code ? "w-3 h-3 ring-2 ring-primary/30 ring-offset-1" : ""
                }`}
                style={{
                  backgroundColor: "#3D7A7A",
                  boxShadow: hoveredCountry === country.code ? "0 0 12px #2D6A6A" : "none",
                }}
              />
              <span
                className={`transition-all duration-300 ${
                  hoveredCountry === country.code ? "text-foreground font-semibold" : "text-muted-foreground"
                }`}
              >
                {country.code}
              </span>
              <span className="ml-auto font-bold text-foreground text-[10px] tabular-nums">{country.projects}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
          <span className="text-xs text-muted-foreground font-medium">Total Projects</span>
          <span className="text-sm font-bold text-primary tabular-nums">{totalProjects}</span>
        </div>
      </div>
    </div>
  )
}
