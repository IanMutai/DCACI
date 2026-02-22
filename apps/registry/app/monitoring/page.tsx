import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import MonitoringDashboard from "@/components/monitoring/monitoring-dashboard"

export default function MonitoringPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <MonitoringDashboard />
        </main>
      </div>
    </div>
  )
}
