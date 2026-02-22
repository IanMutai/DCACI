"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your platform configuration, users, and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6">
          {[
            { id: "general", label: "General" },
            { id: "users", label: "Users & Roles" },
            { id: "modules", label: "Modules" },
            { id: "integrations", label: "Integrations" },
            { id: "notifications", label: "Notifications" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-teal-700 text-teal-700"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Platform Information
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Platform Name
                </label>
                <input
                  defaultValue="NCTP - Kenya"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Country
                </label>
                <input
                  defaultValue="Republic of Kenya"
                  className="input-field"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Default Language
                </label>
                <select className="input-field" defaultValue="en">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="ar">Arabic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Timezone
                </label>
                <select className="input-field" defaultValue="Africa/Nairobi">
                  <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="btn-primary text-sm px-4 py-2">
                Save Changes
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Data Retention
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-slate-700">
                    Audit Log Retention
                  </span>
                  <p className="text-xs text-slate-500">
                    How long to retain audit trail records
                  </p>
                </div>
                <select className="input-field w-40" defaultValue="5years">
                  <option value="1year">1 Year</option>
                  <option value="3years">3 Years</option>
                  <option value="5years">5 Years</option>
                  <option value="10years">10 Years</option>
                  <option value="forever">Indefinite</option>
                </select>
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-slate-700">
                    Backup Frequency
                  </span>
                  <p className="text-xs text-slate-500">
                    Automatic data backup schedule
                  </p>
                </div>
                <select className="input-field w-40" defaultValue="daily">
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab Placeholder */}
      {activeTab === "users" && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Users & Roles
            </h3>
            <button className="btn-primary text-sm px-4 py-2">
              Invite User
            </button>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            Manage platform users, assign roles, and configure permissions.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-left font-medium text-slate-500">Name</th>
                  <th className="pb-3 text-left font-medium text-slate-500">Email</th>
                  <th className="pb-3 text-left font-medium text-slate-500">Role</th>
                  <th className="pb-3 text-left font-medium text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: "Admin User", email: "admin@nctp.go.ke", role: "Admin", status: "Active" },
                  { name: "John Doe", email: "john@nctp.go.ke", role: "MRV Manager", status: "Active" },
                  { name: "Jane Smith", email: "jane@nctp.go.ke", role: "NDC Analyst", status: "Active" },
                  { name: "Bob Wilson", email: "bob@nctp.go.ke", role: "Registry Officer", status: "Invited" },
                ].map((user, i) => (
                  <tr key={i}>
                    <td className="py-3 text-slate-900 font-medium">{user.name}</td>
                    <td className="py-3 text-slate-500">{user.email}</td>
                    <td className="py-3">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Other tabs show placeholder */}
      {(activeTab === "modules" || activeTab === "integrations" || activeTab === "notifications") && (
        <div className="card flex items-center justify-center py-16">
          <div className="text-center">
            <p className="text-sm text-slate-500">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings will be configured here.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              This section is under development.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
