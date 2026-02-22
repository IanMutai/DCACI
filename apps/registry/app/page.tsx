"use client"

import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import ProjectOnboardingForm from "@/components/project-onboarding-form"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <ProjectOnboardingForm />
          {/* Additional content can be added here */}
        </main>
      </div>
    </div>
  )
}
