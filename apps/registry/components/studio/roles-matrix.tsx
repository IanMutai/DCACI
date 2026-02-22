"use client"

import { useState } from "react"

interface Role {
  id: string
  name: string
  description: string
}

interface Permission {
  roleId: string
  stageId: string
  type: "submitter" | "reviewer" | "approver" | "view" | null
}

interface RolesMatrixProps {
  roles: Role[]
  stages: string[]
  initialPermissions: Permission[]
  onSave: (permissions: Permission[]) => void
}

const permissionColors = {
  submitter: "bg-blue-100 text-blue-700 border-blue-200",
  reviewer: "bg-amber-100 text-amber-700 border-amber-200",
  approver: "bg-green-100 text-green-700 border-green-200",
  view: "bg-gray-100 text-gray-600 border-gray-200",
}

export default function RolesMatrix({ roles, stages, initialPermissions, onSave }: RolesMatrixProps) {
  const [permissions, setPermissions] = useState<Permission[]>(initialPermissions)
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  const getPermission = (roleId: string, stageId: string): Permission["type"] => {
    const perm = permissions.find((p) => p.roleId === roleId && p.stageId === stageId)
    return perm?.type || null
  }

  const cyclePermission = (roleId: string, stageId: string) => {
    const current = getPermission(roleId, stageId)
    const order: Array<Permission["type"]> = [null, "view", "submitter", "reviewer", "approver"]
    const currentIndex = order.indexOf(current)
    const nextType = order[(currentIndex + 1) % order.length]

    setPermissions((prev) => {
      const filtered = prev.filter((p) => !(p.roleId === roleId && p.stageId === stageId))
      if (nextType) {
        return [...filtered, { roleId, stageId, type: nextType }]
      }
      return filtered
    })
  }

  const getPermissionLabel = (type: Permission["type"]): string => {
    switch (type) {
      case "submitter":
        return "S"
      case "reviewer":
        return "R"
      case "approver":
        return "A"
      case "view":
        return "V"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 p-3 bg-muted/30 rounded-lg">
        <span className="text-sm text-muted-foreground">Click to cycle:</span>
        {Object.entries(permissionColors).map(([type, color]) => (
          <span key={type} className={`text-xs px-2 py-1 rounded border ${color}`}>
            {type.charAt(0).toUpperCase()} = {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        ))}
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 text-left text-sm font-semibold text-foreground bg-muted/50 rounded-tl-lg">
                Role / Stage
              </th>
              {stages.map((stage, i) => (
                <th
                  key={stage}
                  className={`p-3 text-center text-sm font-semibold text-foreground bg-muted/50 ${
                    i === stages.length - 1 ? "rounded-tr-lg" : ""
                  }`}
                >
                  {stage}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role, roleIndex) => (
              <tr key={role.id} className="border-t border-border">
                <td className={`p-3 bg-white ${roleIndex === roles.length - 1 ? "rounded-bl-lg" : ""}`}>
                  <div className="font-medium text-sm text-foreground">{role.name}</div>
                  <div className="text-xs text-muted-foreground">{role.description}</div>
                </td>
                {stages.map((stage, stageIndex) => {
                  const cellId = `${role.id}-${stage}`
                  const permType = getPermission(role.id, stage)
                  const isHovered = hoveredCell === cellId

                  return (
                    <td
                      key={stage}
                      className={`p-2 text-center bg-white ${
                        roleIndex === roles.length - 1 && stageIndex === stages.length - 1 ? "rounded-br-lg" : ""
                      }`}
                    >
                      <button
                        onClick={() => cyclePermission(role.id, stage)}
                        onMouseEnter={() => setHoveredCell(cellId)}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all font-semibold text-sm ${
                          permType
                            ? permissionColors[permType]
                            : "border-dashed border-border text-muted-foreground hover:border-primary"
                        } ${isHovered ? "scale-110 shadow-md" : ""}`}
                      >
                        {getPermissionLabel(permType) || "+"}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save button */}
      <button
        onClick={() => onSave(permissions)}
        className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
      >
        Save Governance Rules
      </button>
    </div>
  )
}
