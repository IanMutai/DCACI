"use client"

export default function KenyaMap() {
  return (
    <div className="relative w-full h-[400px] bg-[#f9f9f9] rounded-xl overflow-hidden">
      <svg viewBox="0 0 400 450" className="w-full h-full">
        {/* Simplified Kenya map outline */}
        <path
          d="M200 50 L280 80 L320 150 L350 200 L340 280 L300 350 L250 400 L180 420 L120 380 L80 300 L60 220 L80 140 L140 80 Z"
          fill="#e8e8e8"
          stroke="#008037"
          strokeWidth="2"
        />
        {/* County highlights (simplified) */}
        <circle cx="180" cy="350" r="20" fill="#F9A825" opacity="0.8" />
        <circle cx="250" cy="280" r="15" fill="#F9A825" opacity="0.6" />
        <circle cx="140" cy="200" r="18" fill="#008037" opacity="0.4" />
        <circle cx="280" cy="180" r="12" fill="#008037" opacity="0.3" />
        {/* Labels */}
        <text x="180" y="355" textAnchor="middle" fill="#373737" fontSize="10" fontWeight="bold">
          Kilifi
        </text>
        <text x="250" y="285" textAnchor="middle" fill="#373737" fontSize="8">
          Mombasa
        </text>
        <text x="140" y="205" textAnchor="middle" fill="#373737" fontSize="8">
          Nairobi
        </text>
      </svg>
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-[#F9A825]"></div>
          <span>Active Projects</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#008037] opacity-50"></div>
          <span>Registered Counties</span>
        </div>
      </div>
    </div>
  )
}
