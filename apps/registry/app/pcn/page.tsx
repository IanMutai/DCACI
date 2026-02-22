import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import PCNDashboard from "@/components/pcn/pcn-dashboard"

export default function PCNPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8 overflow-auto">
          <PCNDashboard />
        </main>
      </div>
    </div>
  )
}
