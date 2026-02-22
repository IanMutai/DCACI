import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import ImplementationDashboard from "@/components/implementation/implementation-dashboard"

export default function ImplementationPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <ImplementationDashboard />
        </main>
      </div>
    </div>
  )
}
