import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import PDDDashboard from "@/components/pdd/pdd-dashboard"

export default function PDDPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <PDDDashboard />
        </main>
      </div>
    </div>
  )
}
