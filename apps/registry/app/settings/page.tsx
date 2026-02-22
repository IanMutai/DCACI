"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { User, Building2, Bell, Shield, CreditCard, Globe, Save, Camera } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-semibold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
          </div>

          <div className="flex gap-8">
            {/* Tabs */}
            <div className="w-64 space-y-1">
              {[
                { id: "profile", label: "Profile", icon: User },
                { id: "organization", label: "Organization", icon: Building2 },
                { id: "notifications", label: "Notifications", icon: Bell },
                { id: "security", label: "Security", icon: Shield },
                { id: "billing", label: "Billing", icon: CreditCard },
                { id: "preferences", label: "Preferences", icon: Globe },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1">
              {activeTab === "profile" && (
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Profile Information</h2>

                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden">
                        <img
                          src="/images/dsc-0640.jpg"
                          alt="Ian Mutai"
                          className="w-full h-full object-cover object-[center_15%]"
                        />
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors">
                        <Camera size={14} />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Ian Mutai</h3>
                      <p className="text-sm text-muted-foreground">Project Originator</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="Ian"
                        className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Mutai"
                        className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="ian.mutai@greenafricacarbon.co.ke"
                        className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+254 712 345 678"
                        className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                      <select className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Project Originator</option>
                        <option>Project Developer</option>
                        <option>Validator</option>
                        <option>Verifier</option>
                        <option>Registry Admin</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                      <textarea
                        rows={4}
                        defaultValue="Experienced carbon project developer with over 10 years in REDD+ and clean energy projects across East Africa."
                        className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8 pt-6 border-t border-border">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>

                  <div className="space-y-6">
                    {[
                      { title: "Project Updates", description: "Notifications about your project status changes" },
                      { title: "Document Reviews", description: "When documents are reviewed or require attention" },
                      { title: "Credit Issuance", description: "Notifications when credits are issued or transferred" },
                      { title: "Community Updates", description: "Updates about community agreements and benefits" },
                      {
                        title: "System Announcements",
                        description: "Important system updates and maintenance notices",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-4 border-b border-border last:border-0"
                      >
                        <div>
                          <h3 className="font-medium text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={index < 3} />
                          <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "organization" && (
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Organization Details</h2>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Organization Name</label>
                      <input
                        type="text"
                        defaultValue="Green Africa Carbon Ltd"
                        className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Registration Number</label>
                      <input
                        type="text"
                        defaultValue="KE-2024-00123"
                        className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                      <select className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Kenya</option>
                        <option>Ethiopia</option>
                        <option>Tanzania</option>
                        <option>Nigeria</option>
                        <option>Morocco</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                      <textarea
                        rows={3}
                        defaultValue="123 Green Street, Westlands, Nairobi, Kenya"
                        className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-8 pt-6 border-t border-border">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Security Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-foreground mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">Two-Factor Authentication</h3>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-secondary rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
                          Enable 2FA
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8 pt-6 border-t border-border">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                      <Save size={16} />
                      Update Password
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Billing & Payments</h2>

                  <div className="bg-secondary/50 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">Current Plan</h3>
                        <p className="text-2xl font-serif font-semibold text-primary mt-1">Professional</p>
                        <p className="text-sm text-muted-foreground mt-1">$299/month - Unlimited projects</p>
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                        Upgrade Plan
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-4">Payment Method</h3>
                    <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">**** **** **** 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2026</p>
                      </div>
                      <button className="ml-auto text-sm text-primary hover:underline">Change</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div className="bg-card rounded-2xl border border-border p-8">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Preferences</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                      <select className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>English</option>
                        <option>French</option>
                        <option>Swahili</option>
                        <option>Arabic</option>
                        <option>Portuguese</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
                      <select className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Africa/Nairobi (EAT)</option>
                        <option>Africa/Lagos (WAT)</option>
                        <option>Africa/Cairo (EET)</option>
                        <option>Africa/Casablanca (WET)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Date Format</label>
                      <select className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
                      <select className="w-full px-4 py-3 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>KES (KSh)</option>
                        <option>NGN (₦)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8 pt-6 border-t border-border">
                    <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                      <Save size={16} />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
